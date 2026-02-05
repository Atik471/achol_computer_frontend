import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { FiCheckCircle } from "react-icons/fi";

const StripePayment = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(true);

    const orderId = searchParams.get("orderId");
    const clientSecret = searchParams.get("clientSecret");

    useEffect(() => {
        // Simulate payment processing
        // In a real implementation, you would integrate Stripe Elements here
        // and handle the payment confirmation

        if (!orderId || !clientSecret) {
            navigate("/cart");
            return;
        }

        // Auto-redirect to order confirmation after 2 seconds
        // This simulates successful payment processing
        const timer = setTimeout(() => {
            setProcessing(false);
            setTimeout(() => {
                navigate(`/order-confirmation?orderId=${orderId}`);
            }, 1500);
        }, 2000);

        return () => clearTimeout(timer);
    }, [orderId, clientSecret, navigate]);

    if (processing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="text-center">
                    <LoadingSpinner variant="spinner" message="Processing your payment..." />
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        Please wait while we securely process your payment
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                    <FiCheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Payment Successful!
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Redirecting to order confirmation...
                </p>
            </div>
        </div>
    );
};

export default StripePayment;
