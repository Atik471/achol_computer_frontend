import Product from "./Product";
import { EmptyState } from "./EmptyState";

const ProductList = ({ products, viewMode = "grid" }) => {
  if (!products || products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          : "flex flex-col gap-4"
      }
    >
      {products.map((product, index) => (
        <div
          key={product._id || product.id}
          className="animate-scale-in"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
