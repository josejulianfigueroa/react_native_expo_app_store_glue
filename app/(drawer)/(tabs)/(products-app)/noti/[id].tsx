import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import React from 'react';

const ChatIdScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ marginHorizontal: 10 }}>
      <ThemedText
        style={{
          fontSize: 25,
          marginBottom: 10,
        }}
      >
        Chat ID Screen
      </ThemedText>

      <ThemedText
        style={{
          fontSize: 25,
          marginBottom: 10,
        }}
      >
        Chat ID: {id}
      </ThemedText>
    </View>
  );
};
export default ChatIdScreen;
