import { router } from 'expo-router';
import { TouchableOpacity, Image, Animated } from 'react-native';

import { Product } from '@/core/products/interfaces/product.interface';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import { useAnimation } from '@/presentation/theme/hooks/useAnimation';
import React from 'react';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Formatter } from '@/helpers/formatter';
import { ShoppingCart } from 'lucide-react-native';
 import { Icon } from '@/components/ui/icon';
import { useCartStore } from '@/presentation/store/cartStore';
import { CartProduct } from '@/interfaces/product.interface';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
 
  const toast = useToast()
  const [toastId, setToastId] = React.useState(0)

  const showNewToast = () => {
    const newId = Math.random()
    setToastId(newId)
    toast.show({
      id: newId.toString(),
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id
        return (
          <Toast nativeID={uniqueToastId} action="success" variant="solid">
            <ToastTitle>Enhorabuena!</ToastTitle>
            <ToastDescription>
              Producto agregado al carrito!
            </ToastDescription>
          </Toast>
        )
      },
    })
  }
  
  
   const { animatedOpacity, fadeIn } = useAnimation();
   
   const addProductToCart = useCartStore( state => state.addProductTocart );
 
   const addToCart = () => {
    
     const cartProduct: CartProduct = {
       id: product.id,
       slug: product.slug,
       title: product.title,
       price: product.price,
       quantity: 1,
       size: product.sizes[0],
       image: product.images[0]
     }
 
     addProductToCart(cartProduct);
   if (!toast.isActive(toastId.toString())) {
      showNewToast()
    }
   };

  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 3,
        borderRadius: 5,
        overflow: 'hidden',
        padding: 5,
      }}
    >
      <TouchableOpacity onPress={() => router.push(`/product/${product.id}`)}>
        {product.images.length === 0 ? (
          <Image
            source={require('../../../assets/images/no-product-image.png')}
            style={{ width: '100%', height: 200 }}
          />
        ) : (
          <Animated.Image
            source={{ uri: product.images[0] }}
            style={{ flex: 1, height: 200, width: '100%', opacity: animatedOpacity }}
             onLoadEnd={() => {
                fadeIn({});
        }}
          />
        )}

        <ThemedText
          numberOfLines={3}
          style={{ textAlign: 'center', height: 50 }}
          darkColor={'black'}
        >
          {product.title}
        </ThemedText>
          <Heading size="md" className="mb-4"   style={{ textAlign: 'right' }}>
            {Formatter.currency(product.price)}
          </Heading>
          <Box className="flex-col sm:flex-row">
        <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
        onPress={ () => addToCart() }>
           <Icon className="text-typography-100" as={ShoppingCart} />
          <ButtonText size="sm">Add to cart</ButtonText>
        </Button>
    
      </Box>
      </TouchableOpacity>
    </ThemedView>
  );
};
