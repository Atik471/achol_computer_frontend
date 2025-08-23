import { useProducts } from "../hooks/useProducts";
import { ErrorState } from "../components/ErrorState";
import LoadingSpinner from "../components/LoadingSpinner";
import Breadcrumbs from "../components/Breadcrumbs";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router";

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    // convert search params to object
    const params = Object.fromEntries([...searchParams]);

    const { data, isLoading, error } = useProducts(params);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorState />;

    const products = data.data;
    const totalCount = data.totalCount;
    // const minPrice = data.minPrice;
    const maxPrice = data.maxPrice;

    console.log(data);

    return (
        <div className="p-4 lg:p-6 ">
            <div className="flex items-center justify-between">
                <Breadcrumbs />

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
                    {/* <select className="select select-bordered max-w-[16rem]">
                        <option disabled selected>Filter by brand</option>
                        <option>Logitech</option>
                        <option>A4Tech</option>
                        <option>HP</option>
                        <option>Micropack</option>
                    </select> */}

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
                    maxPrice={maxPrice}
                />

                {/* Products */}
                <main className="flex-1">
                    <ProductList products={products} />
                    {
                        products?.length > 0 && <Pagination />
                    }
                </main>
            </div>

        </div>
    );
};

export default ProductsPage;
