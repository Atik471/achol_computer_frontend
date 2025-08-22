import ProductCard from "../components/Product";
import { useProducts } from "../hooks/useProducts";
import { EmptyState } from "../components/EmptyState";

// Loading State Component
const LoadingState = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
);

// Error State Component
const ErrorState = () => (
    <div className="flex justify-center items-center min-h-[50vh]">
        <div className="alert alert-error shadow-lg w-fit">
            <span>⚠️ Failed to load products. Please try again.</span>
        </div>
    </div>
);



const ProductsPage = () => {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState />;


    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold">Electronics</h1>
                {/* Sorting (optional dropdown) */}
                <select className="select select-bordered w-full sm:w-48">
                    <option disabled selected>Sort By</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Best Rated</option>
                </select>
            </div>

            {/* Product Grid */}
            {products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
};

export default ProductsPage;
