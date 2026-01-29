import { useSearchParams } from "react-router";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const Pagination = ({ totalCount, limit = 12, maxButtons = 5 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const totalPages = totalCount > 0 ? Math.ceil(totalCount / limit) : 0;

  if (totalPages <= 1) return null;

  const setPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    setSearchParams(newSearchParams);
  };

  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {/* First & Previous */}
      <div className="flex items-center gap-1">
        <button
          className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          onClick={() => setPage(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <FiChevronsLeft className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {startPage > 1 && (
          <>
            <button
              className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all font-medium"
              onClick={() => setPage(1)}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-1 text-slate-400">...</span>
            )}
          </>
        )}

        {pageNumbers.map((num) => (
          <button
            key={num}
            className={`w-10 h-10 rounded-lg font-medium transition-all ${num === currentPage
                ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 hover:border-blue-200"
              }`}
            onClick={() => setPage(num)}
            aria-label={`Page ${num}`}
            aria-current={num === currentPage ? "page" : undefined}
          >
            {num}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-1 text-slate-400">...</span>
            )}
            <button
              className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 hover:border-blue-200 transition-all font-medium"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next & Last */}
      <div className="flex items-center gap-1">
        <button
          className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
        <button
          className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          onClick={() => setPage(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <FiChevronsRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;