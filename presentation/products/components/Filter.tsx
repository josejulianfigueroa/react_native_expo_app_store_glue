import {StyleSheet, Text, FlatList, TouchableOpacity, Platform} from 'react-native';
import {router, useLocalSearchParams} from "expo-router";
import {useState} from "react";
import cn from "clsx";
import { Category } from '@/interfaces/category.interface';
import React from 'react';

const Filter = ({ categories }: { categories: Category[] }) => {
    const searchParams = useLocalSearchParams();
    const [active, setActive] = useState(searchParams.category || '');

    const handlePress = (id: string) => {
        setActive(id);

        if(id === 'all') router.setParams({ category: undefined });
        else router.setParams({ category: id });
    };

    const filterData: (Category | { id: string; name: string })[] = categories
        ? [{ id: 'all', name: 'All' }, ...categories]
        : [{ id: 'all', name: 'All' }]

return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => {
        const isActive = active === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.chip,
              isActive ? styles.activeChip : styles.inactiveChip,
              Platform.OS === 'android' ? styles.androidShadow : styles.iosShadow
            ]}
            onPress={() => handlePress(item.id.toString())}
          >
            <Text style={[styles.text, isActive ? styles.activeText : styles.inactiveText]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Filter;

const styles = StyleSheet.create({
  listContainer: {
    gap: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  chip: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 36,
     backgroundColor: "#F59E0B",
  },
  activeChip: {
    backgroundColor: "#F59E0B", // amber-500
  },
  inactiveChip: {
    backgroundColor: "#F3F4F6", // gris claro
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeText: {
    color: "#FFFFFF",
  },
  inactiveText: {
    color: "#4B5563", // gris-600
  },
  androidShadow: {
    elevation: 3,
    shadowColor: "#999",
  },
  iosShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
