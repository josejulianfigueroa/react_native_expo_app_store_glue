import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { FAB } from '@/presentation/theme/components/FAB';
import ProductList from '@/presentation/products/components/ProductList';
import { useProducts } from '@/presentation/products/hooks/useProducts';
import React from 'react';

const HomeScreen = () => {
  
  const { productsQuery, loadNextPage } = useProducts();

  if (productsQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 10, ...StyleSheet.absoluteFillObject }}>
      
      <ProductList
        products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
        loadNextPage={loadNextPage}
      />

      <FAB
        iconName="add-outline"
        onPress={() => router.push('/(drawer)/(tabs)/(products-app)/camera')}
      />
    </View>
  );
};
export default HomeScreen;
