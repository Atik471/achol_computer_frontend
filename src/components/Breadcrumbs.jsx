import { Link, useLocation } from "react-router";
import { FiHome, FiChevronRight } from "react-icons/fi";

const Breadcrumbs = ({ categoryslug, subcategoryslug, productNameslug }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const category = searchParams.get("category") || categoryslug;
  const subcategory = searchParams.get("subcategory") || subcategoryslug;
  const productName = searchParams.get("product") || productNameslug;

  const formatName = (str) =>
    str ? str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";

  const crumbs = [
    { label: "Home", to: "/", icon: FiHome },
    { label: "Products", to: "/products" },
  ];

  if (category) {
    crumbs.push({ label: formatName(category), to: `/products?category=${category}` });
  }

  if (subcategory) {
    crumbs.push({
      label: formatName(subcategory),
      to: `/products?category=${category}&subcategory=${subcategory}`
    });
  }

  if (productName) {
    crumbs.push({ label: formatName(productName), to: null });
  }

  return (
    <nav className="flex items-center gap-1 text-sm flex-wrap">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        const Icon = crumb.icon;

        return (
          <div key={index} className="flex items-center gap-1">
            {index > 0 && (
              <FiChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            )}

            {isLast ? (
              <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">
                {Icon && <Icon className="w-4 h-4 inline-block mr-1" />}
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.to}
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate max-w-[150px] flex items-center gap-1"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {!Icon && crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
