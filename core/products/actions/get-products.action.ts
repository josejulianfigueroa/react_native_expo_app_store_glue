import { API_URL, productsApi } from '@/core/api/productsApi';
import { type Product } from '../interfaces/product.interface';

export const getProducts = async (limit = 20, offset = 0) => {
  try {
    const { data } = await productsApi.get<Product[]>(`products/get/offset/${process.env.EXPO_PUBLIC_KEY_APP}/listar`, {
      params: {
        limit,
        offset,
      },
    });
if(data.length === 0) {
    return data;
}else {
    return data.map((product) => ({
      ...product,
      images: product.images.map(
        (image) => `${API_URL}/files/image/product/get/${image}`
      ),
    }));
}

  } catch (error) {
    throw new Error('Unable to load products');
  }
};
