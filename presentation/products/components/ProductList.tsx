import { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View, Text } from 'react-native';

import { Product } from '@/core/products/interfaces/product.interface';
import { ProductCard } from './ProductCard';
import { useQueryClient } from '@tanstack/react-query';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import React from 'react';
import SearchBar from './SearchBar';
import Filter from './Filter';
import { Category } from '@/interfaces/category.interface';
import { useLocalSearchParams } from 'expo-router';

interface Props {
  products: Product[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => {
const { category, query } = useLocalSearchParams<{query: string; category: string}>()

  

  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const primaryColor = useThemeColor({}, 'primary');

  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 200));

    queryClient.invalidateQueries({
      queryKey: ['products', 'infinite'],
    });

    setIsRefreshing(false);
  };

  const categories: Category[] = [{
    id: 1,
    name: "Burgers"
  }]
  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
       onEndReached={async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000)); 
          loadNextPage();
        }}
      onEndReachedThreshold={0.8}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
      ListFooterComponent={() => (
          <View style={{ height: 150, justifyContent: 'center' }}>
            <ActivityIndicator size={40} color={primaryColor} />
          </View>
        )}
             ListHeaderComponent={() => (
              <View className="my-5 gap-5">
                        <SearchBar />
                            <Filter categories={categories!} />
                            </View>
                )}

    />
  );
};
export default ProductList;
