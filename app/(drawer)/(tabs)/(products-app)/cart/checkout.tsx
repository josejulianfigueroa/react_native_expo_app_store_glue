
import { useCartStore } from '@/presentation/store/cartStore';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { Formatter } from '@/helpers/formatter';


const Checkout = () => {

 const { getSummaryInformation } = useCartStore();

const { itemsInCart, subTotal, tax, total } = getSummaryInformation();
   


  return (<>
     <View style={{ height: 1, backgroundColor: 'black', opacity: 0.3 }} />
  <View style={ styles.container }>
          <Text style={ styles.title }>La orden contiene 
            {itemsInCart === 1 ? " 1 artículo" : ` ${itemsInCart} artículos`}
          </Text>

          <Text style={ styles.title }>Subtotal: {Formatter.currency(subTotal)}</Text>

          <Text style={ styles.title }>Impuestos (15%): {Formatter.currency(tax)}</Text>

           <View style={{ height: 1, backgroundColor: 'black', opacity: 0.3 }} />

          <Text style={ styles.title }>Total: {Formatter.currency(total)}</Text>
        </View>
        </>)

};
export default Checkout;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
  },
  title: {
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'right',
  },

});