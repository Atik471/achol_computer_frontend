import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, getProducts } from "../services/productServices";

export const useProducts = (params) => {
  return useQuery({
    queryKey: ["products", params], // cache based on params
    queryFn: () => getProducts(params),
  });
};

export const useProduct = (slug) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug, // only run if slug exists
    staleTime: 5 * 60 * 1000, // cache for 5 mins
  });
};