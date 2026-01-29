import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useProducts } from "../hooks/useProducts.js";
import Pagination from "../components/Pagination.jsx";
import LoadingSpinner from "../components/LoadingSpinner";
import { updateAdminProductStock } from "../services/adminProductServices.js";
// import { Helmet } from "react-helmet-async";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stock, setStock] = useState({
    available: 0,
    incoming: 0,
    servicing: 0,
    sold: 0,
    defective: 0,
  });

  const { data, isLoading, error } = useProducts();
  const queryClient = useQueryClient();

  const { mutate: updateStock, isLoading: isUpdating } = useMutation({
    mutationFn: ({ id, stockData }) => updateAdminProductStock(id, stockData),
    onSuccess: () => {
      toast.success("Stock updated successfully!");
      queryClient.invalidateQueries(["products"]);
      closeModal();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update stock.");
    },
  });

  if (isLoading) return <LoadingSpinner variant="inline" message="Loading inventory..." />;
  if (error) return <div className="text-error">Failed to load products</div>;

  const products = data.data;
  const totalCount = data.totalCount;
  // const minPrice = data.minPrice;
  const maxPrice = data.maxPrice;

  // search filter
  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (product) => {
    setSelectedProduct(product);
    setStock(product.stock);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setStock((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
    updateStock({ id: selectedProduct._id, stockData: { stock } });
  };

  console.log("invenotry", data);

  return (
    <div className="p-6 space-y-6">
      {/* <Helmet>
        <title>Achol Computer | Inventory</title>
        <meta name="description" content="Trusted electronics store in Bangladesh." />
      </Helmet> */}
      {/* Header / Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{products?.length || 0}</div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Low Stock</div>
          <div className="stat-value text-warning">
            {products?.filter((p) => p.stock.available > 0 && p.stock.available < 10).length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Out of Stock</div>
          <div className="stat-value text-error">
            {products?.filter((p) => p.stock.available === 0).length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Inventory Value</div>
          <div className="stat-value">
            ৳
            {products
              ?.reduce((acc, p) => acc + p.price * (p.stock?.available || 0), 0)
              .toLocaleString()}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full md:w-64"
          />
          <select className="select select-bordered">
            <option disabled>Filter</option>
            <option>All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
          <select className="select select-bordered">
            <option>Sort by</option>
            <option>Name</option>
            <option>Price</option>
            <option>Quantity</option>
          </select>
        </div>
        <Link to="/admin/products/new">
          <button className="btn btn-primary">+ Add Product</button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Available</th>
              <th>Incoming</th>
              <th>Servicing</th>
              <th>Sold</th>
              <th>Defective</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.stock.available}</td>
                <td>{p.stock.incoming}</td>
                <td>{p.stock.servicing}</td>
                <td>{p.stock.sold}</td>
                <td>{p.stock.defective}</td>
                <td>
                  {p.stock.available === 0 ? (
                    <span className="badge badge-xs whitespace-nowrap badge-error">Out of Stock</span>
                  ) : p.stock.available < 10 ? (
                    <span className="badge badge-xs whitespace-nowrap badge-warning">Low Stock</span>
                  ) : (
                    <span className="badge badge-xs whitespace-nowrap badge-success">In Stock</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() => openModal(p)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Stock Modal */}
      <dialog id="stock_update_modal" className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Stock for {selectedProduct?.name}</h3>
          <form onSubmit={handleUpdateSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text">Available</span></label>
                <input type="number" name="available" value={stock.available} onChange={handleStockChange} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Incoming</span></label>
                <input type="number" name="incoming" value={stock.incoming} onChange={handleStockChange} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Servicing</span></label>
                <input type="number" name="servicing" value={stock.servicing} onChange={handleStockChange} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Sold</span></label>
                <input type="number" name="sold" value={stock.sold} onChange={handleStockChange} className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">Defective</span></label>
                <input type="number" name="defective" value={stock.defective} onChange={handleStockChange} className="input input-bordered" />
              </div>
            </div>
            <div className="modal-action justify-between">
              <Link to={`/admin/products/${selectedProduct?._id}/edit`} className="btn btn-outline btn-accent">
                Edit Details
              </Link>
              <div>
                <button type="button" className="btn mr-2" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={isUpdating}>
                  {isUpdating && <span className="loading loading-spinner"></span>}
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>

      <Pagination />
    </div>
  );
}
