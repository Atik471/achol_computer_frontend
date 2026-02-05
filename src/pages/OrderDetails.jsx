import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as orderService from "../services/orderService";
import LoadingSpinner from "../components/LoadingSpinner";
import { FiPackage, FiTruck, FiMapPin, FiCreditCard } from "react-icons/fi";
import toast from "react-hot-toast";

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const response = await orderService.getOrderById(id);
            if (response.success) {
                setOrder(response.data.order);
            }
        } catch (error) {
            console.error("Error fetching order:", error);
            toast.error("Failed to load order details");
            navigate("/orders");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async () => {
        if (!window.confirm("Are you sure you want to cancel this order?")) {
            return;
        }

        try {
            setCancelling(true);
            const response = await orderService.cancelOrder(id);
            if (response.success) {
                toast.success("Order cancelled successfully");
                fetchOrderDetails();
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
            toast.error(error.response?.data?.message || "Failed to cancel order");
        } finally {
            setCancelling(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: "text-warning",
            processing: "text-info",
            confirmed: "text-info",
            shipped: "text-primary",
            delivered: "text-success",
            cancelled: "text-error"
        };
        return colors[status] || "text-base-content";
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!order) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold">Order not found</h2>
                <Link to="/orders" className="btn btn-primary mt-4">Back to Orders</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Header */}
            <div className="mb-6">
                <Link to="/orders" className="btn btn-ghost btn-sm mb-4">← Back to Orders</Link>
                <div className="flex flex-wrap justify-between items-start gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Order #{order.orderNumber}</h1>
                        <p className="text-base-content/60 mt-1">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-bold">৳{order.total.toFixed(2)}</p>
                        <div className="flex gap-2 mt-2">
                            <span className={`badge badge-lg ${getStatusColor(order.status)}`}>
                                {order.status.toUpperCase()}
                            </span>
                            <span className={`badge badge-lg ${order.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                                {order.paymentStatus.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title">
                                <FiPackage className="w-5 h-5" />
                                Order Items ({order.items.length})
                            </h2>
                            <div className="divider my-2"></div>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item._id} className="flex gap-4">
                                        <div className="w-20 h-20 bg-base-200 rounded-lg flex-shrink-0">
                                            {item.productSnapshot?.image && (
                                                <img
                                                    src={item.productSnapshot.image}
                                                    alt={item.productSnapshot.name}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.productSnapshot?.name || "Product"}</h3>
                                            <p className="text-sm text-base-content/60">Quantity: {item.quantity}</p>
                                            <p className="text-sm">৳{item.price.toFixed(2)} each</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">৳{item.subtotal.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    {order.timeline && order.timeline.length > 0 && (
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title">
                                    <FiTruck className="w-5 h-5" />
                                    Order Timeline
                                </h2>
                                <div className="divider my-2"></div>
                                <ul className="timeline timeline-vertical">
                                    {order.timeline.map((event, index) => (
                                        <li key={index}>
                                            {index > 0 && <hr />}
                                            <div className="timeline-start">
                                                {new Date(event.timestamp).toLocaleDateString()}
                                            </div>
                                            <div className="timeline-middle">
                                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                                            </div>
                                            <div className="timeline-end timeline-box">
                                                <p className="font-semibold capitalize">{event.status}</p>
                                                <p className="text-sm text-base-content/60">{event.message}</p>
                                            </div>
                                            {index < order.timeline.length - 1 && <hr />}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Details */}
                <div className="space-y-6">
                    {/* Shipping Address */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title">
                                <FiMapPin className="w-5 h-5" />
                                Shipping Address
                            </h2>
                            <div className="divider my-2"></div>
                            <div className="text-sm">
                                <p className="font-semibold">{order.shippingAddress.fullName}</p>
                                <p>{order.shippingAddress.phone}</p>
                                {order.shippingAddress.email && <p>{order.shippingAddress.email}</p>}
                                <p className="mt-2">
                                    {order.shippingAddress.address}<br />
                                    {order.shippingAddress.city}
                                    {order.shippingAddress.postalCode && `, ${order.shippingAddress.postalCode}`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title">
                                <FiCreditCard className="w-5 h-5" />
                                Payment Information
                            </h2>
                            <div className="divider my-2"></div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Payment Method:</span>
                                    <span className="font-semibold capitalize">{order.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Payment Status:</span>
                                    <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>
                                {order.transactionId && (
                                    <div className="flex justify-between">
                                        <span>Transaction ID:</span>
                                        <span className="font-mono text-xs">{order.transactionId}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <h2 className="card-title">Order Summary</h2>
                            <div className="divider my-2"></div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>৳{order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping:</span>
                                    <span>{order.shippingCost === 0 ? 'FREE' : `৳${order.shippingCost.toFixed(2)}`}</span>
                                </div>
                                {order.tax > 0 && (
                                    <div className="flex justify-between">
                                        <span>Tax:</span>
                                        <span>৳{order.tax.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="divider my-2"></div>
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total:</span>
                                    <span>৳{order.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            {(order.status === "pending" || order.status === "processing") && (
                                <div className="mt-4">
                                    <button
                                        onClick={handleCancelOrder}
                                        disabled={cancelling}
                                        className="btn btn-error btn-outline btn-block"
                                    >
                                        {cancelling ? (
                                            <span className="loading loading-spinner loading-sm"></span>
                                        ) : (
                                            "Cancel Order"
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
