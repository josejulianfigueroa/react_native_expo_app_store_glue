import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/presentation/store/cartStore";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import {FlatList } from "react-native";
import { Text } from '@/components/ui/text';
import { Formatter } from "@/helpers/formatter";
import { Animated } from 'react-native';
import { useAnimation } from "@/presentation/theme/hooks/useAnimation";


export default function CartScreen() {

    const { animatedOpacity, fadeIn } = useAnimation();

  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

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

  if (items.length === 0) {
    return <Redirect href={'/'} />;
  }

  return (
    <FlatList
      data={items}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto p-2"
      renderItem={({ item }) => (

        <HStack className="bg-white p-3">
                         <Animated.Image
                          source={{ uri: item.product.images[0] }}
                          style={{ height: 60, width: 60, paddingRight: 20, opacity: animatedOpacity }}
                           onLoadEnd={() => {
                              fadeIn({});
                      }}
                        />
                              
          <VStack space="sm">
            <Text bold>{item.product.title}</Text>
            <Text>{Formatter.currency(item.product.price)}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
