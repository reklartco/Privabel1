import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

const dummyMessages = [
  {
    id: '1',
    firmName: 'Doğal Gıda A.Ş.',
    lastMessage: 'Merhaba, ürünle ilgili bilgi alabilir miyim?',
    firmLogo: 'https://via.placeholder.com/80x80.png?text=Logo',
  },
  {
    id: '2',
    firmName: 'FitSnack Ltd.',
    lastMessage: 'Fiyat bilgisi rica ediyorum.',
    firmLogo: 'https://via.placeholder.com/80x80.png?text=Logo',
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  // RootLayout yüklendikten sonra yönlendirme yapılmalı
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoggedIn) {
        router.replace('/login');
      }
    }, 100); // küçük bir gecikmeyle güvenli yönlendirme

    return () => clearTimeout(timeout);
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: '#666' }}>Yönlendiriliyor...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/messages/${item.id}`)}
    >
      <Image source={{ uri: item.firmLogo }} style={styles.logo} />
      <View style={{ flex: 1 }}>
        <Text style={styles.firmName}>{item.firmName}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f1f8f5',
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    borderColor: '#c8e6c9',
    borderWidth: 1,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  firmName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
});
