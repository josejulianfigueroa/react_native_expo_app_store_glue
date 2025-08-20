
import { API_URL, productsApi } from '@/core/api/productsApi';
import { Order } from '../interfaces/orders.interface';


export const getOrderById = async( id: string ) => {

  try {
    
 const { data } = await productsApi.get<Order>(`/orders/${ id }`, {});

 return { ...data,
  orderItem: data.orderItem.map(( item ) => ({
       quantity: item.quantity,
       product: {
        ...item.product,
        images: item.product.images.map(
         (image) =>  ({
          url: `${API_URL}/files/product/${image.url}`,
          id: image.id
         })
       )},
     }))
    };

  } catch (error) {

     throw new Error('Unable to load order');

  }
}
