import { productsApi } from '@/core/api/productsApi';
import { Product } from '../interfaces/product.interface';

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);



  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }

  return createProduct(product);
};

const prepareImages = async( images: string[] ): Promise<string[]> => {

  const fileImages = images.filter ( (image) => image.startsWith('file'));
  const currentImages = images.filter ( (image) => !image.startsWith('file'));

    console.log('fileImages', fileImages);
      console.log('currentImages', currentImages);
  if(fileImages.length > 0) {
    const uploadPromises = fileImages.map( uploadImage );
    const uploadedImages = await Promise.all( uploadPromises );
  console.log('uploadedImages', uploadedImages);
    currentImages.push( ... uploadedImages);
  }
  console.log('currentImagesDEF', currentImages);
  return currentImages.map( img => img.split('/').pop()!);
}

const uploadImage = async( image: string ): Promise<string> => {

  const formData = new FormData() as any;

  formData.append('file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split('/').pop()
  }
  )
  const { data } = await productsApi.post<{secureUrl: string}>(
    '/files/product',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return data.secureUrl;
}

const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], productCategory,  user, ...rest } = product;

  try {
      console.log('images', images);
    const checkedImages = await prepareImages(images);
    console.log('checkedImages', checkedImages);
     console.log('rest', JSON.stringify(rest));
    const { data } = await productsApi.patch<Product>(`/products/${id}`, {
      ...rest,
      idProductCategory: productCategory.id,
      images: checkedImages
    });

    return data;
  } catch (error) {
    throw new Error('Error al actualizar el producto');
  }
};

async function createProduct(product: Partial<Product>) {
  const { id, images = [], productCategory, user, ...rest } = product;

  try {
    const checkedImages = await prepareImages(images);

    const { data } = await productsApi.post<Product>(`/products`, {
      ...rest,
      idProductCategory: "277824d4-5039-4190-8a54-9f17d242245a",
      images: checkedImages
    });

    return data;
  } catch (error) {
    throw new Error('Error al actualizar el producto');
  }
}
