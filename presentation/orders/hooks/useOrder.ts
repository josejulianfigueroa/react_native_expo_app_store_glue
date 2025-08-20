import { getOrderById } from '@/core/orders/actions/get-order-by-id';
import { useQuery } from '@tanstack/react-query';

export const useOrder = ( orderId: string) => {
  
    const orderQuery = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId),
    staleTime: 1000 * 60 * 60, // 1 hora
  });

  return {
    orderQuery,
  };
};
