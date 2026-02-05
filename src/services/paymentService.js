import api from "./api.js";

/**
 * Create Stripe payment intent
 * @param {string} orderId - Order ID
 * @returns {Promise} Client secret and payment intent ID
 */
export const createStripeIntent = async (orderId) => {
    const response = await api.post("/payments/stripe/create-intent", {
        orderId
    });
    return response.data;
};

/**
 * Create bKash payment
 * @param {string} orderId - Order ID
 * @returns {Promise} bKash payment URL and payment ID
 */
export const createBkashPayment = async (orderId) => {
    const response = await api.post("/payments/bkash/create", {
        orderId
    });
    return response.data;
};

/**
 * Execute bKash payment
 * @param {string} paymentID - bKash payment ID
 * @returns {Promise} Payment execution result
 */
export const executeBkashPayment = async (paymentID) => {
    const response = await api.post("/payments/bkash/execute", {
        paymentID
    });
    return response.data;
};

/**
 * Create Nagad payment
 * @param {string} orderId - Order ID
 * @returns {Promise} Nagad payment URL
 */
export const createNagadPayment = async (orderId) => {
    const response = await api.post("/payments/nagad/create", {
        orderId
    });
    return response.data;
};

/**
 * Verify payment status
 * @param {string} orderId - Order ID
 * @returns {Promise} Payment status and details
 */
export const verifyPayment = async (orderId) => {
    const response = await api.get(`/payments/${orderId}/verify`);
    return response.data;
};

export default {
    createStripeIntent,
    createBkashPayment,
    executeBkashPayment,
    createNagadPayment,
    verifyPayment
};
