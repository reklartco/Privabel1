import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function ProductListScreen() {
  const { role, isLoggedIn } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Kavrulmuş Fındık',
      description: 'Karadeniz bölgesinden en kaliteli fındık.',
      price: '190',
      image: 'https://via.placeholder.com/300x200.png?text=Fındık',
    },
    {
      id: '2',
      name: 'Kuru Kayısı',
      description: 'Malatya’dan doğal gün kurusu.',
      price: '120',
      image: 'https://via.placeholder.com/300x200.png?text=Kayısı',
    },
  ]);

  if (!isLoggedIn || role !== 'producer') {
    return (
      <View style={styles.center}>
        <Text style={styles.warning}>Bu ekran sadece üretici kullanıcılar içindir.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ürünlerim</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}₺</Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/yönetim/add-product')}
      >
        <Text style={styles.addButtonText}>+ Yeni Ürün Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#2e7d32' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  name: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#666', marginTop: 4 },
  addButton: {
    marginTop: 20,
    backgroundColor: '#2e7d32',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warning: {
    fontSize: 16,
    color: 'gray',
  },
});
