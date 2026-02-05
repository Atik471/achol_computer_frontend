import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import LoadingSpinner from "../components/LoadingSpinner";
import { FiCheckCircle, FiCreditCard, FiLock, FiAlertCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import * as paymentService from "../services/paymentService";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ orderId, clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [paymentComplete, setPaymentComplete] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            // Confirm the payment with Stripe
            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                    },
                }
            );

            if (stripeError) {
                setError(stripeError.message);
                toast.error(stripeError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                setPaymentComplete(true);
                toast.success("Payment successful!");

                // Redirect to order confirmation
                setTimeout(() => {
                    navigate(`/order-confirmation?orderId=${orderId}`);
                }, 2000);
            }
        } catch (err) {
            console.error("Payment error:", err);
            setError("An unexpected error occurred");
            toast.error("Payment failed");
            setProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                    color: "#aab7c4",
                },
            },
            invalid: {
                color: "#9e2146",
            },
        },
    };

    if (paymentComplete) {
        return (
            <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                    <FiCheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Payment Successful!
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                    Redirecting to order confirmation...
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="flex items-center gap-2 mb-4">
                        <FiCreditCard className="w-5 h-5 text-primary" />
                        <h2 className="card-title">Payment Details</h2>
                    </div>

                    {/* Stripe Card Element */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text font-medium">Card Information</span>
                        </label>
                        <div className="p-4 border border-base-300 rounded-lg bg-base-200">
                            <CardElement options={cardElementOptions} />
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="alert alert-error mb-4">
                            <FiAlertCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Security Notice */}
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
                        <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                            <FiLock className="w-4 h-4" />
                            <span>Your payment is secured by Stripe - PCI DSS compliant</span>
                        </div>
                    </div>

                    {/* Test Card Notice */}
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-4">
                        <p className="text-xs text-yellow-800 dark:text-yellow-200">
                            <strong>Test Mode:</strong> Use card <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">4242 4242 4242 4242</code> with any future expiry and any CVC
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!stripe || processing}
                        className="btn btn-primary btn-block btn-lg"
                    >
                        {processing ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                <span>Processing Payment...</span>
                            </>
                        ) : (
                            <>
                                <FiLock className="w-5 h-5" />
                                Pay Securely
                            </>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/checkout")}
                        className="btn btn-ghost btn-block mt-2"
                        disabled={processing}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

const StripePayment = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const orderId = searchParams.get("orderId");
    const clientSecret = searchParams.get("clientSecret");

    useEffect(() => {
        if (!orderId || !clientSecret) {
            toast.error("Invalid payment session");
            navigate("/cart");
        } else {
            setLoading(false);
        }
    }, [orderId, clientSecret, navigate]);

    if (loading) {
        return <LoadingSpinner message="Loading payment form..." />;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
            <div className="container mx-auto px-4 max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Complete Payment
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Securely processed by Stripe
                    </p>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm orderId={orderId} clientSecret={clientSecret} />
                </Elements>
            </div>
        </div>
    );
};

export default StripePayment;
