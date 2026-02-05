import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import { useCart } from "../hooks/useCart";

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const { refreshCart } = useCart();

    useEffect(() => {
        // Refresh cart to clear it after successful order
        refreshCart();
    }, []);

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                    <FiCheckCircle className="w-24 h-24 text-success" />
                </div>

                <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
                <p className="text-lg text-base-content/70 mb-8">
                    Thank you for your order. We'll send you a confirmation email shortly.
                </p>

                {orderId && (
                    <div className="alert alert-info mb-8">
                        <div>
                            <span className="font-semibold">Order ID:</span> {orderId}
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate("/orders")}
                        className="btn btn-primary"
                    >
                        View My Orders
                    </button>
                    <button
                        onClick={() => navigate("/products")}
                        className="btn btn-outline"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
