import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { Link, useSegments } from 'expo-router';
import { OrdersAll } from '@/core/orders/interfaces/orders-all.interface';
import { Order } from '@/core/orders/interfaces/orders.interface';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: OrdersAll | Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/ordenes/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>Order #${order.id?.toString().length > 25 
      ? order.id.toString().slice(0, 25) + '…' 
      : order.id
    } </Text>
          <Text style={styles.time}>{dayjs(order.createdAt).fromNow()}</Text>
        </View>

        <Text style={styles.status}>Pagada</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
    width: 300
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});

export default OrderListItem;
