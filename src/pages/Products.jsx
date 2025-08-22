import { useProducts } from "../hooks/useProducts";
import { ErrorState } from "../components/ErrorState";
import LoadingSpinner from "../components/LoadingSpinner";
import Breadcrumbs from "../components/Breadcrumbs";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";

const ProductsPage = () => {
  const { data: products, isLoading, error } = useProducts();

  const breadcrumbPaths = [
    { label: "Home", href: "/" },
    { label: "All categories", href: "/categories" },
    { label: "KEYBOARD" }, // current category
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState />;

  return (
    <div className="p-4 lg:p-6">
      <Breadcrumbs paths={breadcrumbPaths} />

      {/* Top controls */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        {/* Brand filter */}
        <select className="select select-bordered">
          <option disabled selected>Filter by brand</option>
          <option>Logitech</option>
          <option>A4Tech</option>
          <option>HP</option>
          <option>Micropack</option>
        </select>

        {/* Sort */}
        <select className="select select-bordered">
          <option disabled selected>Sort by</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <FilterSidebar
          onCategoryChange={(cat) => console.log("Category:", cat)}
          onPriceChange={(range) => console.log("Price range:", range)}
          onSearch={(q) => console.log("Search:", q)}
        />

        {/* Products */}
        <main className="flex-1">
          <ProductList products={products} />
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
