import React from "react";
import { Link } from "react-router";
import { FiHeart } from "react-icons/fi";
import { useWishlist } from "../hooks/useWishlist";

const WishlistIcon = () => {
    const { count } = useWishlist();

    return (
        <Link to="/wishlist" className="relative p-2 hover:bg-base-200 rounded-lg transition-colors">
            <FiHeart className="w-6 h-6" />
            {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-content text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                </span>
            )}
        </Link>
    );
};

export default WishlistIcon;
