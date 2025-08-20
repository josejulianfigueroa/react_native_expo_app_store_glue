import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import React from 'react';
import OrderListItem from '@/presentation/orders/components/OrderListItem';
import { useOrders } from '@/presentation/orders/hooks/useOrders';
import { Stack } from 'expo-router';

export default function OrdersScreen() {

  const { ordersQuery } = useOrders();

  if (ordersQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }
  if (ordersQuery.error) {
    return <Text>Failed to fetch</Text>;
  }

  return (<>
          <Stack.Screen options={{ title: 'Ordenes' }} />
    <FlatList
      data={ordersQuery.data?.orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    /></>
  );
}

