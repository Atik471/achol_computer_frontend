import { Link } from "react-router";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import AddToCartButton from "./AddToCartButton";

const Product = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const {
    _id,
    name,
    images = [],
    category,
    subcategory,
    ratings = { average: 0, count: 0 },
    price,
    discountPrice,
    specifications = [],
    slug,
    stock = { available: 0 }
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
  const inStock = stock?.available > 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="group relative bg-base-100 rounded-xl overflow-hidden border border-base-300 hover:border-primary/30 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist Button - Top Right */}
      <div className="absolute top-3 right-3 z-10">
        <AddToWishlistButton productId={_id} />
      </div>

      {/* Image Container */}
      <Link to={`/products/${slug}`}>
        <figure className="relative h-56 bg-base-200 overflow-hidden">
          <img
            src={getImageUrl(images[0])}
            alt={name}
            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23F1F5F9'/%3E%3Cpath d='M175 120L225 120L225 180L175 180Z' fill='%23CBD5E1'/%3E%3Ccircle cx='200' cy='130' r='15' fill='%2394A3B8'/%3E%3C/svg%3E";
            }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercent > 0 && (
              <span className="badge badge-error badge-sm font-bold">
                -{discountPercent}%
              </span>
            )}
            {!inStock && (
              <span className="badge badge-neutral badge-sm">
                Out of Stock
              </span>
            )}
          </div>
        </figure>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <div className="flex items-center gap-2">
          <span className="badge badge-primary badge-xs">
            {category?.name || "Category"}
          </span>
          {subcategory?.name && (
            <span className="text-xs text-base-content/50">
              • {subcategory.name}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3
          className="font-semibold text-base-content line-clamp-2 h-12 leading-6 hover:text-primary transition-colors"
          title={name}
        >
          <Link to={`/products/${slug}`}>
            {name}
          </Link>
        </h3>

        {/* Ratings */}
        {ratings.count > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(ratings.average)
                    ? "text-warning"
                    : "text-base-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-xs text-base-content/60">
              ({ratings.count})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-primary">
            ৳{(discountPrice || price)?.toLocaleString()}
          </span>
          {discountPrice && (
            <span className="text-sm text-base-content/40 line-through">
              ৳{price?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <AddToCartButton
            productId={_id}
            quantity={1}
            className="btn-primary flex-1"
            text="Add to Cart"
            showIcon={true}
          />
          <Link
            to={`/products/${slug}`}
            className="btn btn-outline btn-primary"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;