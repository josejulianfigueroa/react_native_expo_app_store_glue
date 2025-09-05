import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useColorScheme} from 'nativewind';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, View, Image } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function RootLayout() {


  return (
   <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      
            <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25}}>
                 <ImageBackground source={require('../../assets/images/login-graphic.png')} className="size-full rounded-b-lg" resizeMode="stretch" />
                  <Image source={require('../../assets/images/logo.png')} className="self-center size-48 absolute -bottom-16 z-10" />
                 </View> 
              <Slot />
                     </KeyboardAvoidingView>
  );

}