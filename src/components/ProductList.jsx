import Product from "./Product";
import { EmptyState } from "./EmptyState";

const ProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <EmptyState />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
