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
import bkash from "../assets/bkash-logo.jpg";
import nagad from "../assets/nagad-logo.jpg";

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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Checkout</h1>
                    <p className="text-slate-600 dark:text-slate-400">Complete your order securely</p>
                </div>

                <form onSubmit={handleCheckout}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Shipping & Payment */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping Address */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Shipping Address</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Full Name *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={shippingAddress.fullName}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full h-12 focus:input-primary"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Phone *</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={shippingAddress.phone}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full h-12 focus:input-primary"
                                            placeholder="01712-076011"
                                            required
                                        />
                                    </div>

                                    <div className="form-control md:col-span-2">
                                        <label className="label">
                                            <span className="label-text font-medium">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={shippingAddress.email}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full h-12 focus:input-primary"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div className="form-control md:col-span-2">
                                        <label className="label">
                                            <span className="label-text font-medium">Address *</span>
                                        </label>
                                        <textarea
                                            name="address"
                                            value={shippingAddress.address}
                                            onChange={handleInputChange}
                                            className="textarea textarea-bordered w-full min-h-[96px] focus:textarea-primary resize-none"
                                            rows="3"
                                            placeholder="House/Flat, Road, Area"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">City *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={shippingAddress.city}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full h-12 focus:input-primary"
                                            placeholder="Dhaka"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Postal Code</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={shippingAddress.postalCode}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full h-12 focus:input-primary"
                                            placeholder="1200"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Payment Method</h2>
                                </div>

                                <div className="space-y-3">
                                    <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-slate-200 dark:border-slate-700 hover:border-primary/50"}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="stripe"
                                            checked={paymentMethod === "stripe"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="radio radio-primary"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900 dark:text-white">Credit / Debit Card</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Pay securely with Stripe</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <svg className="h-8" viewBox="0 0 38 24" fill="none">
                                                <rect width="38" height="24" rx="3" fill="#1434CB" />
                                                <path d="M12.5 8.5h13v7h-13v-7z" fill="#FF5F00" />
                                                <circle cx="12.5" cy="12" r="5.5" fill="#EB001B" />
                                                <circle cx="25.5" cy="12" r="5.5" fill="#F79E1B" fillOpacity=".8" />
                                            </svg>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "bkash" ? "border-primary bg-primary/5" : "border-slate-200 dark:border-slate-700 hover:border-primary/50"}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="bkash"
                                            checked={paymentMethod === "bkash"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="radio radio-primary"
                                        />
                                        <div className="flex items-center gap-3 flex-1">
                                            <img src={bkash} alt="bKash" className="h-8 w-auto" />
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">bKash</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Pay with bKash</p>
                                            </div>
                                        </div>
                                    </label>

                                    <label className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "nagad" ? "border-primary bg-primary/5" : "border-slate-200 dark:border-slate-700 hover:border-primary/50"}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="nagad"
                                            checked={paymentMethod === "nagad"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="radio radio-primary"
                                        />
                                        <div className="flex items-center gap-3 flex-1">
                                            <img src={nagad} alt="Nagad" className="h-8 w-auto" />
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">Nagad</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Pay with Nagad</p>
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                        <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        Your payment information is secure and encrypted
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 sticky top-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Order Summary</h2>

                                <div className="divider my-2"></div>

                                <div className="space-y-2 text-sm">
                                    {cart.items.map((item) => (
                                        <div key={item._id} className="flex justify-between">
                                            <span className="line-clamp-1">{item.product?.name} x {item.quantity}</span>
                                            <span className="font-medium">৳{((item.discountPrice || item.price) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="divider my-2"></div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                                        <span className="font-semibold">৳{cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Shipping</span>
                                        <span className="text-success font-semibold">FREE</span>
                                    </div>
                                </div>

                                <div className="divider my-2"></div>

                                <div className="flex justify-between text-xl font-bold mb-6">
                                    <span>Total</span>
                                    <span className="text-primary">৳{cartTotal.toFixed(2)}</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary btn-block btn-lg"
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm"></span>
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Place Order
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
                                    By placing your order, you agree to our terms and conditions
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
