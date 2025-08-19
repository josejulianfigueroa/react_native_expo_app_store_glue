import { useCartStore } from '@/presentation/store/cartStore';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { Formatter } from '@/helpers/formatter';

const Checkout = () => {
  const { getSummaryInformation } = useCartStore();
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  return (
    <View style={styles.card}>
      <Text style={styles.header}>
        {itemsInCart === 1 
          ? "Tu orden contiene 1 artículo" 
          : `Tu orden contiene ${itemsInCart} artículos`}
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>{Formatter.currency(subTotal)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Impuestos (15%)</Text>
        <Text style={styles.value}>{Formatter.currency(tax)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{Formatter.currency(total)}</Text>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2a9d8f', // ejemplo de color primario
  },
});
