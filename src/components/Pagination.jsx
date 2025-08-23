import { useSearchParams } from "react-router";

const Pagination = ({ totalCount, limit = 12, maxButtons = 5 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Handle case when totalCount is 0 or undefined
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / limit) : 0;
  
  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) return null;

  const setPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    setSearchParams(newSearchParams);
  };

  // Calculate page numbers to display
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  
  // Adjust startPage if we're near the end
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

    
  return (
    <div className="join flex justify-center my-4 md:my-8">
      {/* First Page */}
      <button
        className="join-item btn btn-sm md:btn-md"
        onClick={() => setPage(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        ««
      </button>

      {/* Previous Page */}
      <button
        className="join-item btn btn-sm md:btn-md"
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        «
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`join-item btn btn-sm md:btn-md ${
            num === currentPage ? "btn-active" : ""
          }`}
          onClick={() => setPage(num)}
          aria-label={`Page ${num}`}
          aria-current={num === currentPage ? "page" : undefined}
        >
          {num}
        </button>
      ))}

      {/* Next Page */}
      <button
        className="join-item btn btn-sm md:btn-md"
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        »
      </button>

      {/* Last Page */}
      <button
        className="join-item btn btn-sm md:btn-md"
        onClick={() => setPage(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        »»
      </button>
    </div>
  );
};

export default Pagination;