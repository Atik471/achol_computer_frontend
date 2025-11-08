import { useState } from 'react';
import { Link } from 'react-router';
import { useAdminProducts } from './useAdminProducts';
import ProductRow from './ProductRow';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const ManageProducts = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    sort: '-createdAt',
  });

  const { products, pagination, isLoading, isError } = useAdminProducts(filters);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-red-500 text-center py-10">Error loading products.</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            View, edit, and manage all products in your inventory.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/admin/products/new">
            <button className="btn btn-primary">Add Product</button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          name="search"
          placeholder="Search by name..."
          className="input input-bordered w-full"
          value={filters.search}
          onChange={handleFilterChange}
        />
        {/* Add more filters for category, brand etc. as dropdowns */}
        <select
          name="sort"
          className="select select-bordered w-full"
          value={filters.sort}
          onChange={handleFilterChange}
        >
          <option value="-createdAt">Newest First</option>
          <option value="createdAt">Oldest First</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
          <option value="-name">Name: Z-A</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="mt-8 overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Featured</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <ProductRow key={product._id} product={product} />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ManageProducts;