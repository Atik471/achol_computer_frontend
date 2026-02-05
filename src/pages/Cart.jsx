import React from "react";
import { Link } from "react-router";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import LoadingSpinner from "../components/LoadingSpinner";
import { EmptyState } from "../components/EmptyState";

const Cart = () => {
    const { cart, loading, itemCount, cartTotal, updateItem, removeItem } = useCart();

    const handleUpdateQuantity = async (itemId, currentQuantity, change) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity > 0) {
            await updateItem(itemId, newQuantity);
        }
    };

    const handleRemove = async (itemId) => {
        if (window.confirm("Remove this item from cart?")) {
            await removeItem(itemId);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!cart || itemCount === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <EmptyState
                    icon={<FiShoppingBag className="w-16 h-16" />}
                    title="Your cart is empty"
                    message="Add some products to get started!"
                    actionLink="/products"
                    actionText="Browse Products"
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <div key={item._id} className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <div className="flex gap-4">
                                    {/* Product Image */}
                                    <Link to={`/products/${item.product?.slug}`} className="flex-shrink-0">
                                        <img
                                            src={item.product?.images?.[0] || "/placeholder.png"}
                                            alt={item.product?.name}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                    </Link>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <Link to={`/products/${item.product?.slug}`}>
                                            <h3 className="font-semibold hover:text-primary">
                                                {item.product?.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-base-content/60">{item.product?.brand}</p>

                                        <div className="mt-2">
                                            {item.discountPrice ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg font-bold text-primary">
                                                        ৳{item.discountPrice.toFixed(2)}
                                                    </span>
                                                    <span className="text-sm line-through text-base-content/50">
                                                        ৳{item.price.toFixed(2)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-lg font-bold">
                                                    ৳{item.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex flex-col items-end gap-4">
                                        <button
                                            onClick={() => handleRemove(item._id)}
                                            className="btn btn-ghost btn-sm btn-circle"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>

                                        <div className="join">
                                            <button
                                                onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                                                className="btn btn-sm join-item"
                                                disabled={item.quantity <= 1}
                                            >
                                                <FiMinus />
                                            </button>
                                            <div className="btn btn-sm join-item no-animation">
                                                {item.quantity}
                                            </div>
                                            <button
                                                onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                                                className="btn btn-sm join-item"
                                            >
                                                <FiPlus />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm text-base-content/60">Subtotal</p>
                                            <p className="font-bold">
                                                ৳{((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="card bg-base-100 shadow-md sticky top-4">
                        <div className="card-body">
                            <h2 className="card-title">Order Summary</h2>

                            <div className="divider my-2"></div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Items ({itemCount})</span>
                                    <span>৳{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-success">FREE</span>
                                </div>
                            </div>

                            <div className="divider my-2"></div>

                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>৳{cartTotal.toFixed(2)}</span>
                            </div>

                            <Link to="/checkout" className="btn btn-primary btn-block mt-4">
                                Proceed to Checkout
                            </Link>

                            <Link to="/products" className="btn btn-ghost btn-block">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
