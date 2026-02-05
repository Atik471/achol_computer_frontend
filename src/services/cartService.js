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
 * Get user's cart
 * @returns {Promise} Cart data with items
 */
export const getCart = async () => {
    const response = await api.get("/cart");
    return response.data;
};

/**
 * Add item to cart
 * @param {string} productId - Product ID
 * @param {number} quantity - Quantity to add
 * @returns {Promise} Updated cart data
 */
export const addToCart = async (productId, quantity = 1) => {
    const response = await api.post("/cart", {
        productId,
        quantity
    });
    return response.data;
};

/**
 * Update cart item quantity
 * @param {string} itemId - Cart item ID
 * @param {number} quantity - New quantity
 * @returns {Promise} Updated cart data
 */
export const updateCartItem = async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, {
        quantity
    });
    return response.data;
};

/**
 * Remove item from cart
 * @param {string} itemId - Cart item ID
 * @returns {Promise} Updated cart data
 */
export const removeFromCart = async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
};

/**
 * Clear entire cart
 * @returns {Promise} Empty cart data
 */
export const clearCart = async () => {
    const response = await api.delete("/cart");
    return response.data;
};

export default {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
