import { useState } from "react";
import { useProducts } from "../hooks/useProducts.js";
import Pagination from "../components/Pagination.jsx";
import LoadingSpinner from "../components/LoadingSpinner";
// import { Helmet } from "react-helmet-async";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-error">Failed to load products</div>;

  const products = data.data;
  const totalCount = data.totalCount;
  // const minPrice = data.minPrice;
  const maxPrice = data.maxPrice;

  // search filter
  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* <Helmet>
        <title>Achol Computer | Inventory</title>
        <meta name="description" content="Trusted electronics store in Bangladesh." />
      </Helmet> */}
      {/* Header / Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{products?.length || 0}</div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Low Stock</div>
          <div className="stat-value text-warning">
            {products?.filter((p) => p.stock > 0 && p.stock < 10).length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Out of Stock</div>
          <div className="stat-value text-error">
            {products?.filter((p) => p.quantity === 0).length}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Inventory Value</div>
          <div className="stat-value">
            $
            {products
              ?.reduce((acc, p) => acc + p.price * p.stock, 0)
              .toLocaleString()}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full md:w-64"
          />
          <select className="select select-bordered">
            <option disabled>Filter</option>
            <option>All</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
          <select className="select select-bordered">
            <option>Sort by</option>
            <option>Name</option>
            <option>Price</option>
            <option>Quantity</option>
          </select>
        </div>
        <button className="btn btn-primary">+ Add Product</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={p.image || `https://picsum.photos/40?random=${p._id}`}
                    alt={p.name}
                    className="w-10 h-10 rounded"
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>
                  {p.category?.name}
                  {p.category?.subcategory
                    ? ` / ${p.category.subcategory.name}`
                    : ""}
                </td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>
                  {p.quantity === 0 ? (
                    <span className="badge badge-error">Out of Stock</span>
                  ) : p.quantity < 10 ? (
                    <span className="badge badge-warning">Low Stock</span>
                  ) : (
                    <span className="badge badge-success">In Stock</span>
                  )}
                </td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-outline btn-info">
                    Update
                  </button>
                  <button className="btn btn-sm btn-outline btn-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
}
