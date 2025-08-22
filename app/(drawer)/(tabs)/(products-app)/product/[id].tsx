import { useEffect, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import ThemedTextInput from '@/presentation/theme/components/ThemedTextInput';
import { useProduct } from '@/presentation/products/hooks/useProduct';
import ProductImages from '@/presentation/products/components/ProductImages';
import ThemeButtonGroup from '@/presentation/theme/components/ThemedButtonGroup';
import ThemedButton from '@/presentation/theme/components/ThemedButton';
import { Formik } from 'formik';
import { Size } from '@/core/products/interfaces/product.interface';
import MenuIconButton from '@/presentation/theme/components/MenuIconButton';
import { useCameraStore } from '@/presentation/store/useCameraStore';
import { RefreshControl } from 'react-native-gesture-handler';
import React from 'react';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { CheckIcon, Icon, InfoIcon } from '@/components/ui/icon';
import { useCartStore } from '@/presentation/store/cartStore';
import { ShoppingCart } from 'lucide-react-native';
import { CartProduct } from '@/interfaces/product.interface';
import { Alert, AlertIcon, AlertText } from '@/components/ui/alert';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';

const ProductScreen = () => {
  const toast = useToast()
  const [toastId, setToastId] = React.useState(0)

  const showNewToast = () => {
    const newId = Math.random()
    setToastId(newId)
    toast.show({
      id: newId.toString(),
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id
        return (
          <Toast nativeID={uniqueToastId} action="success" variant="solid">
           
            <ToastDescription>
              Producto agregado al carrito!
            </ToastDescription>
          </Toast>
        )
      },
    })
  }
  /** <ToastTitle>Enhorabuena!</ToastTitle> */
  const { selectedImages, clearImages } = useCameraStore();

  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { productQuery, productMutation } = useProduct(`${id}`);

  const addProductToCart = useCartStore( state => state.addProductTocart );

  const addToCart = () => {
   
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: 1,
      size: product.sizes[0],
      image: product.images[0]
    }

    addProductToCart(cartProduct);
     if (!toast.isActive(toastId.toString())) {
      showNewToast()
    }
  };

  useEffect(() => {
    return () => {
      clearImages();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          onPress={() => router.push('/camera')}
          icon="camera-outline"
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} />
      </View>
    );
  }

  if (!productQuery.data) {
    return <Redirect href="/(drawer)/(tabs)/(products-app)/(home)" />;
  }

  const product = productQuery.data!;
  

  return (
    
    <Formik initialValues={product} onSubmit={ (productLike) => 
    productMutation.mutate({
      ...productLike,
      images: [... productLike.images, ...selectedImages]
    })}>
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
          refreshControl = {
            <RefreshControl
              refreshing={ productQuery.isFetching }
              onRefresh= { async() => {
                await productQuery.refetch();
              } }
            ></RefreshControl>
          }
          >
            <ProductImages images={[...product.images, ...selectedImages]} />

            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
              <ThemedTextInput
                placeholder="Título"
                style={{ marginVertical: 5 }}
                value={values.title}
                onChangeText={handleChange('title')}
              />

              <ThemedTextInput
                placeholder="Slug"
                style={{ marginVertical: 5 }}
                value={values.slug}
                onChangeText={handleChange('slug')}
              />

              <ThemedTextInput
                placeholder="Descripción"
                multiline
                numberOfLines={5}
                style={{ marginVertical: 5 }}
                value={values.description}
                onChangeText={handleChange('description')}
              />
            </ThemedView>

            <ThemedView
              style={{
                marginHorizontal: 10,
                marginVertical: 5,
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <ThemedTextInput
                placeholder="Precio"
                style={{ flex: 1 }}
                value={values.price.toString()}
                onChangeText={handleChange('price')}
              />
              <ThemedTextInput
                placeholder="Inventario"
                style={{ flex: 1 }}
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
              />
            </ThemedView>

            <ThemedView
              style={{
                marginHorizontal: 10,
              }}
            >
              <ThemeButtonGroup
                options={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']}
                selectedOptions={values.sizes}
                onSelect={(selectedSize) => {
                  const newSizesValue = values.sizes.includes(
                    selectedSize as Size
                  )
                    ? values.sizes.filter((s) => s !== selectedSize)
                    : [...values.sizes, selectedSize];

                  setFieldValue('sizes', newSizesValue);
                }}
              />

              <ThemeButtonGroup
                options={['kid', 'men', 'women', 'unisex']}
                selectedOptions={[values.gender]}
                onSelect={(selectedOption) =>
                  setFieldValue('gender', selectedOption)
                }
              />
            </ThemedView>

            {/* Botón para guardar */}

            <View
              style={{
                marginHorizontal: 10,
                marginBottom: 50,
                marginTop: 20,
              }}
            >
            
               <Button 
              size="md" 
                  variant="solid" 
                  action="primary"
                  onPress={() => handleSubmit()}>
                  <ButtonIcon as={CheckIcon} className="mr-2" />
            <ButtonText>Guardar</ButtonText>
          </Button>
        <Button 
                  style={{
                marginTop: 5,
              }}
                  size="md" 
                  variant="outline" 
                  action="primary"
                  className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
         onPress={ () => addToCart() }>
          <Icon as={ShoppingCart} />
          <ButtonText>Add to cart</ButtonText>
        </Button>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};
export default ProductScreen;

