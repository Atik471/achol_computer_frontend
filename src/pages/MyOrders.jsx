import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import * as orderService from "../services/orderService";
import LoadingSpinner from "../components/LoadingSpinner";
import { EmptyState } from "../components/EmptyState";
import { FiPackage, FiClock, FiTruck, FiCheckCircle, FiX } from "react-icons/fi";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, [page]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await orderService.getOrders(page, 10);
            if (response.success) {
                setOrders(response.data.orders);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return <FiClock className="w-5 h-5 text-warning" />;
            case "processing":
            case "confirmed":
                return <FiPackage className="w-5 h-5 text-info" />;
            case "shipped":
                return <FiTruck className="w-5 h-5 text-primary" />;
            case "delivered":
                return <FiCheckCircle className="w-5 h-5 text-success" />;
            case "cancelled":
                return <FiX className="w-5 h-5 text-error" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: "badge-warning",
            processing: "badge-info",
            confirmed: "badge-info",
            shipped: "badge-primary",
            delivered: "badge-success",
            cancelled: "badge-error"
        };
        return badges[status] || "badge-ghost";
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <EmptyState
                    icon={<FiPackage className="w-16 h-16" />}
                    title="No orders yet"
                    message="Start shopping to see your orders here!"
                    actionLink="/products"
                    actionText="Browse Products"
                />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="card bg-base-100 shadow-md">
                        <div className="card-body">
                            <div className="flex flex-wrap justify-between items-start gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        {getStatusIcon(order.status)}
                                        <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                                    </div>
                                    <p className="text-sm text-base-content/60">
                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-2xl font-bold">৳{order.total.toFixed(2)}</p>
                                    <div className="flex gap-2 mt-2">
                                        <span className={`badge ${getStatusBadge(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                                            {order.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="divider my-2"></div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-semibold mb-1">Items ({order.items.length})</p>
                                    <div className="space-y-1">
                                        {order.items.slice(0, 3).map((item) => (
                                            <p key={item._id} className="text-sm text-base-content/70 line-clamp-1">
                                                {item.productSnapshot?.name || "Product"} x {item.quantity}
                                            </p>
                                        ))}
                                        {order.items.length > 3 && (
                                            <p className="text-sm text-base-content/60">
                                                +{order.items.length - 3} more items
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold mb-1">Shipping Address</p>
                                    <p className="text-sm text-base-content/70">
                                        {order.shippingAddress.fullName}<br />
                                        {order.shippingAddress.address}, {order.shippingAddress.city}
                                    </p>
                                </div>
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <Link
                                    to={`/orders/${order._id}`}
                                    className="btn btn-outline btn-sm"
                                >
                                    View Details
                                </Link>
                                {order.status === "pending" && (
                                    <button className="btn btn-error btn-outline btn-sm">
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
                <div className="flex justify-center mt-8">
                    <div className="join">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="join-item btn"
                        >
                            «
                        </button>
                        <button className="join-item btn">
                            Page {page} of {pagination.pages}
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                            disabled={page === pagination.pages}
                            className="join-item btn"
                        >
                            »
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
