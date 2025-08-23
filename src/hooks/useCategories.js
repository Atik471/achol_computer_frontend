import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../services/categoryServices";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000, // cache for 5 min
  });
};
