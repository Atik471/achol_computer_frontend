import { useState } from "react";

export default function Inventory() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* Header / Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">128</div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Low Stock</div>
          <div className="stat-value text-warning">14</div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Out of Stock</div>
          <div className="stat-value text-error">6</div>
        </div>
        <div className="stat bg-base-200 rounded-xl shadow">
          <div className="stat-title">Inventory Value</div>
          <div className="stat-value">$12.4k</div>
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
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td>
                  <img
                    src={`https://picsum.photos/40?${i}`}
                    alt="product"
                    className="w-10 h-10 rounded"
                  />
                </td>
                <td>Product {i + 1}</td>
                <td>SKU-{1000 + i}</td>
                <td>Category</td>
                <td>$99</td>
                <td>24</td>
                <td>
                  <span className="badge badge-success">In Stock</span>
                </td>
                <td className="space-x-2">
                  <button className="btn btn-sm btn-outline btn-info">Update</button>
                  <button className="btn btn-sm btn-outline btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="join flex justify-center">
        <button className="join-item btn">«</button>
        <button className="join-item btn">1</button>
        <button className="join-item btn btn-active">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">»</button>
      </div>
    </div>
  );
}
