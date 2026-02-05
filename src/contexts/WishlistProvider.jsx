import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider";
import * as wishlistService from "../services/wishlistService";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    // Fetch wishlist when user logs in
    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            // Clear wishlist when user logs out
            setWishlist(null);
            setCount(0);
        }
    }, [user]);

    // Fetch wishlist from API
    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const response = await wishlistService.getWishlist();
            if (response.success) {
                setWishlist(response.data.wishlist);
                setCount(response.data.count || 0);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            // Don't show error toast for initial fetch
        } finally {
            setLoading(false);
        }
    };

    // Add product to wishlist
    const addProduct = async (productId) => {
        if (!user) {
            toast.error("Please login to add items to wishlist");
            return false;
        }

        try {
            const response = await wishlistService.addToWishlist(productId);
            if (response.success) {
                setWishlist(response.data.wishlist);
                setCount(response.data.count || 0);
                toast.success(response.message || "Added to wishlist");
                return true;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to add to wishlist";
            toast.error(message);
            return false;
        }
    };

    // Remove product from wishlist
    const removeProduct = async (productId) => {
        try {
            const response = await wishlistService.removeFromWishlist(productId);
            if (response.success) {
                setWishlist(response.data.wishlist);
                setCount(response.data.count || 0);
                toast.success("Removed from wishlist");
                return true;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to remove from wishlist";
            toast.error(message);
            return false;
        }
    };

    // Clear entire wishlist
    const clearWishlistItems = async () => {
        try {
            const response = await wishlistService.clearWishlist();
            if (response.success) {
                setWishlist(response.data.wishlist);
                setCount(0);
                toast.success("Wishlist cleared");
                return true;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to clear wishlist";
            toast.error(message);
            return false;
        }
    };

    // Move item to cart
    const moveProductToCart = async (productId, quantity = 1) => {
        try {
            const response = await wishlistService.moveToCart(productId, quantity);
            if (response.success) {
                toast.success(response.message || "Moved to cart");
                // Refresh wishlist
                await fetchWishlist();
                return true;
            }
        } catch (error) {
            const message = error.response?.data?.message || "Failed to move to cart";
            toast.error(message);
            return false;
        }
    };

    // Check if product is in wishlist
    const isInWishlist = (productId) => {
        if (!wishlist || !wishlist.products) return false;
        return wishlist.products.some(product =>
            product._id === productId || product === productId
        );
    };

    const value = {
        wishlist,
        loading,
        count,
        addProduct,
        removeProduct,
        clearWishlistItems,
        moveProductToCart,
        isInWishlist,
        refreshWishlist: fetchWishlist
    };

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
