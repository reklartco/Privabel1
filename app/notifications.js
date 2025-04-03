import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNotifications } from '../context/NotificationContext';

export default function NotificationsScreen() {
  const { notifications, markAsRead } = useNotifications();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bildirimler</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => markAsRead(item.id)}
            style={[styles.card, !item.read && { backgroundColor: '#e8f5e9' }]}
          >
            <Text style={styles.message}>
              {item.message} {!item.read && '🔵'}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888' }}>Henüz bildiriminiz yok.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2e7d32',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f1f8f5',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
});
