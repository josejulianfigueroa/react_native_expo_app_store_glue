import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';

const TabsLayout = () => {

     const navigation = useNavigation();

  const onToggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer);
  };


  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'indigo',
        // headerShown: false,
        // tabBarStyle: {
        //   backgroundColor: 'black',
        // },
        // tabBarActiveBackgroundColor: 'red',
      }}
    > 
      <Tabs.Screen
        name="(products-app)"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="grid-outline" color={color} />
          ),
        }}
         listeners={{
            tabPress: (e) => {
              onToggleDrawer();
    },
  }}
      />

      <Tabs.Screen
        name="inicio/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home-outline" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites/index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="star-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
