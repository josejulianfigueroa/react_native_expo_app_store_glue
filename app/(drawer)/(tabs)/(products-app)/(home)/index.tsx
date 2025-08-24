import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { FAB } from '@/presentation/theme/components/FAB';
import ProductList from '@/presentation/products/components/ProductList';
import { useProducts } from '@/presentation/products/hooks/useProducts';
import React from 'react';
import Filter from '@/presentation/products/components/Filter';
import { Category } from '@/interfaces/category.interface';
import SearchBar from '@/presentation/products/components/SearchBar';

const HomeScreen = () => {
  
  const { productsQuery, loadNextPage } = useProducts();

  if (productsQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }
 const categories: Category[] = [{
    id: '1',
    name: "Burgers"
  },{
    id: '2',
    name: "Pizzas"
  },{
    id: '3',
    name: "Hamburguers"
  }]
  return (
    <View style={{ paddingHorizontal: 10, ...StyleSheet.absoluteFillObject }}>
       <View className="my-1 gap-1">
                        <SearchBar />
                            <Filter categories={categories!} />
                            </View>
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
