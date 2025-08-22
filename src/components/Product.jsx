import productimg from "../assets/product.png";

const Product = ({ product }) => {
  const {
    name,
    images = [],
    category,
    subcategory,
    ratings = { average: 0, count: 0 },
    price,
    discountPrice,
  } = product;

  return (
    <div className="card w-80 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
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
              <span className="text-xl font-bold text-primary">
                ${discountPrice}
              </span>
              <span className="line-through text-gray-400">${price}</span>
            </div>
          ) : (
            <span className="text-xl font-bold text-primary">${price}</span>
          )}
        </div>

        {/* Action */}
        <div className="card-actions mt-4">
          <button className="btn btn-primary w-full">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
