// app/(tabs)/products.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const dummyProducts = [
  {
    id: '1',
    name: 'Fındık Ezmesi',
    price: '150 TL / 500g',
    description: 'Katkısız fındık ezmesi.',
    image: 'https://via.placeholder.com/300x200.png?text=Fındık',
  },
  {
    id: '2',
    name: 'Granola Bar',
    price: '85 TL / 3 adet',
    description: 'Glutensiz yulaf barları.',
    image: 'https://via.placeholder.com/300x200.png?text=Granola',
  },
];

export default function ProductList() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/products/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8f5', padding: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderColor: '#c8e6c9',
    borderWidth: 1,
  },
  image: { width: '100%', height: 160, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32' },
  desc: { fontSize: 14, color: '#555', marginVertical: 4 },
  price: { fontSize: 16, color: '#1b5e20', fontWeight: '600' },
});
