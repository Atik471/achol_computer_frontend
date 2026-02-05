import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router";

const AddToCartButton = ({ productId, quantity = 1, className = "", showIcon = true, text = "Add to Cart" }) => {
    const { addItem } = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setLoading(true);
        try {
            const success = await addItem(productId, quantity);
            if (success) {
                // Optional: navigate to cart
                // navigate('/cart');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={loading}
            className={`btn btn-primary ${className}`}
        >
            {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
            ) : (
                <>
                    {showIcon && <FiShoppingCart className="w-5 h-5" />}
                    {text}
                </>
            )}
        </button>
    );
};

export default AddToCartButton;
