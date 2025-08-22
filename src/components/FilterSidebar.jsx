import { useState } from "react";

const categories = [
  "All categories",
  "ACCESSORIES",
  "KEYBOARD",
  "MICROPACK KEYBOARD",
  "A4TECH KEYBOARD",
  "iMICE KEYBOARD",
  "APTECH KEYBOARD",
  "DELUX KEYBOARD",
  "GIGABYTE KEYBOARD",
  "HAVIT KEYBOARD",
  "RAPOO KEYBOARD",
  "HP KEYBOARD",
  "TARGUS KEYBOARD",
  "PC POWER KEYBOARD",
  "LOGITECH KEYBOARD",
  "FANTECH KEYBOARD",
  "XTREME KEYBOARD",
];

const FilterSidebar = ({ onCategoryChange, onPriceChange, onSearch }) => {
  const [price, setPrice] = useState([0, 20000]);
  const [search, setSearch] = useState("");

  const handlePriceChange = (e, index) => {
    const newPrice = [...price];
    newPrice[index] = Number(e.target.value);
    setPrice(newPrice);
    onPriceChange(newPrice);
  };

  return (
    <aside className="w-64 hidden lg:block p-4 bg-base-200 dark:bg-base-300 rounded-2xl shadow-sm">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="space-y-1 max-h-60 overflow-y-auto">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                className="w-full text-left hover:bg-base-300 rounded-md p-1 text-sm"
                onClick={() => onCategoryChange(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
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
          max="50000"
          step="100"
          value={price[0]}
          onChange={(e) => handlePriceChange(e, 0)}
          className="range range-xs mt-2"
        />
        <input
          type="range"
          min="0"
          max="50000"
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
