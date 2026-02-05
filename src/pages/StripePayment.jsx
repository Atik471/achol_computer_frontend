import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { FiCheckCircle, FiCreditCard, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

const StripePayment = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);

    const orderId = searchParams.get("orderId");
    const clientSecret = searchParams.get("clientSecret");

    // Card form state
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: ""
    });

    useEffect(() => {
        if (!orderId || !clientSecret) {
            toast.error("Invalid payment session");
            navigate("/cart");
        }
    }, [orderId, clientSecret, navigate]);

    const formatCardNumber = (value) => {
        const cleaned = value.replace(/\s/g, '');
        const groups = cleaned.match(/.{1,4}/g);
        return groups ? groups.join(' ') : cleaned;
    };

    const formatExpiryDate = (value) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
        }
        return cleaned;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let formattedValue = value;

        if (name === "cardNumber") {
            const cleaned = value.replace(/\s/g, '');
            if (cleaned.length <= 16 && /^\d*$/.test(cleaned)) {
                formattedValue = formatCardNumber(cleaned);
            } else {
                return;
            }
        } else if (name === "expiryDate") {
            const cleaned = value.replace(/\D/g, '');
            if (cleaned.length <= 4) {
                formattedValue = formatExpiryDate(cleaned);
            } else {
                return;
            }
        } else if (name === "cvv") {
            if (value.length <= 3 && /^\d*$/.test(value)) {
                formattedValue = value;
            } else {
                return;
            }
        }

        setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        // Validate card details
        const cardNumberCleaned = cardDetails.cardNumber.replace(/\s/g, '');
        if (cardNumberCleaned.length !== 16) {
            toast.error("Please enter a valid 16-digit card number");
            return;
        }

        if (!cardDetails.cardName.trim()) {
            toast.error("Please enter the cardholder name");
            return;
        }

        if (cardDetails.expiryDate.length !== 5) {
            toast.error("Please enter expiry date (MM/YY)");
            return;
        }

        if (cardDetails.cvv.length !== 3) {
            toast.error("Please enter 3-digit CVV");
            return;
        }

        setProcessing(true);

        // Simulate payment processing
        // In production, this would integrate with Stripe.js
        setTimeout(() => {
            setProcessing(false);
            setPaymentComplete(true);
            toast.success("Payment successful!");

            // Redirect to order confirmation
            setTimeout(() => {
                navigate(`/order-confirmation?orderId=${orderId}`);
            }, 2000);
        }, 2000);
    };

    if (paymentComplete) {
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
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
            <div className="container mx-auto px-4 max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Complete Payment
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Enter your card details to complete the purchase
                    </p>
                </div>

                <form onSubmit={handlePayment}>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center gap-2 mb-4">
                                <FiCreditCard className="w-5 h-5 text-primary" />
                                <h2 className="card-title">Payment Details</h2>
                            </div>

                            <div className="space-y-4">
                                {/* Card Number */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Card Number</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        placeholder="1234 5678 9012 3456"
                                        required
                                    />
                                </div>

                                {/* Cardholder Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Cardholder Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={cardDetails.cardName}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                {/* Expiry and CVV */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Expiry Date</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={cardDetails.expiryDate}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                            placeholder="MM/YY"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">CVV</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={cardDetails.cvv}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full"
                                            placeholder="123"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Security Notice */}
                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                                    <FiLock className="w-4 h-4" />
                                    <span>Your payment information is encrypted and secure</span>
                                </div>
                            </div>

                            {/* Test Card Notice */}
                            <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                                    <strong>Test Mode:</strong> Use card number 4242 4242 4242 4242 with any future expiry date and any 3-digit CVV
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn btn-primary btn-block btn-lg mt-6"
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
            </div>
        </div>
    );
};

export default StripePayment;
