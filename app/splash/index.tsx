import React, { useEffect } from "react";
import { View, Text, Image, useColorScheme, ActivityIndicator } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/auth/login"); // 👈 asegúrate de que exista esta ruta
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
  
    <LinearGradient
      colors={['#1F0954', 'indigo']}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >

      <MotiView
        from={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1000 }}
        style={{ alignItems: "center" }}
      >
        <Image
          source={require("../../assets/images/logo.png")} // tu logo aquí
          style={{ width: 120, height: 120, marginBottom: 20 }}
        />
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "white",
            letterSpacing: 2,
          }}
        >
          FoodApp
        </Text>
        <Text style={{ color: "white", marginTop: 10 }}>
          ¡Comida rápida y deliciosa! 🍔
        </Text>
        <ActivityIndicator  color="#fff"  size="large" style={{ marginTop: 20 }} />
      </MotiView>
    </LinearGradient>
  );
}
