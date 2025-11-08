import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  createAdminProduct,
  updateAdminProduct,
  getProductById,
  api,
} from '../services/adminProductServices';

// Fetch categories
const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories'); // Assuming endpoint is /api/categories
      return data.data;
    },
  });

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id;

  const [product, setProduct] = useState({
    name: '',
    description: '',
    detailedDescription: '',
    price: 0,
    discountPrice: 0,
    buyingPrice: 0,
    category: '',
    subcategory: '',
    brand: '',
    stock: {
      available: 0,
      incoming: 0,
      servicing: 0,
      sold: 0,
      defective: 0,
    },
    images: [''],
    colors: [''],
    keyFeatures: [''],
    specifications: [{ key: '', value: '' }],
    featured: false,
    isActive: true,
  });

  // Fetch product data if in edit mode
  const { data: existingProduct, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: isEditMode,
  });

  // Fetch related data
  const { data: categories = [] } = useCategories();

  useEffect(() => {
    if (isEditMode && existingProduct) {
      setProduct({
        name: existingProduct.name || '',
        description: existingProduct.description || '',
        detailedDescription: existingProduct.detailedDescription || '',
        price: existingProduct.price || 0,
        discountPrice: existingProduct.discountPrice || 0,
        buyingPrice: existingProduct.buyingPrice || 0,
        category: existingProduct.category._id,
        subcategory: existingProduct.subcategory._id,
        brand: existingProduct.brand || '',
        stock: existingProduct.stock || { available: 0, incoming: 0, servicing: 0, sold: 0, defective: 0 },
        images: existingProduct.images?.length ? existingProduct.images : [''],
        colors: existingProduct.colors?.length ? existingProduct.colors : [''],
        keyFeatures: existingProduct.keyFeatures?.length ? existingProduct.keyFeatures : [''],
        specifications: existingProduct.specifications?.length ? existingProduct.specifications : [{ key: '', value: '' }],
        featured: existingProduct.featured || false,
        isActive: existingProduct.isActive === undefined ? true : existingProduct.isActive,
      });
    }
  }, [isEditMode, existingProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value, }));
  }; 

  // When category changes, reset subcategory
  useEffect(() => {
    if (!isEditMode) { // Or some logic to prevent resetting on initial edit load
      setProduct(p => ({ ...p, subcategory: '' }));
    }
  }, [product.category, isEditMode]);
  
  const handleNestedChange = (parent, e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [parent]: { ...prev[parent], [name]: value } }));
  };

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      stock: { ...prev.stock, [name]: Number(value) },
    }));
  };

  // Generic handler for dynamic array fields (keyFeatures, images, colors)
  const handleArrayChange = (field, index, value) => {
    const newArray = [...product[field]];
    newArray[index] = value;
    setProduct(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setProduct(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...product[field]];
    newArray.splice(index, 1);
    setProduct(prev => ({ ...prev, [field]: newArray }));
  };

  // Specific handlers for specifications array of objects
  const handleSpecificationChange = (index, e) => {
    const { name, value } = e.target;
    const newSpecs = [...product.specifications];
    newSpecs[index][name] = value;
    setProduct(prev => ({ ...prev, specifications: newSpecs }));
  };

  const addSpecification = () => {
    setProduct(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }],
    }));
  };

  const removeSpecification = (index) => {
    const newSpecs = [...product.specifications];
    newSpecs.splice(index, 1);
    setProduct(prev => ({ ...prev, specifications: newSpecs }));
  };

  // Add similar handlers for specifications...

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      isEditMode
        ? updateAdminProduct({ id, productData: newProduct })
        : createAdminProduct(newProduct),
    onSuccess: () => {
      toast.success(`Product ${isEditMode ? 'updated' : 'created'} successfully!`);
      // Invalidate queries for the product list on the inventory page
      queryClient.invalidateQueries({ queryKey: ['products'] });
      // Also invalidate the specific product query if in edit mode
      if (isEditMode) {
        queryClient.invalidateQueries({ queryKey: ['product', id] });
      }
      navigate('/dashboard/inventory');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'An error occurred.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!product.name || !product.category || !product.subcategory || !product.brand) {
      return toast.error('Please fill all required fields.');
    }

    const productData = {
      ...product,
      images: product.images.filter(img => img.trim() !== ''),
      colors: product.colors.filter(color => color.trim() !== ''),
      keyFeatures: product.keyFeatures.filter(feature => feature.trim() !== ''),
      specifications: product.specifications.filter(spec => spec.key.trim() !== '' && spec.value.trim() !== ''),
    };

    mutation.mutate(productData);
  };

  if (isLoadingProduct) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen">
      <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h1>
        <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="p-4 border border-base-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                  <span className="text-red-500">*</span>
                </label>
                <input type="text" name="name" value={product.name} onChange={handleChange} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Short Description</span>
                  <span className="text-red-500">*</span>
                </label>
                <textarea name="description" value={product.description} onChange={handleChange} className="textarea textarea-bordered h-24" required></textarea>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Detailed Description (HTML)</span></label>
                <textarea name="detailedDescription" value={product.detailedDescription} onChange={handleChange} className="textarea textarea-bordered h-32"></textarea>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 border border-base-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Buying Price</span>
                  <span className="text-red-500">*</span>
                </label>
                <input type="number" name="buyingPrice" value={product.buyingPrice} onChange={handleChange} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Regular Price</span>
                  <span className="text-red-500">*</span>
                </label>
                <input type="number" name="price" value={product.price} onChange={handleChange} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Discount Price</span></label>
                <input type="number" name="discountPrice" value={product.discountPrice} onChange={handleChange} className="input input-bordered" />
              </div>
            </div>
          </div>

          {/* Categorization */}
          <div className="p-4 border border-base-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Categorization</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                  <span className="text-red-500">*</span>
                </label>
                <select name="category" value={product.category} onChange={handleChange} className="select select-bordered" required>
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subcategory</span>
                  <span className="text-red-500">*</span>
                </label>
                <select name="subcategory" value={product.subcategory} onChange={handleChange} className="select select-bordered" required disabled={!product.category}>
                  <option value="">Select Subcategory</option>
                  {categories.find(c => c._id === product.category)?.subcategories?.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Brand</span>
                  <span className="text-red-500">*</span>
                </label>
                <input type="text" name="brand" value={product.brand} onChange={handleChange} className="input input-bordered" required placeholder="e.g., HP, Dell, ASUS" />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="p-4 border border-base-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Inventory / Stock</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Available</span></label>
                <input type="number" name="available" value={product.stock.available} onChange={handleStockChange} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Incoming</span></label>
                <input type="number" name="incoming" value={product.stock.incoming} onChange={handleStockChange} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Servicing</span></label>
                <input type="number" name="servicing" value={product.stock.servicing} onChange={handleStockChange} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Sold</span></label>
                <input type="number" name="sold" value={product.stock.sold} onChange={handleStockChange} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Defective</span></label>
                <input type="number" name="defective" value={product.stock.defective} onChange={handleStockChange} className="input input-bordered" />
              </div>
            </div>
          </div>

          {/* Attributes */}
          <div className="p-4 border border-base-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Attributes</h2>
            <div className="space-y-4">
              {/* Images */}
              <div>
                <label className="label"><span className="label-text">Image URLs</span></label>
                {product.images.map((image, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input type="text" value={image} onChange={(e) => handleArrayChange('images', index, e.target.value)} className="input input-bordered w-full" placeholder="https://example.com/image.jpg" />
                    <button type="button" onClick={() => removeArrayItem('images', index)} className="btn btn-error btn-sm">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('images')} className="btn btn-sm btn-outline mt-2">Add Image</button>
              </div>
              {/* Colors */}
              <div>
                <label className="label"><span className="label-text">Colors</span></label>
                {product.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input type="text" value={color} onChange={(e) => handleArrayChange('colors', index, e.target.value)} className="input input-bordered w-full" placeholder="e.g., Silver" />
                    <button type="button" onClick={() => removeArrayItem('colors', index)} className="btn btn-error btn-sm">Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('colors')} className="btn btn-sm btn-outline mt-2">Add Color</button>
              </div>
            </div>
          </div>

          {/* Features & Specifications */}
          <div className="p-4 border border-base-300 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Features & Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Key Features */}
              <div>
                <label className="label"><span className="label-text">Key Features</span></label>
                {product.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input type="text" value={feature} onChange={(e) => handleArrayChange('keyFeatures', index, e.target.value)} className="input input-bordered w-full" />
                    <button type="button" onClick={() => removeArrayItem('keyFeatures', index)} className="btn btn-error btn-sm">X</button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('keyFeatures')} className="btn btn-sm btn-outline mt-2">Add Feature</button>
              </div>
              {/* Specifications */}
              <div>
                <label className="label"><span className="label-text">Specifications</span></label>
                {product.specifications.map((spec, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2 mb-2 items-center">
                    <input type="text" name="key" value={spec.key} onChange={(e) => handleSpecificationChange(index, e)} className="input input-bordered" placeholder="e.g., Processor" />
                    <div className="flex gap-2">
                      <input type="text" name="value" value={spec.value} onChange={(e) => handleSpecificationChange(index, e)} className="input input-bordered w-full" placeholder="e.g., Core i5" />
                      <button type="button" onClick={() => removeSpecification(index)} className="btn btn-error btn-sm">X</button>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addSpecification} className="btn btn-sm btn-outline mt-2">Add Specification</button>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="p-4 border border-base-300 rounded-lg flex items-center gap-8">
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Featured Product</span>
                <input type="checkbox" name="featured" checked={product.featured} onChange={handleChange} className="toggle toggle-primary" />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <span className="label-text">Active (Visible in store)</span>
                <input type="checkbox" name="isActive" checked={product.isActive} onChange={handleChange} className="toggle toggle-success" />
              </label>
            </div>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 mt-12">
          <button type="button" onClick={() => navigate('/dashboard/inventory')} className="btn btn-ghost">Cancel</button>
          <button type="submit" form="product-form" className="btn btn-primary" disabled={mutation.isLoading}>
            {mutation.isLoading && <span className="loading loading-spinner"></span>} 
            {mutation.isLoading ? (isEditMode ? "Updating..." : "Creating...") : (isEditMode ? "Update Product" : "Create Product")}
          </button> 
        </div>
      </div>
    </div>
  );
};

export default ProductForm;