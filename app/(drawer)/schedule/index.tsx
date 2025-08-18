import { usePushNotifications } from '@/presentation/notifications/usePushNotifications';
import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { View, Text, FlatList } from 'react-native';
import React from 'react';

const PushApp = () => {
  const { expoPushToken, notifications } = usePushNotifications();

  return (
    <View style={{ marginHorizontal: 10, marginTop: 5 }}>
      {/* <ThemedText>Token: {expoPushToken}</ThemedText> */}


      <FlatList
        data={notifications}
        keyExtractor={(item) => item.request.identifier}
        renderItem={({ item }) => (
          <View>
            <ThemedText style={{ fontWeight: 'bold', color: 'black'}}>
              {item.request.content.title}
            </ThemedText>
            <ThemedText type="subtitle" >{item.request.content.body}</ThemedText>
            <ThemedText type="subtitle">
              {JSON.stringify(item.request.content.data, null, 2)}
            </ThemedText>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: 'black', opacity: 0.3 }} />
        )}
      />
    </View>
  );
};
export default PushApp;
