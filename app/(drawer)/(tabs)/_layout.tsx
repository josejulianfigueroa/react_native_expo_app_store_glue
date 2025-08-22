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
           /*     tabBarStyle: {
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    marginHorizontal: 20,
                    height: 60,
                    position: 'absolute',
                    bottom: 30,
                    backgroundColor: 'white',
                    shadowColor: '#1a1a1a',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5
                }*/
        // headerShown: false,
        // tabBarStyle: {
        //   backgroundColor: 'black',
        // },
        // tabBarActiveBackgroundColor: 'red',
      }}
    > 
      <Tabs.Screen
        name="inicio/index"
        options={{
          title: 'Usuario',
          headerShown: false,
          tabBarIcon: ({ color }) => (
             <Ionicons size={28} name="person-outline" color={color} />
          ),
        }}
    listeners={{
            tabPress: (e) => {
              e.preventDefault();
              onToggleDrawer();
    },
  }}
      />

      <Tabs.Screen
        name="(products-app)"
        options={{
          title: 'Inicio',
          headerShown: false,
          tabBarIcon: ({ color }) => (
             <Ionicons size={28} name="home-outline" color={color} />
          ),
        }}
             
      />

      <Tabs.Screen
        name="ordenes"
        options={{
          title: 'Ordenes',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="list-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
