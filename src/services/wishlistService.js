import api from "./api.js";

/**
 * Get user's wishlist
 * @returns {Promise} Wishlist data with products
 */
export const getWishlist = async () => {
    const response = await api.get("/wishlist");
    return response.data;
};

/**
 * Add product to wishlist
 * @param {string} productId - Product ID
 * @returns {Promise} Updated wishlist data
 */
export const addToWishlist = async (productId) => {
    const response = await api.post("/wishlist", {
        productId
    });
    return response.data;
};

/**
 * Remove product from wishlist
 * @param {string} productId - Product ID
 * @returns {Promise} Updated wishlist data
 */
export const removeFromWishlist = async (productId) => {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data;
};

/**
 * Clear entire wishlist
 * @returns {Promise} Empty wishlist data
 */
export const clearWishlist = async () => {
    const response = await api.delete("/wishlist");
    return response.data;
};

/**
 * Move item from wishlist to cart
 * @param {string} productId - Product ID
 * @param {number} quantity - Quantity to add to cart
 * @returns {Promise} Response data
 */
export const moveToCart = async (productId, quantity = 1) => {
    const response = await api.post(`/wishlist/move-to-cart/${productId}`, {
        quantity
    });
    return response.data;
};

export default {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    moveToCart
};
