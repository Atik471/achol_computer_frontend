import { Link, useLocation } from "react-router";

const Breadcrumb = ({ categoryslug, subcategoryslug, productNameslug }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const category = searchParams.get("category") || categoryslug;
  const subcategory = searchParams.get("subcategory") || subcategoryslug;
  const productName = searchParams.get("product") || productNameslug;

  // Helper: convert slug to readable text
  const formatName = (str) =>
    str ? str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

  return (
    <div className="text-sm breadcrumbs mb-4">
      <ul className="flex items-center space-x-2">
        {/* Home */}
        <li>
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
          >
            Home
          </Link>
        </li>

        {/* All Categories */}
        <li>
          <Link
            to="/products"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
          >
            All Categories
          </Link>
        </li>

        {/* Category */}
        {category && (
          <li>
            <Link
              to={`/products?category=${category}`}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
            >
              {formatName(category)}
            </Link>
          </li>
        )}

        {/* Subcategory */}
        {subcategory && (
          <li>
            <Link
              to={`/products?category=${category}&subcategory=${subcategory}`}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
            >
              {formatName(subcategory)}
            </Link>
          </li>
        )}

        {/* Product */}
        {productName && (
          <li className="text-gray-600 dark:text-gray-300 hover:text-blue-500">
            {formatName(productName)}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumb;
