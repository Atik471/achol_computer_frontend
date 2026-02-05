import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Create order from cart
 * @param {Object} orderData - Order data including shipping address, payment method
 * @returns {Promise} Created order data
 */
export const createOrder = async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
};

/**
 * Get user's orders
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise} Orders list with pagination
 */
export const getOrders = async (page = 1, limit = 10) => {
    const response = await api.get("/orders", {
        params: { page, limit }
    });
    return response.data;
};

/**
 * Get single order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise} Order data
 */
export const getOrderById = async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
};

/**
 * Cancel order
 * @param {string} orderId - Order ID
 * @returns {Promise} Updated order data
 */
export const cancelOrder = async (orderId) => {
    const response = await api.patch(`/orders/${orderId}/cancel`);
    return response.data;
};

/**
 * Update order status (Admin only)
 * @param {string} orderId - Order ID
 * @param {Object} statusData - Status update data
 * @returns {Promise} Updated order data
 */
export const updateOrderStatus = async (orderId, statusData) => {
    const response = await api.patch(`/orders/admin/${orderId}/status`, statusData);
    return response.data;
};

/**
 * Get all orders (Admin only)
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @param {Object} filters - Filter options (status, paymentStatus)
 * @returns {Promise} All orders with pagination
 */
export const getAllOrders = async (page = 1, limit = 20, filters = {}) => {
    const response = await api.get("/orders/admin/all", {
        params: { page, limit, ...filters }
    });
    return response.data;
};

export default {
    createOrder,
    getOrders,
    getOrderById,
    cancelOrder,
    updateOrderStatus,
    getAllOrders
};
