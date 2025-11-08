import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAdminProducts } from '../services/adminProductServices';

export const useAdminProducts = (filters) => {
  const queryClient = useQueryClient();

  const queryKey = ['admin-products', filters];

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () => getAdminProducts(filters),
    keepPreviousData: true,
  });

  // Prefetching for better UX
  const prefetchPage = (page) => {
    if (data && page > 0 && page <= data.pagination.totalPages) {
      queryClient.prefetchQuery({
        queryKey: ['admin-products', { ...filters, page }],
        queryFn: () => getAdminProducts({ ...filters, page }),
      });
    }
  };

  return {
    products: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    isError,
    error,
    prefetchPage,
  };
};