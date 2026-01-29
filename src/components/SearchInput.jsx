import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { FiSearch, FiX } from "react-icons/fi";

const SearchInput = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [search, setSearch] = useState(currentSearch);

  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (search) {
      searchParams.set("search", search);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
    if (onSearch) onSearch(search);
  };

  const handleClear = () => {
    setSearch("");
    searchParams.delete("search");
    setSearchParams(searchParams);
    if (onSearch) onSearch("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch className="w-4 h-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search products..."
          className="input w-full pl-11 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
        />
        {search && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-12 flex items-center text-slate-400 hover:text-slate-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
        <button
          className="absolute inset-y-0 right-0 px-4 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium text-sm"
          onClick={handleSearchSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
