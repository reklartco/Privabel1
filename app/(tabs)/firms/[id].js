// app/firms/[id].js
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
 // veya '../context/AuthContext' konumuna göre

export default function FirmDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { isLoggedIn } = useAuth();


  const firm = {
    name: id === '1' ? 'Doğal Gıda A.Ş.' : 'FitSnack Ltd.',
    description: id === '1'
      ? 'Organik gıdada Türkiye lideri.'
      : 'Glutensiz bar ve granola üretiminde uzman.',
    email: 'info@firma.com',
    phone: '+90 532 000 00 00',
  };

  <TouchableOpacity
  style={styles.button}
  onPress={() => router.push('/request-offer')}
>
  <Text style={styles.buttonText}>💬 Teklif Al</Text>
</TouchableOpacity>


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{firm.name}</Text>
      <Text style={styles.desc}>{firm.description}</Text>

      <Text style={styles.section}>İletişim Bilgileri</Text>
      {isLoggedIn ? (
        <>
          <Text>E-Posta: {firm.email}</Text>
          <Text>Telefon: {firm.phone}</Text>
        </>
      ) : (
        <>
          <Text style={{ fontStyle: 'italic', color: '#999' }}>
            Görüntülemek için giriş yapmalısınız
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/login')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f1f8f5',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2e7d32',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
