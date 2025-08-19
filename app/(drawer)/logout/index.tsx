import { useAuthStore } from '@/presentation/store/useAuthStore';
import { Redirect } from 'expo-router';
import React, { useEffect } from 'react';

const Logout = () => {

   const { logout } = useAuthStore();
   

    useEffect(() => {
console.log('hola');
    logout()
  }, []);

  return <Redirect href="/(drawer)/(tabs)/(products-app)/(home)" />;

};
export default Logout;
