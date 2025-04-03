import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth(); // 🔑 Giriş kontrolü

  const product = {
    name: id === '1' ? 'Fındık Ezmesi' : 'Granola Bar',
    description:
      id === '1'
        ? 'Doğal ve katkısız fındık ezmesi. %100 fındık içerir.'
        : 'Lif oranı yüksek glutensiz granola bar.',
    image:
      id === '1'
        ? 'https://via.placeholder.com/300x200.png?text=Fındık'
        : 'https://via.placeholder.com/300x200.png?text=Granola',
    price: '150 TL / 500g',
    phone: '0555 123 4567',
    email: 'info@ureticifirma.com',
  };

  const handleOffer = () => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      router.push('/request-offer');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Text style={styles.price}>Fiyat: {product.price}</Text>

      {isLoggedIn ? (
        <View style={styles.contactBox}>
          <Text style={styles.contact}>Telefon: {product.phone}</Text>
          <Text style={styles.contact}>E-posta: {product.email}</Text>
        </View>
      ) : (
        <Text style={styles.loginNote}>İletişim bilgileri için giriş yapmanız gerekmektedir.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleOffer}>
        <Text style={styles.buttonText}>💬 Teklif Al</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f1f8f5', flex: 1 },
  image: { width: '100%', height: 180, borderRadius: 12, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#2e7d32', marginBottom: 8 },
  desc: { fontSize: 16, color: '#444', marginBottom: 12 },
  price: { fontSize: 16, color: '#1b5e20', fontWeight: '600', marginBottom: 24 },
  contactBox: { marginBottom: 16 },
  contact: { fontSize: 14, color: '#333', marginBottom: 4 },
  loginNote: { fontSize: 14, color: '#d32f2f', marginBottom: 16 },
  button: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
