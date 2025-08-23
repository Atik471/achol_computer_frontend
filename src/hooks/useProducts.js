import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productServices";

export const useProducts = (params) => {
  return useQuery({
    queryKey: ["products", params], // cache based on params
    queryFn: () => getProducts(params),
  });
};