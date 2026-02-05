import { Link } from "react-router";
import { FaStar, FaEye, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

const Product = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    name,
    images = [],
    category,
    subcategory,
    ratings = { average: 0, count: 0 },
    price,
    discountPrice,
    specifications = [],
    slug,
    stock = 0
  } = product;

  // Handle placeholder image
  const getImageUrl = (img) => {
    if (!img || img === "") {
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23F1F5F9'/%3E%3Cpath d='M175 120L225 120L225 180L175 180Z' fill='%23CBD5E1'/%3E%3Ccircle cx='200' cy='130' r='15' fill='%2394A3B8'/%3E%3C/svg%3E";
    }
    return img;
  };

  // Calculate discount percentage
  const discountPercent = discountPrice
    ? Math.round((1 - discountPrice / price) * 100)
    : 0;

  // Check if product is in stock
  const inStock = stock > 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="group relative bg-[#FEFCF9] dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-amber-100/50 dark:border-slate-700 card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <figure className="relative h-56 bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
        <img
          src={getImageUrl(images[0])}
          alt={name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23F1F5F9'/%3E%3Cpath d='M175 120L225 120L225 180L175 180Z' fill='%23CBD5E1'/%3E%3Ccircle cx='200' cy='130' r='15' fill='%2394A3B8'/%3E%3C/svg%3E";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
              -{discountPercent}%
            </span>
          )}
          {!inStock && (
            <span className="px-2.5 py-1 bg-slate-800 dark:bg-slate-600 text-white text-xs font-medium rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Actions - Show on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent flex items-end justify-center pb-6 gap-3 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link
            to={`/products/${slug}`}
            className="p-3 bg-white text-slate-700 rounded-full shadow-xl hover:bg-blue-500 hover:text-white transition-all duration-200 transform hover:scale-110 border border-slate-200"
            title="View Details"
          >
            <FaEye className="w-5 h-5" />
          </Link>
          <button
            className="p-3 bg-white text-slate-700 rounded-full shadow-xl hover:bg-red-500 hover:text-white transition-all duration-200 transform hover:scale-110 border border-slate-200"
            title="Add to Wishlist"
          >
            <FaHeart className="w-5 h-5" />
          </button>
        </div>
      </figure>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
            {category?.name || "Category"}
          </span>
          {subcategory?.name && (
            <span className="text-xs text-slate-400">
              • {subcategory.name}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3
          className="font-semibold text-slate-900 dark:text-white line-clamp-2 h-12 leading-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          title={name}
        >
          <Link to={`/products/${slug}`}>
            {name}
          </Link>
        </h3>

        {/* Ratings */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(ratings.average)
                  ? "text-amber-400"
                  : "text-slate-200 dark:text-slate-600"
                  }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            ({ratings.count} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400 price-tag">
            ৳{(discountPrice || price)?.toLocaleString()}
          </span>
          {discountPrice && (
            <span className="text-sm text-slate-400 line-through price-tag">
              ৳{price?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Button */}
        <Link
          to={`/products/${slug}`}
          className={`btn w-full mt-2 rounded-xl font-medium transition-all duration-300 ${inStock
            ? "btn-primary shadow-md shadow-blue-500/20 hover:shadow-blue-500/40"
            : "btn-disabled bg-slate-200 dark:bg-slate-700"
            }`}
        >
          {inStock ? "View Details" : "Out of Stock"}
        </Link>
      </div>

      {/* Subtle Shine Effect on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-700 ${isHovered ? 'translate-x-full' : ''}`}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};

export default Product;