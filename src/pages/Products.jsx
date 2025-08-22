import { useProducts } from "../hooks/useProducts";
import { ErrorState } from "../components/ErrorState";
import LoadingSpinner from "../components/LoadingSpinner";
import Breadcrumbs from "../components/Breadcrumbs";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";

const ProductsPage = () => {
    const { data: products, isLoading, error } = useProducts();

    const breadcrumbPaths = [
        { label: "Home", href: "/" },
        { label: "All categories", href: "/categories" },
        { label: "KEYBOARD" }, // current category
    ];

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorState />;

    return (
        <div className="p-4 lg:p-6 ">
            <div className="flex items-center justify-between">
                <Breadcrumbs paths={breadcrumbPaths} />

                {/* Top controls */}
                <div className="flex  items-center justify-end mb-4 gap-2">
                    {/* Search */}
                    <div className=" w-[30rem]">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="input input-bordered w-full"
                            // value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                onSearch(e.target.value);
                            }}
                        />
                    </div>
                    {/* Brand filter */}
                    <select className="select select-bordered max-w-[16rem]">
                        <option disabled selected>Filter by brand</option>
                        <option>Logitech</option>
                        <option>A4Tech</option>
                        <option>HP</option>
                        <option>Micropack</option>
                    </select>

                    {/* Sort */}
                    <select className="select select-bordered max-w-[16rem]">
                        <option disabled selected>Sort by</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Sidebar */}
                <FilterSidebar
                    onCategoryChange={(cat) => console.log("Category:", cat)}
                    onPriceChange={(range) => console.log("Price range:", range)}
                    onSearch={(q) => console.log("Search:", q)}
                />

                {/* Products */}
                <main className="flex-1">
                    <ProductList products={products} />
                    <Pagination />
                </main>
            </div>

        </div>
    );
};

export default ProductsPage;
