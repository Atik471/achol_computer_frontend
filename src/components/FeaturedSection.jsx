import { Link } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
import { ErrorState } from "./ErrorState";
import { useProducts } from "../hooks/useProducts";
import Product from "./Product";
import { FaArrowRight } from "react-icons/fa";

function FeaturedSection({ name, slug }) {
    const { data, isLoading, error } = useProducts({ category: slug, limit: 4 });

    if (isLoading) return <LoadingSpinner variant="inline" message="Loading products..." />;
    if (error) return <ErrorState />;

    const products = data.data;

    if (!products || products.length === 0) return null;

    return (
        <section className="py-16 lg:py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {name}
                        </h2>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">
                            Explore our top picks in this category
                        </p>
                    </div>
                    <Link
                        to={`/products?category=${slug}`}
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-blue-500 hover:text-white transition-all duration-300"
                    >
                        View All
                        <FaArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={product._id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <Product product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedSection;
