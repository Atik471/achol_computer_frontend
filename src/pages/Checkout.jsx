import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../contexts/AuthProvider";
import * as orderService from "../services/orderService";
import * as paymentService from "../services/paymentService";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { EmptyState } from "../components/EmptyState";
import { FiShoppingBag } from "react-icons/fi";

const Checkout = () => {
    const { cart, itemCount, cartTotal, clearCartItems } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("stripe");

    const [shippingAddress, setShippingAddress] = useState({
        fullName: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        address: "",
        city: "",
        postalCode: "",
        country: "Bangladesh"
    });

    useEffect(() => {
        if (!user) {
            toast.error("Please login to checkout");
            navigate("/login");
        }
        if (itemCount === 0) {
            navigate("/cart");
        }
    }, [user, itemCount, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        // Validate shipping address
        if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address || !shippingAddress.city) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);

        try {
            // Create order
            const orderResponse = await orderService.createOrder({
                shippingAddress,
                paymentMethod,
                shippingCost: 0,
                tax: 0
            });

            if (!orderResponse.success) {
                throw new Error(orderResponse.message || "Failed to create order");
            }

            const orderId = orderResponse.data.order._id;

            // Handle payment based on method
            switch (paymentMethod) {
                case "stripe":
                    const stripeResponse = await paymentService.createStripeIntent(orderId);
                    if (stripeResponse.success) {
                        // Redirect to Stripe payment page or handle client secret
                        toast.success("Redirecting to payment...");
                        navigate(`/payment/stripe?orderId=${orderId}&clientSecret=${stripeResponse.data.clientSecret}`);
                    }
                    break;

                case "bkash":
                    const bkashResponse = await paymentService.createBkashPayment(orderId);
                    if (bkashResponse.success) {
                        // Redirect to bKash payment URL
                        window.location.href = bkashResponse.data.bkashURL;
                    }
                    break;

                case "nagad":
                    const nagadResponse = await paymentService.createNagadPayment(orderId);
                    if (nagadResponse.success) {
                        // Redirect to Nagad payment URL
                        window.location.href = nagadResponse.data.nagadURL;
                    }
                    break;

                default:
                    toast.error("Invalid payment method");
            }

        } catch (error) {
            console.error("Checkout error:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to process checkout");
        } finally {
            setLoading(false);
        }
    };

    if (!cart || itemCount === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <EmptyState
                    icon={<FiShoppingBag className="w-16 h-16" />}
                    title="Your cart is empty"
                    message="Add some products to checkout!"
                    actionLink="/products"
                    actionText="Browse Products"
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <form onSubmit={handleCheckout}>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Shipping & Payment */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Address */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title mb-4">Shipping Address</h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Full Name *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={shippingAddress.fullName}
                                            onChange={handleInputChange}
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Phone *</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={shippingAddress.phone}
                                            onChange={handleInputChange}
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>

                                    <div className="form-control md:col-span-2">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={shippingAddress.email}
                                            onChange={handleInputChange}
                                            className="input input-bordered"
                                        />
                                    </div>

                                    <div className="form-control md:col-span-2">
                                        <label className="label">
                                            <span className="label-text">Address *</span>
                                        </label>
                                        <textarea
                                            name="address"
                                            value={shippingAddress.address}
                                            onChange={handleInputChange}
                                            className="textarea textarea-bordered"
                                            rows="3"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">City *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={shippingAddress.city}
                                            onChange={handleInputChange}
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Postal Code</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={shippingAddress.postalCode}
                                            onChange={handleInputChange}
                                            className="input input-bordered"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title mb-4">Payment Method</h2>

                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-base-200">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="stripe"
                                            checked={paymentMethod === "stripe"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="radio radio-primary"
                                        />
                                        <div>
                                            <p className="font-semibold">Credit / Debit Card</p>
                                            <p className="text-sm text-base-content/60">Pay securely with Stripe</p>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-base-200">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="bkash"
                                            checked={paymentMethod === "bkash"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="radio radio-primary"
                                        />
                                        <div className="flex items-center gap-2">
                                            <img src="/src/assets/bkash-logo.jpg" alt="bKash" className="h-6" />
                                            <div>
                                                <p className="font-semibold">bKash</p>
                                                <p className="text-sm text-base-content/60">Pay with bKash</p>
                                            </div>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-base-200">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="nagad"
                                            checked={paymentMethod === "nagad"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="radio radio-primary"
                                        />
                                        <div className="flex items-center gap-2">
                                            <img src="/src/assets/nagad-logo.jpg" alt="Nagad" className="h-6" />
                                            <div>
                                                <p className="font-semibold">Nagad</p>
                                                <p className="text-sm text-base-content/60">Pay with Nagad</p>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card bg-base-100 shadow-md sticky top-4">
                            <div className="card-body">
                                <h2 className="card-title">Order Summary</h2>

                                <div className="divider my-2"></div>

                                <div className="space-y-2 text-sm">
                                    {cart.items.map((item) => (
                                        <div key={item._id} className="flex justify-between">
                                            <span className="line-clamp-1">{item.product?.name} x {item.quantity}</span>
                                            <span>৳{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="divider my-2"></div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
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

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary btn-block mt-4"
                                >
                                    {loading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Place Order"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
