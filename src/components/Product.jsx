import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";

const Product = ({ product }) => {
  const {
    name,
    images = [],
    category,
    subcategory,
    ratings = { average: 0, count: 0 },
    price,
    discountPrice,
    specifications = [],
    slug
  } = product;

  // Handle placeholder image if not available
  const getImageUrl = (img) => {
    if (!img || img === "") {
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23F3F4F6'/%3E%3Cpath d='M150 100H250V200H150V100Z' fill='%23E5E7EB'/%3E%3Cpath d='M175 125V175H225V125H175Z' fill='%23D1D5DB'/%3E%3C/svg%3E";
    }
    return img;
  };

  // Extract preview specifications (first 2-3 specs)
  const getPreviewSpecs = () => {
    if (!specifications || specifications.length === 0) return [];
    
    // Get the first specification with object values to show as preview
    const firstSpec = specifications[0];
    if (firstSpec.value && typeof firstSpec.value === 'object') {
      return Object.entries(firstSpec.value).slice(0, 3);
    }
    
    return [];
  };

  const previewSpecs = getPreviewSpecs();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Product Image */}
      <figure className="bg-base-200 h-48 flex items-center justify-center p-4">
        <img
          src={getImageUrl(images[0])}
          alt={name}
          className="object-contain w-full h-full"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23F3F4F6'/%3E%3Cpath d='M150 100H250V200H150V100Z' fill='%23E5E7EB'/%3E%3Cpath d='M175 125V175H225V125H175Z' fill='%23D1D5DB'/%3E%3C/svg%3E";
          }}
        />
      </figure>

      <div className="card-body flex-grow">
        {/* Category + Subcategory */}
        <p className="text-sm text-gray-500">
          {category?.name} • {subcategory?.name}
        </p>

        {/* Product Name */}
        <h2 className="card-title text-lg font-bold line-clamp-2 h-14 overflow-hidden" title={name}>
          {name}
        </h2>

        {/* Ratings */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              key={i}
              className={i < Math.floor(ratings.average) ? "text-yellow-400" : "text-gray-300"}
              size={16}
            />
          ))}
          <span className="ml-1 text-sm text-gray-500">({ratings.count})</span>
        </div>

        {/* Price */}
        <div className="mt-2">
          {discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-blue-600">
                ৳{discountPrice.toLocaleString()}
              </span>
              <span className="line-through text-gray-500">
                ৳{price.toLocaleString()}
              </span>
              <span className="badge badge-success badge-sm">
                {Math.round((1 - discountPrice / price) * 100)}% OFF
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-blue-600">৳{price.toLocaleString()}</span>
          )}
        </div>

        {/* Specifications Preview */}
        {previewSpecs.length > 0 && (
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            {previewSpecs.map(([key, value], index) => (
              <li key={index} className="truncate">
                <span className="font-medium">{key}:</span> {value}
              </li>
            ))}
          </ul>
        )}

        {/* Action */}
        <div className="card-actions mt-4 grid grid-cols-1 gap-2 w-full">
          <Link to={`/products/${slug}`} className="w-full">
            <button className="btn btn-outline w-full">View Details</button>
          </Link>
          {/* <button className="btn btn-primary w-full">Add to Cart</button> */}
        </div>
      </div>
    </div>
  );
};

export default Product;