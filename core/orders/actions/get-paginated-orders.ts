import { productsApi } from "@/core/api/productsApi";
import { OrdersAll } from "../interfaces/orders-all.interface";

export const getPaginatedOrders = async() => {

 try {
    const { data } = await productsApi.get<OrdersAll[]>('/orders/get/all', {

    });

  return {
    ok: true,
    orders: data,
  }
  } catch (error) {
    throw new Error('Unable to load orders');
  }

}

