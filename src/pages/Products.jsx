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
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);

  // convert search params to object
  const params = Object.fromEntries([...searchParams]);
  const currentSort = searchParams.get("sort") || "";

  const { data, isLoading, error } = useProducts(params);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorState />;

  const products = data.data;
  const totalCount = data.totalCount;
  const maxPrice = data.maxPrice;

  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      searchParams.delete("sort");
    } else {
      let sortParam = "";
      switch (value) {
        case "price":
          sortParam = "price";
          break;
        case "-price":
          sortParam = "-price";
          break;
        case "-createdAt":
          sortParam = "-createdAt";
          break;
        default:
          sortParam = "";
      }
      searchParams.set("sort", sortParam);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="p-4 lg:p-6">
      {/* Top Panel */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4 mb-4">
        <Breadcrumbs />

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          <SearchInput />

          <div className="flex w-full sm:w-auto items-center gap-2">
            {/* Sort */}
            <select
              className="select select-bordered flex-1 sm:flex-none max-w-[12rem] sm:max-w-[16rem]"
              value={currentSort}
              onChange={handleSortChange}
            >
              <option disabled value="">
                Sort by
              </option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-createdAt">Newest</option>
            </select>

            {/* Mobile Filter Drawer Button */}
            <label
              htmlFor="filter-drawer"
              className="btn btn-outline sm:hidden p-2"
              title="Filters"
            >
              <FiFilter className="text-lg" />
            </label>
          </div>
        </div>
      </div>

      {/* Drawer Wrapper for mobile */}
      <div className="drawer drawer-end sm:hidden">
        <input id="filter-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content"></div>
        <div className="drawer-side z-50">
          <label htmlFor="filter-drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-72 bg-base-200 min-h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <label htmlFor="filter-drawer" className="btn btn-sm btn-ghost">
                <IoClose className="text-xl" />
              </label>
            </div>
            <FilterSidebar maxPrice={maxPrice} variant="mobile" />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="flex gap-6">
        <aside className="hidden md:block w-64 shrink-0">
          <FilterSidebar maxPrice={maxPrice} variant="desktop" />
        </aside>

        <main className="flex-1">
          <ProductList products={products} />
          {products?.length > 0 && (
            <Pagination totalCount={totalCount} limit={12} maxButtons={7} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
