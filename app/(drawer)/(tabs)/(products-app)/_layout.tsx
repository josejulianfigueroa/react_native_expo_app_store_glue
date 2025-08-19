import { useEffect } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { Redirect, Link, Stack } from 'expo-router';

import { useAuthStore } from '@/presentation/store/useAuthStore';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import LogoutIconButton from '@/presentation/auth/components/LogoutIconButton';
import React from 'react';
import { Icon } from '@/components/ui/icon';
import { useCart } from '@/presentation/store/cartStore';
import { ShoppingCart } from 'lucide-react-native';

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const backgroundColor = useThemeColor({}, 'background');

  const cartItemsNum = useCart((state) => state.items.length);

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === 'checking') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (status === 'unauthenticated') {
    // Guardar la ruta del usuario
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack
      screenOptions={{
    //  headerShadowVisible: false,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        contentStyle: {
          backgroundColor: backgroundColor,
        },
              headerRight: () =>
                cartItemsNum > 0 && (
                  <Link href={'/(drawer)/(tabs)/(products-app)/cart'} asChild>
                    <Pressable className="flex-row gap-2">
                      <Icon as={ShoppingCart} />
                      <Text>{cartItemsNum}</Text>
                    </Pressable>
                  </Link>
                ),
            }}
    >
  <Stack.Screen
        name="(home)/index"
        options={{
          title: 'ProductsApp',
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
        }}
      />
    </Stack>
  );
};
export default CheckAuthenticationLayout;
