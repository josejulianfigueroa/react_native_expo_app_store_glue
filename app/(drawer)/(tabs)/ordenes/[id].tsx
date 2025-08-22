
import {
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {
  Stack,
  useLocalSearchParams,
} from 'expo-router';

import React from 'react';
import { useOrder } from '@/presentation/orders/hooks/useOrder';
import { FlatList, Text, } from 'react-native';
import OrderItemListItem from '@/presentation/orders/components/OrderItemListItem';
import OrderListItem from '@/presentation/orders/components/OrderListItem';
import { Colors } from '@/constants/Colors';

export default function OrderDetailsScreen() {
  const { id: idString } = useLocalSearchParams();
   const id = typeof idString === 'string' ? idString : idString[0];

    const { orderQuery } = useOrder(id);

  if (orderQuery.isLoading) {
    return <ActivityIndicator />;
  }
  if (orderQuery.isError) {
    return <Text>Failed to fetch</Text>;
  }

    const updateStatus = async (status: string) => {
   /* await updateOrder({
      id: id,
      updatedFields: { status },
    });
    if (order) {
      await notifyUserAboutOrderUpdate({ ...order, status });
    }*/
  };

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ 
    title: `Order #${id?.toString().length > 10 
      ? id.toString().slice(0, 10) + '…' 
      : id
    }` 
  }} />
      <FlatList
        data={orderQuery.data?.orderItem}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={orderQuery.data! } />}
         ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: 'bold' }}>Status: {orderQuery.data!.status}</Text>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      orderQuery.data?.status === status
                        ? Colors.light.tint
                        : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      color:
                        orderQuery.data?.status === status ? 'white' : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
}

export type OrderStatus = 'pending' | 'Cooking' | 'Delivering' | 'Delivered';

export const OrderStatusList: OrderStatus[] = [
  'pending',
  'Cooking',
  'Delivering',
  'Delivered',
];