import React from "react";
import { Link } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../hooks/useCart";

const CartIcon = () => {
    const { itemCount } = useCart();

    return (
        <Link to="/cart" className="relative p-2 hover:bg-base-200 rounded-lg transition-colors">
            <FiShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-content text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                </span>
            )}
        </Link>
    );
};

export default CartIcon;
