import { getPaginatedOrders } from '@/core/orders/actions/get-paginated-orders';
import { useQuery } from '@tanstack/react-query';

export const useOrders = () => {
  const ordersQuery = useQuery({
    queryKey: ['orders', 'all'],
    queryFn: () => getPaginatedOrders(),
    staleTime: 1000 * 60 * 60, // 1 hora

  });

  return {
    ordersQuery,
  };
};
