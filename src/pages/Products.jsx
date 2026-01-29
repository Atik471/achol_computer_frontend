import { useProducts } from "../hooks/useProducts";
import { ErrorState } from "../components/ErrorState";
import LoadingSpinner from "../components/LoadingSpinner";
import Breadcrumbs from "../components/Breadcrumbs";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router";
import SearchInput from "../components/SearchInput";
import { useEffect, useState } from "react";
import { FiFilter, FiGrid, FiList } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const params = Object.fromEntries([...searchParams]);
  const currentSort = searchParams.get("sort") || "";
  const currentCategory = searchParams.get("category") || "";

  const { data, isLoading, error } = useProducts(params);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
        <LoadingSpinner variant="inline" message="Loading products..." />
      </div>
    );
  }

  if (error) return <ErrorState />;

  const products = data.data;
  const totalCount = data.totalCount;
  const maxPrice = data.maxPrice;

  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", value);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 lg:py-16 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {currentCategory
                ? `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Products`
                : "All Products"
              }
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Discover quality electronics and accessories at competitive prices
            </p>
            <div className="mt-4 text-sm text-blue-200">
              {totalCount} products found
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs />
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex flex-1 items-center gap-3">
            <SearchInput />
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                    ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                title="Grid View"
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                    ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                title="List View"
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              className="select select-bordered bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 rounded-xl text-sm min-w-[160px]"
              value={currentSort}
              onChange={handleSortChange}
            >
              <option value="">Sort by: Default</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-createdAt">Newest First</option>
            </select>

            {/* Mobile Filter Button */}
            <label
              htmlFor="filter-drawer"
              className="btn btn-outline border-slate-200 dark:border-slate-600 lg:hidden rounded-xl"
              title="Filters"
            >
              <FiFilter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </label>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <div className="drawer drawer-end lg:hidden">
          <input id="filter-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content"></div>
          <div className="drawer-side z-50">
            <label htmlFor="filter-drawer" className="drawer-overlay"></label>
            <div className="w-80 min-h-full bg-white dark:bg-slate-800 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Filters</h2>
                <label htmlFor="filter-drawer" className="btn btn-sm btn-ghost btn-circle">
                  <IoClose className="text-xl" />
                </label>
              </div>
              <FilterSidebar maxPrice={maxPrice} variant="mobile" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar maxPrice={maxPrice} variant="desktop" />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {products?.length > 0 ? (
              <>
                <ProductList products={products} viewMode={viewMode} />
                <div className="mt-8">
                  <Pagination totalCount={totalCount} limit={12} maxButtons={7} />
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <FiFilter className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => setSearchParams({})}
                  className="btn btn-primary rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
