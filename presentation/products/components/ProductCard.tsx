import { router } from 'expo-router';
import { TouchableOpacity, Image, Animated } from 'react-native';

import { Product } from '@/core/products/interfaces/product.interface';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import { useAnimation } from '@/presentation/theme/hooks/useAnimation';
import React from 'react';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {

   const { animatedOpacity, fadeIn } = useAnimation();
   
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
          numberOfLines={2}
          style={{ textAlign: 'center' }}
          darkColor={'black'}
        >
          {product.title}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};
