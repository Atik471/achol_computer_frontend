
import { Link } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import { ErrorState } from "./ErrorState";
import { useProducts } from "../hooks/useProducts";
import Product from "./Product";

function FeaturedSection({ name, slug }) {
    const { data, isLoading, error } = useProducts({ category: slug, limit: 4 });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorState />;

    const products = data.data;

    return (
        <section className="py-12 px-6 bg-gradient-to-b from-[#f7fafc] to-[#edf2f7] dark:from-[#202121] dark:to-[#181919]">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {name}
                </h2>
                <Link
                    to={`/products/?category=${slug}`}
                    className="btn btn-sm rounded-full bg-[#468a9a] text-white hover:bg-[#3b7480]"
                >
                    View All
                </Link>
            </div>

            {/* Products Grid */}
            {products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default FeaturedSection;
