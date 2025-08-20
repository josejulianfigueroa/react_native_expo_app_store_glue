import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import React from 'react';
import { OrderItem } from '@/core/orders/interfaces/orders.interface';
import { useAnimation } from '@/presentation/theme/hooks/useAnimation';
import { Colors } from '@/constants/Colors';

type OrderItemListItemProps = {
  item: OrderItem;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {

  const { animatedOpacity, fadeIn } = useAnimation();
  
  return (
    <View style={styles.container}>
         {item.product.images.length === 0 ? (
                <Image
                  source={require('../../../assets/images/no-product-image.png')}
                  style={{ width: '100%', height: 100 }}
                />
              ) : (
                <Animated.Image
                  source={{ uri: item.product.images[0].url }}
                  style={{ flex: 1, height: 100, width: '100%', opacity: animatedOpacity }}
                   onLoadEnd={() => {
                      fadeIn({});
              }}
                />
              )}

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.product.title}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${item.product.price.toFixed(2)}</Text>
          <Text>Size: {item.product.sizes[0]}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
    paddingRight: 20,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default OrderItemListItem;
