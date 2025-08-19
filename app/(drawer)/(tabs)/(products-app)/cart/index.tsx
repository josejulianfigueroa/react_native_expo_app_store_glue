import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useCartStore } from "@/presentation/store/cartStore";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import {FlatList, Platform, View, StyleSheet } from "react-native";
import { Text } from '@/components/ui/text';
import { Formatter } from "@/helpers/formatter";
import { Animated } from 'react-native';
import { useAnimation } from "@/presentation/theme/hooks/useAnimation";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { CartProduct } from "@/interfaces/product.interface";
import { CloseIcon, Icon } from "@/components/ui/icon";
import Checkout from "./checkout";


export default function CartScreen() {

    const { animatedOpacity, fadeIn } = useAnimation();

  const productsInCart = useCartStore( state => state.cart );

  const updateProductQuantity = useCartStore( state => state.updateProductQuantity );
  const removeProduct = useCartStore( state => state.removeProduct );

    const onValueChanged = ( product: CartProduct, quantity: number, value: number ) => {
    
    if ( quantity + value < 1 ) return;

    updateProductQuantity( product, quantity + value );
  }


//  const { initPaymentSheet, presentPaymentSheet } = useStripe();
/*
  const paymentIntentMutation = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: async (data) => {
      const { customer, ephemeralKey, paymentIntent } = data;

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        // allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        },
        // returnURL: 'notjust-ecom:/',
      });
      if (error) {
        Alert.alert('Error', error.message);
        console.log(error);
      }

      openPaymentSheet();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const router = useRouter();

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price, // MANAGE FORM SERVER SIDE
        }))
      ),
    onSuccess: (data) => {
      paymentIntentMutation.mutate({ orderId: data.id });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      // TODO: handle error. The order is submitted, but payment failed.
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      resetCart();
      // router.push(`/orders/${orderId}`);
      router.replace('/');
    }
  };
*/
  const onCheckout = async () => {
   // createOrderMutation.mutateAsync();

    // openPaymentSheet();
  };

  if (productsInCart.length === 0) {
    return <Redirect href={'/'} />;
  }

  return (
    <><FlatList
      data={productsInCart}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
      renderItem={({ item }) => (

       <HStack className="bg-white rounded-2xl shadow-md p-4 items-center gap-4">
  <Animated.Image
    source={{ uri: item.image }}
    className="w-16 h-16 rounded-xl"
    style={{ opacity: animatedOpacity }}
    onLoadEnd={() => fadeIn({})}
  />

  <VStack className="flex-1">
    <Text className="font-semibold text-base" numberOfLines={1}>
      {item.title}
    </Text>

    {/* Quantity selector */}
    <HStack className="items-center gap-4 mt-2">
      <FontAwesome
        onPress={() => onValueChanged(item, item.quantity, -1)}
        name="minus-circle"
        size={20}
        color="gray"
      />
      <Text className="font-medium text-lg">{item.quantity}</Text>
      <FontAwesome
        onPress={() => onValueChanged(item, item.quantity, +1)}
        name="plus-circle"
        size={20}
        color="gray"
      />
    </HStack>
  </VStack>

  {/* Price + delete */}
  <VStack className="items-end gap-2">
    <Text className="font-medium text-sm text-gray-600">
      {Formatter.currency(item.price)} x {item.quantity}
    </Text>
    <Text className="font-bold text-base text-gray-800">
      {Formatter.currency(item.quantity * item.price)}
    </Text>
    <Button
      onPress={() => removeProduct(item)}
      size="sm"
      variant="link"
      action="negative"
    >
      <Icon as={CloseIcon} />
    </Button>
  </VStack>
</HStack>

      )}
      ListFooterComponent={() => (
            <>
            <Checkout/>
            <Button onPress={onCheckout}>
            <ButtonText>Checkout</ButtonText>
          </Button></>
      )} /><StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /></>
  );
}

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
    fontSize: 15,
  },
});