import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View } from 'react-native';
import React from 'react';

import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';

import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

const CustomDrawer = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <View
        style={{
          marginHorizontal: 16,
          padding: 24,
          marginBottom: 12,
          height: 110,
          borderRadius: 20,
          backgroundColor: '#9f86c0', // Índigo suave
          shadowColor: '#4b0082', // Índigo oscuro para sombra
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 10,
          justifyContent: 'center',
        }}
      >
        <VStack space="xl">
          <HStack space="md">
            <Avatar size="xl">
              <AvatarFallbackText>SS</AvatarFallbackText>
              <AvatarImage
           
              source={{
              uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            }}
              />
            </Avatar>
            <VStack>
              <Heading size="md" style={{ color: 'indigo', fontWeight: '700' }}>
                Ronald Richards
              </Heading>
              <Text size="md" style={{ color: 'indigo' }}>
                Nursing Assistant
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </View>

      {/* Draweritems */}
      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList
          {...props}
          // Además puedes personalizar los textos del drawer con tintas blancas o lila claros
      
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;


/**
 *      source={require('../../assets/images/no-product-image.png')}
 */