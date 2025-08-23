import { useEffect } from "react";

const ProductDetails = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Product Details Page
            </h1>
        </div>
    );
};

export default ProductDetails;
