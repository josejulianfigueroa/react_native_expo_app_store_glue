import { getProducts } from '@/core/products/actions/get-products.action';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useProducts = () => {
  const productsQuery = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: ({ pageParam }) => getProducts(10, pageParam * 10),
    staleTime: 1000 * 60 * 60, // 1 hora

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return {
    productsQuery,

    // Methods
    loadNextPage: productsQuery.fetchNextPage
  };
};
