// app/offers/send.js
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export default function SendOfferScreen() {
  const router = useRouter();
  const { role } = useAuth();
  const { addNotification } = useNotifications(); // ✅ Doğru yerde çağrılıyor

  const [companyName, setCompanyName] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');

  const handleSend = () => {
    if (!companyName || !productName || !price) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    // Teklif log
    console.log('Teklif gönderildi:', {
      companyName,
      productName,
      price,
      note,
      date: new Date().toISOString(),
    });

    // 🔔 Bildirim Ekle
    addNotification({
      id: Date.now().toString(),
      message: `"${productName}" için ${companyName} firmasına teklif gönderildi.`,
      read: false,
      date: new Date().toISOString(),
    });

    Alert.alert('Başarılı', 'Teklif gönderildi.');
    router.replace('/(tabs)');
  };

  if (role !== 'customer') {
    return (
      <View style={styles.center}>
        <Text style={styles.warning}>Bu ekran sadece alıcılara özeldir.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teklif Gönder</Text>

      <TextInput
        style={styles.input}
        placeholder="Firma Adı"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Ürün Adı"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Teklif Fiyatı (₺)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Not (isteğe bağlı)"
        value={note}
        onChangeText={setNote}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Gönder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e7d32',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#c8e6c9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  warning: { fontSize: 16, color: '#888' },
});
