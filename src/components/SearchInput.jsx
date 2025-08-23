import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

const SearchInput = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get current search query from URL params
  const currentSearch = searchParams.get("search") || "";
  
  // Local state to handle input typing
  const [search, setSearch] = useState(currentSearch);

  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <div className="w-[30rem] flex gap-2">
      <input
        type="text"
        placeholder="Search products..."
        className="input input-bordered w-full"
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
      />
      <button className="btn btn-primary" onClick={handleSearchSubmit}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
