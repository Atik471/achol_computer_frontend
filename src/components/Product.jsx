import { Link } from "react-router";
import productimg from "../assets/product.png";
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
    specifications = {}, // expecting { key: value }
  } = product;

  // Pick only 2–3 specs to show in card
  const previewSpecs = Object.entries(specifications).slice(0, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <figure className="bg-base-200 h-48 flex items-center justify-center">
        <img
          src={productimg}
          alt={name}
          className="object-cover w-full h-full"
        />
      </figure>

      <div className="card-body">
        {/* Category + Subcategory */}
        <p className="text-sm text-gray-500">
          {category?.name} • {subcategory?.name}
        </p>

        {/* Product Name */}
        <h2 className="card-title text-lg font-bold">{name}</h2>

        {/* Ratings */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill={i < Math.round(ratings.average) ? "gold" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-yellow-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.005 6.174h6.49c.97 0 1.371 1.24.588 1.81l-5.25 3.815 2.004 6.174c.3.921-.755 1.688-1.54 1.118l-5.25-3.815-5.25 3.815c-.784.57-1.838-.197-1.539-1.118l2.004-6.174-5.25-3.815c-.784-.57-.383-1.81.588-1.81h6.49l2.005-6.174z"
              />
            </svg>
          ))}
          <span className="ml-1 text-sm text-gray-500">({ratings.count})</span>
        </div>

        {/* Price */}
        <div className="mt-2">
          {discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold dark:text-gray-200 text-black">
                ৳{discountPrice}
              </span>
              <span className="line-through text-gray-500 dark:text-gray-400">
                ৳{price}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-primary">${price}</span>
          )}
        </div>

        {/* Specifications Preview */}
        {previewSpecs.length > 0 && (
          <ul className="mt-2 text-sm text-black-300 dark:text-gray-300 space-y-1">
            {previewSpecs.map(([key, value]) => (
              <li key={key}>
                <span className="font-medium">{key}:</span> {value}
              </li>
            ))}
          </ul>
        )}

        {/* Action */}
        <div className="card-actions mt-2 grid grid-cols-1 gap-2 w-full">
          <Link to={`/products/${product.slug}`}>
            <button className="btn btn-outline w-full">View Details</button>
          </Link>
          {/* <button className="btn btn-primary w-full">Add to Cart</button> */}
        </div>


      </div>
    </div>
  );
};

export default Product;
