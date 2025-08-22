import { useProducts } from "../hooks/useProducts";

const Products = () => {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-error">Failed to load products</div>;

    // search filter
    // const filteredProducts = products?.filter((p) =>
    //     p.name.toLowerCase().includes(search?.toLowerCase())
    // );


    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Products Page
            </h1>
        </div>
    );
};

export default Products;