import { useProducts } from "../hooks/useProducts";
import { ErrorState } from "../components/ErrorState";
import LoadingSpinner from "../components/LoadingSpinner";
import Breadcrumbs from "../components/Breadcrumbs";
import FilterSidebar from "../components/FilterSidebar";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router";
import SearchInput from "../components/SearchInput";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const ProductsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // convert search params to object
    const params = Object.fromEntries([...searchParams]);
    const currentSort = searchParams.get("sort") || "";

    const { data, isLoading, error } = useProducts(params);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorState />;

    const products = data.data;
    const totalCount = data.totalCount;
    // const minPrice = data.minPrice;
    const maxPrice = data.maxPrice;

    const handleSortChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            searchParams.delete("sort");
        } else {
            // Map human-readable to backend sort query
            let sortParam = "";
            switch (value) {
                case "Price: Low to High":
                    sortParam = "price";
                    break;
                case "Price: High to Low":
                    sortParam = "-price";
                    break;
                case "Newest":
                    sortParam = "-createdAt";
                    break;
                default:
                    sortParam = "";
            }
            searchParams.set("sort", sortParam);
        }

        setSearchParams(searchParams);
    };

    

    return (
        <div className="p-4 lg:p-6 ">
            {/* <Helmet>
                <title>Achol Computer | Products</title>
                <meta name="description" content="Trusted electronics store in Bangladesh." />
            </Helmet> */}
            <div className="flex items-center justify-between">
                <Breadcrumbs />

                {/* Top controls */}
                <div className="flex  items-center justify-end mb-4 gap-2">
                    <SearchInput />

                    {/* Sort */}
                    <select
                        className="select select-bordered max-w-[16rem]"
                        value={
                            currentSort === "price" ? "Price: Low to High" :
                                currentSort === "-price" ? "Price: High to Low" :
                                    currentSort === "-createdAt" ? "Newest" : ""
                        }
                        onChange={handleSortChange}
                    >
                        <option disabled value="">Sort by</option>
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
                        products?.length > 0 && <Pagination totalCount={totalCount}
                            limit={12}
                            maxButtons={7} />
                    }
                </main>
            </div>

        </div>
    );
};

export default ProductsPage;
