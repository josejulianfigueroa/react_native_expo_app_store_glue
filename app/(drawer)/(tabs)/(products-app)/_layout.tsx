import React from 'react';
import { View, Text, ActivityIndicator, Pressable, StyleSheet, Dimensions } from 'react-native';
import { Redirect, Link, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuthStore } from '@/presentation/store/useAuthStore';
import { useCartStore } from '@/presentation/store/cartStore';
import { Icon } from '@/components/ui/icon';
import { ShoppingCart } from 'lucide-react-native';

const CheckAuthenticationLayout = () => {

  const { status, checkStatus } = useAuthStore();
  const cartItemsNum = useCartStore(state => state.cart.length);
  const { height } = Dimensions.get('window');
  React.useEffect(() => {
    checkStatus();
  }, []);

  if (status === 'checking') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (status === 'unauthenticated') {
    return <Redirect href="/splash" />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1F0954', 'indigo']}
        style={[StyleSheet.absoluteFill, styles.gradient, { height: height / 4.5 } ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'white',
          headerRight: () =>
            cartItemsNum > 0 && (
              <Link href={'/(drawer)/(tabs)/(products-app)/cart'} asChild>
                <Pressable style={styles.cartButton}>
                  <Icon as={ShoppingCart} color="white" />
                  <Text style={styles.cartText}>{cartItemsNum}</Text>
                </Pressable>
              </Link>
            ),
          contentStyle: { backgroundColor: 'transparent' }, // transparente para ver el gradiente
        }}
      >
        <Stack.Screen
          name="(home)/index"
          options={{
            title: process.env.EXPO_PUBLIC_NAME_APP,
          }}
        />
        <Stack.Screen
          name="product/[id]"
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name="cart/index"
          options={{
            title: 'Carrito',
            presentation: 'modal',
          }}
        />
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
   gradient: {
    width: '100%',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  cartButton: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  cartText: {
    color: 'white',
  },
});

export default CheckAuthenticationLayout;
