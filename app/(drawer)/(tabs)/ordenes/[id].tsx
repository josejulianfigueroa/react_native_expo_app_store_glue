
import {
  View,
  ActivityIndicator,
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
      />
    </View>
  );
}
/** <Stack.Screen options={{ title: `Order #${id}` }} /> */