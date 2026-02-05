import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { useSearchParams } from "react-router";
import { FiChevronDown, FiX } from "react-icons/fi";

const FilterSidebar = ({ maxPrice, variant = "desktop" }) => {
  const { data: categories = [], isLoading } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentMaxPrice = searchParams.get("maxPrice") || maxPrice;
  const currentMinPrice = searchParams.get("minPrice") || 0;
  const selectedCategory = searchParams.get("category") || "all";
  const selectedSubcategory = searchParams.get("subcategory") || null;

  const [tempPrice, setTempPrice] = useState([currentMinPrice, currentMaxPrice]);
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(true);

  const handleCategorySelect = (slug) => {
    if (slug === "all") {
      searchParams.delete("category");
      searchParams.delete("subcategory");
    } else {
      searchParams.set("category", slug);
      searchParams.delete("subcategory");
    }
    setSearchParams(searchParams);
  };

  const handleSubcategorySelect = (parentSlug, subSlug) => {
    searchParams.set("category", parentSlug);
    searchParams.set("subcategory", subSlug);
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setTempPrice([0, maxPrice]);
  };

  const handlePriceChange = (e, index) => {
    const value = Number(e.target.value);
    setTempPrice((prev) => {
      const updated = [...prev];
      if (index === 0) {
        updated[0] = Math.min(value, prev[1]);
      } else {
        updated[1] = Math.max(value, prev[0]);
      }
      return updated;
    });
  };

  const applyPriceFilter = () => {
    searchParams.set("minPrice", tempPrice[0]);
    searchParams.set("maxPrice", tempPrice[1]);
    setSearchParams(searchParams);
  };

  const hasActiveFilters = selectedCategory !== "all" || searchParams.has("minPrice") || searchParams.has("maxPrice");

  return (
    <aside
      className={
        variant === "desktop"
          ? "bg-[#FEFCF9] dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-amber-100/50 dark:border-slate-700"
          : "w-full"
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <FiX className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Categories Section */}
      <div className="mb-6">
        <button
          onClick={() => setCategoryExpanded(!categoryExpanded)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="font-semibold text-slate-700 dark:text-slate-200">Categories</span>
          <FiChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${categoryExpanded ? "rotate-180" : ""
              }`}
          />
        </button>

        {categoryExpanded && (
          <div className="space-y-1">
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 bg-slate-100 dark:bg-slate-700 rounded-lg skeleton-shimmer" />
                ))}
              </div>
            ) : (
              <>
                {/* All Categories */}
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === "all"
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  onClick={() => handleCategorySelect("all")}
                >
                  All Categories
                </button>

                {categories.map((cat) => {
                  const isCategorySelected = selectedCategory === cat.slug;
                  return (
                    <div key={cat._id}>
                      <button
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${isCategorySelected
                          ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                          }`}
                        onClick={() => handleCategorySelect(cat.slug)}
                      >
                        {cat.name}
                      </button>

                      {/* Subcategories */}
                      {isCategorySelected && cat.subcategories?.length > 0 && (
                        <div className="ml-3 mt-1 pl-3 border-l-2 border-blue-200 dark:border-blue-800 space-y-1">
                          {cat.subcategories.map((sub) => (
                            <button
                              key={sub._id}
                              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedSubcategory === sub.slug
                                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                                : "text-slate-500 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                                }`}
                              onClick={() => handleSubcategorySelect(cat.slug, sub.slug)}
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200 dark:border-slate-700 my-6" />

      {/* Price Range Section */}
      <div>
        <button
          onClick={() => setPriceExpanded(!priceExpanded)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <span className="font-semibold text-slate-700 dark:text-slate-200">Price Range</span>
          <FiChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${priceExpanded ? "rotate-180" : ""
              }`}
          />
        </button>

        {priceExpanded && (
          <div className="space-y-4">
            {/* Price Inputs */}
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Min</label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full bg-white dark:bg-slate-700 border-amber-100 dark:border-slate-600 rounded-lg"
                  value={tempPrice[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  placeholder="0"
                />
              </div>
              <span className="text-slate-400 pt-5">—</span>
              <div className="flex-1">
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Max</label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full bg-white dark:bg-slate-700 border-amber-100 dark:border-slate-600 rounded-lg"
                  value={tempPrice[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  placeholder={maxPrice}
                />
              </div>
            </div>

            {/* Range Sliders */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={maxPrice}
                step="500"
                value={tempPrice[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="range range-xs range-primary"
              />
              <input
                type="range"
                min="0"
                max={maxPrice}
                step="500"
                value={tempPrice[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="range range-xs range-primary"
              />
            </div>

            {/* Price Display */}
            <div className="text-center text-sm text-slate-600 dark:text-slate-400">
              ৳{Number(tempPrice[0]).toLocaleString()} — ৳{Number(tempPrice[1]).toLocaleString()}
            </div>

            {/* Apply Button */}
            <button
              className="btn btn-primary btn-sm w-full rounded-lg"
              onClick={applyPriceFilter}
            >
              Apply Price Filter
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
