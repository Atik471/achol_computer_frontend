import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { useSearchParams } from "react-router";

const FilterSidebar = ({ onPriceChange }) => {
  const { data: categories = [], isLoading } = useCategories();
  const [price, setPrice] = useState([0, 500000]);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";
  const selectedSubcategory = searchParams.get("subcategory") || null;

  const handleCategorySelect = (slug) => {
    if (slug === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  const handleSubcategorySelect = (parentSlug, subSlug) => {
    setSearchParams({ category: parentSlug, subcategory: subSlug });
  };



  const handlePriceChange = (e, index) => {
    const value = Number(e.target.value);
    setPrice((prev) => {
      const updated = [...prev];

      if (index === 0) {
        // updating lower bound
        updated[0] = Math.min(value, prev[1]); // clamp to not exceed upper
      } else {
        // updating upper bound
        updated[1] = Math.max(value, prev[0]); // clamp to not go below lower
      }

      return updated;
    });
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
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="input input-bordered w-20 text-sm"
            value={price[0]}
            onChange={(e) => handlePriceChange(e, 0)}
          />
          <span>-</span>
          <input
            type="number"
            className="input input-bordered w-20 text-sm"
            value={price[1]}
            onChange={(e) => handlePriceChange(e, 1)}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="100"
          value={price[0]}
          onChange={(e) => handlePriceChange(e, 0)}
          className="range range-xs mt-2"
        />
        <input
          type="range"
          min="0"
          max="100000"
          step="100"
          value={price[1]}
          onChange={(e) => handlePriceChange(e, 1)}
          className="range range-xs"
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;
