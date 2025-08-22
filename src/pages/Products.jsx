import Product from "../components/Product";
import { useProducts } from "../hooks/useProducts";

const Products = () => {
    const { data: products, isLoading, error } = useProducts();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div className="text-error">Failed to load products</div>;

    // search filter
    // const filteredProducts = products?.filter((p) =>
    //     p.name.toLowerCase().includes(search?.toLowerCase())
    // );

    console.log(products)


    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Products Page
            </h1>
            {products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div>No products found</div>
            )}
        </div>
    );
};

export default Products;