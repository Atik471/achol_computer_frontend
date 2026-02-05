import React from "react";
import { Link } from "react-router";
import { FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import LoadingSpinner from "../components/LoadingSpinner";
import { EmptyState } from "../components/EmptyState";

const Wishlist = () => {
    const { wishlist, loading, count, removeProduct, moveProductToCart } = useWishlist();
    const { refreshCart } = useCart();

    const handleRemove = async (productId) => {
        await removeProduct(productId);
    };

    const handleMoveToCart = async (productId) => {
        const success = await moveProductToCart(productId, 1);
        if (success) {
            // Refresh cart to update count
            refreshCart();
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!wishlist || count === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <EmptyState
                    icon={<FiHeart className="w-16 h-16" />}
                    title="Your wishlist is empty"
                    message="Save your favorite products for later!"
                    actionLink="/products"
                    actionText="Browse Products"
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Wishlist</h1>
                <p className="text-base-content/60">{count} {count === 1 ? 'item' : 'items'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.products.map((product) => (
                    <div key={product._id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow relative">
                        {/* Remove Button */}
                        <button
                            onClick={() => handleRemove(product._id)}
                            className="absolute top-2 right-2 btn btn-ghost btn-circle btn-sm z-10"
                        >
                            <FiX className="w-4 h-4" />
                        </button>

                        <Link to={`/products/${product.slug}`}>
                            <figure className="px-4 pt-4">
                                <img
                                    src={product.images?.[0] || "/placeholder.png"}
                                    alt={product.name}
                                    className="rounded-lg object-cover w-full h-48"
                                />
                            </figure>
                        </Link>

                        <div className="card-body">
                            <Link to={`/products/${product.slug}`}>
                                <h2 className="card-title text-base hover:text-primary line-clamp-2">
                                    {product.name}
                                </h2>
                            </Link>

                            <p className="text-sm text-base-content/60">{product.brand}</p>

                            {/* Price */}
                            <div className="mt-2">
                                {product.discountPrice ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg font-bold text-primary">
                                            ৳{product.discountPrice.toFixed(2)}
                                        </span>
                                        <span className="text-sm line-through text-base-content/50">
                                            ৳{product.price.toFixed(2)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-lg font-bold">
                                        ৳{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                                    </span>
                                )}
                            </div>

                            {/* Rating */}
                            {product.ratings && product.ratings.count > 0 && (
                                <div className="flex items-center gap-1 text-sm">
                                    <div className="rating rating-sm">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <input
                                                key={star}
                                                type="radio"
                                                className="mask mask-star-2 bg-orange-400"
                                                checked={star <= Math.round(product.ratings.average)}
                                                readOnly
                                            />
                                        ))}
                                    </div>
                                    <span className="text-base-content/60">({product.ratings.count})</span>
                                </div>
                            )}

                            <div className="card-actions mt-4">
                                <button
                                    onClick={() => handleMoveToCart(product._id)}
                                    className="btn btn-primary btn-sm w-full"
                                >
                                    <FiShoppingCart className="w-4 h-4" />
                                    Move to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
