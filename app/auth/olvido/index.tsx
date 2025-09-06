import ThemedButton from '@/presentation/theme/components/ThemedButton';
import ThemedLink from '@/presentation/theme/components/ThemedLink';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import React, { useState } from 'react';
import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';

import {
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
 Dimensions, ImageBackground, Image, 
 Platform,
 Pressable} from 'react-native';
import "@/global.css";
import { useAuthStore } from '@/presentation/store/useAuthStore';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Icon, CloseIcon, HelpCircleIcon } from '@/components/ui/icon';
import { router } from 'expo-router';
import { authLogin, authOlvido } from '@/core/auth/actions/auth-actions';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const RegisterScreen = () => {

  const { height } = useWindowDimensions();
  const [isPosting, setIsPosting] = useState(false);
  const toast = useToast();
  const [toastId, setToastId] = React.useState(0);

  const showNewToast = () => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: newId.toString(),
      placement: "top",
      duration: 10000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast
            nativeID={uniqueToastId}
            action="error"
            variant="solid"
            style={{
              borderRadius: 16,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 5,
              minWidth: 300,
              alignItems: 'center',
              marginHorizontal: 8,
              paddingVertical: 16,
              paddingHorizontal: 12
            }}
          >
            <HStack space="md">
              <Image
                source={require("../../../assets/images/logo.png")}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  marginBottom: 0,
                  backgroundColor: "#f9f9f9"
                }}
                resizeMode="contain"
              />
              <VStack space="xs">
                <ToastTitle
                  style={{
                    fontWeight: "bold",
                    color: "#e53935",
                    fontSize: 16
                  }}
                >
                  ¡Oh! Algo no ha salido bien
                </ToastTitle>
                <ToastDescription
                  size="md"
                  style={{
                    color: "#111",
                    fontSize: 14
                  }}
                >
                  Servicios offline, intenta luego nuevamente
                </ToastDescription>
              </VStack>
              <Pressable onPress={() => toast.close(id)}
                style={{ padding: 4, marginLeft: 8 }}>
                <Icon as={CloseIcon} color="#888" size="sm" />
              </Pressable>
            </HStack>
          </Toast>
        );
      },
    });
  };

const [form, setForm] = useState({
    email: '',
    password: '',
    password2: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    password2: ''
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '', password2: '' };


    if (!form.email) {
      newErrors.email = 'El correo es obligatorio';
      valid = false;
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = 'Correo electrónico no válido';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'La contraseña es obligatoria';
      valid = false;
    } else if (!PASSWORD_REGEX.test(form.password)) {
      newErrors.password = 'El password debe tener una mayúscula, una minúscula y un numero';
      valid = false;
    }

     if (!form.password2) {
      newErrors.password2 = 'La contraseña es obligatoria';
      valid = false;
    } else if (!PASSWORD_REGEX.test(form.password2)) {
      newErrors.password2 = 'El password debe tener una mayúscula, una minúscula y un numero';
      valid = false;
    }

    if (form.password && form.password2 && form.password !== form.password2) {
    newErrors.password2 = 'Las contraseñas no coinciden';
    valid = false;
  }

    setErrors(newErrors);
    return valid;
  };
   const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));
  
    const onOlvido = async () => {

    if (!validateForm()) {
      return;
    }
  
      setIsPosting(true);
      const { email, password, password2 } = form;
      const wasSuccessful = await authOlvido(email, password)
      await delay(3000);
      setIsPosting(false);
  
      if (wasSuccessful) {
        router.replace('/auth/valida');
        return;
      }
      if (!toast.isActive(toastId.toString())) {
        showNewToast();
      }
    };

  return (
  
                 <ScrollView  
                   style={{
          paddingHorizontal: 40,
        }}>
        <View
          style={{
            paddingTop: height * 0.05,
          }}
        >
          <ThemedText type="title">Reset Password</ThemedText>
          <ThemedText style={{ color: 'grey' }}>
            Por favor, ingresa tu email y tu nuevo password y recibirás un código de validación
          </ThemedText>
        </View>

        {/* Email , password2 y  Password */}
       <View style={{ marginTop: 20 }}>
        <ThemedTextInput
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail-outline"
          value={form.email}
          onChangeText={(value) => {
            setForm({ ...form, email: value });
            setErrors({ ...errors, email: '' });
          }}
          style={[
            errors.email && { borderColor: '#e53935', borderWidth: 2 }
          ]}
        />
        {errors.email ? (
          <ThemedText style={{ color: '#e53935', marginBottom: 6, marginLeft: 4, fontSize: 13 }}>
            {errors.email}
          </ThemedText>
        ) : null}

<ThemedTextInput
          placeholder="Nueva Password"
          secureTextEntry
          autoCapitalize="none"
          icon="lock-closed-outline"
          value={form.password}
          onChangeText={(value) => {
            setForm({ ...form, password: value });
            setErrors({ ...errors, password: '' });
          }}
          style={[
            errors.password && { borderColor: '#e53935', borderWidth: 2 }
          ]}
        />
        {errors.password ? (
          <ThemedText style={{ color: '#e53935', marginBottom: 6, marginLeft: 4, fontSize: 13 }}>
            {errors.password}
          </ThemedText>
        ) : null}


         <ThemedTextInput
          placeholder="Repetir Password"
          secureTextEntry
          autoCapitalize="none"
          icon="lock-closed-outline"
          value={form.password2}
          onChangeText={(value) => {
            setForm({ ...form, password2: value });
            setErrors({ ...errors, password2: '' });
          }}
          style={[
            errors.password2 && { borderColor: '#e53935', borderWidth: 2 }
          ]}
        />
        {errors.password2 ? (
          <ThemedText style={{ color: '#e53935', marginBottom: 6, marginLeft: 4, fontSize: 13 }}>
            {errors.password2}
          </ThemedText>
        ) : null}
      </View>

        {/* Spacer */}
        <View style={{ marginTop: 10 }} />

        {/* Botón */}
        <Button
        size="md"
        variant="solid"
        action="primary"
        disabled={isPosting}
        onPress={onOlvido}
      >
        <ButtonText>
          {isPosting ? "enviando..." : "Enviar"}
        </ButtonText>
        {isPosting && <ButtonSpinner />}
      </Button>

        {/* Spacer */}
        <View style={{ marginTop: 50 }} />

        {/* Enlace a registro */}
         <View style={{ alignItems: "center", marginTop: 0 }}>
  <View style={{ flexDirection: "row", marginVertical: 8 }}>
    <ThemedText style={{ color: "#6B7280",  fontSize: 14}}>¿Ya tienes cuenta? </ThemedText>
    <ThemedLink 
      href="/auth/login" 
      style={{ color: "#2563EB", fontWeight: "300" , paddingTop: 5, fontSize: 14}}
    >
      Ingresar
    </ThemedLink>
  </View>
       </View>
      </ScrollView>
  );
};
export default RegisterScreen;
