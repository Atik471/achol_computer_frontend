import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { useSearchParams } from "react-router";

const FilterSidebar = ({ maxPrice }) => {
  const { data: categories = [], isLoading } = useCategories();
  const [price, setPrice] = useState([0, maxPrice]);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentMaxPrice = searchParams.get("maxPrice") || maxPrice;
  const currentMinPrice = searchParams.get("minPrice") || 0;
  const selectedCategory = searchParams.get("category") || "all";
  const selectedSubcategory = searchParams.get("subcategory") || null;

  const [tempPrice, setTempPrice] = useState([currentMinPrice, currentMaxPrice]);

  const handleCategorySelect = (slug) => {
    if (slug === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };


  // Inside your component
  const clearFilters = () => {
    // Clear URL params
    setSearchParams({});

    // Reset price state
    setPrice([0, maxPrice]);
    setTempPrice([0, maxPrice]);

    // Optionally, reset other local states if you have any filters like category/subcategory
    // setSelectedCategory("all");
    // setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (parentSlug, subSlug) => {
    setSearchParams({ category: parentSlug, subcategory: subSlug });
  };

  // Update temp values with validation
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

  // Apply filter only when button clicked
  const applyPriceFilter = () => {
    setPrice(tempPrice);
    searchParams.set("minPrice", tempPrice[0]);
    searchParams.set("maxPrice", tempPrice[1]);
    setSearchParams(searchParams);
  };

  return (
    <aside className="w-64 hidden lg:block p-4 bg-base-200 rounded-2xl shadow-sm h-screen sticky top-6">
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categories</h3>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : (
          <ul className="space-y-1 max-h-60 overflow-y-auto">
            {/* All Categories */}
            <li>
              <button
                className={`w-full text-left rounded-md p-1 text-sm ${selectedCategory === "all"
                  ? "bg-primary text-white"
                  : "hover:bg-base-300"
                  }`}
                onClick={() => handleCategorySelect("all")}
              >
                All Categories
              </button>
            </li>

            {categories.map((cat) => {
              const isCategorySelected = selectedCategory === cat.slug;
              return (
                <li key={cat._id}>
                  <button
                    className={`w-full text-left rounded-md p-1 text-sm ${isCategorySelected
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                      }`}
                    onClick={() => handleCategorySelect(cat.slug)}
                  >
                    {cat.name}
                  </button>

                  {/* Keep subcategories open if parent is selected */}
                  {isCategorySelected && cat.subcategories?.length > 0 && (
                    <ul className="pl-4 space-y-1">
                      {cat.subcategories.map((sub) => (
                        <li key={sub._id}>
                          <button
                            className={`w-full text-left rounded-md p-1 text-xs ${selectedSubcategory === sub.slug
                              ? "bg-primary text-white"
                              : "hover:bg-base-300"
                              }`}
                            onClick={() =>
                              handleSubcategorySelect(cat.slug, sub.slug)
                            }
                          >
                            {sub.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>

        {/* Number inputs */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="input input-bordered w-20 text-sm"
            value={tempPrice[0]} // <-- bind to tempPrice
            onChange={(e) => handlePriceChange(e, 0)}
          />
          <span>-</span>
          <input
            type="number"
            className="input input-bordered w-20 text-sm"
            value={tempPrice[1]} // <-- bind to tempPrice
            onChange={(e) => handlePriceChange(e, 1)}
          />
        </div>

        {/* Range sliders */}
        <input
          type="range"
          min="0"
          max={maxPrice}
          step="100"
          value={tempPrice[0]} // <-- bind to tempPrice
          onChange={(e) => handlePriceChange(e, 0)}
          className="range range-xs mt-2"
        />
        <input
          type="range"
          min="0"
          max={maxPrice}
          step="100"
          value={tempPrice[1]} // <-- bind to tempPrice
          onChange={(e) => handlePriceChange(e, 1)}
          className="range range-xs"
        />

        {/* Apply button */}
        <button
          className="btn btn-primary btn-sm mt-2"
          onClick={applyPriceFilter}
        >
          Apply
        </button>
      </div>
      <button
        className="btn btn-sm btn-accent mt-2"
        onClick={clearFilters}
      >
        Clear Filters
      </button>

    </aside>
  );
};

export default FilterSidebar;
