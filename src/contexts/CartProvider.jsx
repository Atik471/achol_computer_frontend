import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import * as cartService from "../services/cartService";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // Fetch cart when user logs in
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            // Clear cart when user logs out
            setCart(null);
            setItemCount(0);
            setCartTotal(0);
        }
    }, [user]);

    // Fetch cart from API
    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await cartService.getCart();
            if (response.success) {
                setCart(response.data.cart);
                setItemCount(response.data.itemCount || 0);
                setCartTotal(response.data.cartTotal || 0);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            // Don't show error toast for initial fetch
        } finally {
            setLoading(false);
        }
    };

    // Add item to cart
    const addItem = async (productId, quantity = 1) => {
        if (!user) {
            toast.error("Please login to add items to cart");
            return false;
        }

        try {
            const response = await cartService.addToCart(productId, quantity);
            if (response.success) {
                setCart(response.data.cart);
                setItemCount(response.data.itemCount || 0);
                setCartTotal(response.data.cartTotal || 0);
                toast.success(response.message || "Item added to cart");
                return true;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to add item to cart";
            toast.error(message);
            return false;
        }
    };

    // Update item quantity
    const updateItem = async (itemId, quantity) => {
        try {
            const response = await cartService.updateCartItem(itemId, quantity);
            if (response.success) {
                setCart(response.data.cart);
                setItemCount(response.data.itemCount || 0);
                setCartTotal(response.data.cartTotal || 0);
                toast.success("Cart updated");
                return true;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update cart";
            toast.error(message);
            return false;
        }
    };

    // Remove item from cart
    const removeItem = async (itemId) => {
        try {
            const response = await cartService.removeFromCart(itemId);
            if (response.success) {
                setCart(response.data.cart);
                setItemCount(response.data.itemCount || 0);
                setCartTotal(response.data.cartTotal || 0);
                toast.success("Item removed from cart");
                return true;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to remove item";
            toast.error(message);
            return false;
        }
    };

    // Clear entire cart
    const clearCartItems = async () => {
        try {
            const response = await cartService.clearCart();
            if (response.success) {
                setCart(response.data.cart);
                setItemCount(0);
                setCartTotal(0);
                toast.success("Cart cleared");
                return true;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to clear cart";
            toast.error(message);
            return false;
        }
    };

    const value = {
        cart,
        loading,
        itemCount,
        cartTotal,
        addItem,
        updateItem,
        removeItem,
        clearCartItems,
        refreshCart: fetchCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
