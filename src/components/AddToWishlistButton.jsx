import React, { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../hooks/useWishlist";

const AddToWishlistButton = ({ productId, className = "" }) => {
    const { addProduct, removeProduct, isInWishlist } = useWishlist();
    const [loading, setLoading] = useState(false);
    const inWishlist = isInWishlist(productId);

    const handleToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setLoading(true);
        try {
            if (inWishlist) {
                await removeProduct(productId);
            } else {
                await addProduct(productId);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`btn btn-circle btn-sm ${inWishlist ? 'btn-error' : 'btn-ghost'} ${className}`}
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
            ) : inWishlist ? (
                <FaHeart className="w-4 h-4" />
            ) : (
                <FiHeart className="w-4 h-4" />
            )}
        </button>
    );
};

export default AddToWishlistButton;
