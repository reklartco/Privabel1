import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

const dummyOffers = [
  {
    id: '1',
    from: 'Alıcı Firma A',
    product: 'Kuru Kayısı',
    price: '18.500 ₺',
    note: 'Toplu alım yapacağız, fiyat düşebilir misiniz?',
    date: '2025-04-03 10:30',
  },
  {
    id: '2',
    from: 'Alıcı Firma B',
    product: 'Fındık Ezmesi',
    price: '22.000 ₺',
    note: '',
    date: '2025-04-02 14:10',
  },
];

export default function ReceivedOffers() {
  const { role } = useAuth();
  const router = useRouter();

  if (role !== 'producer') {
    return (
      <View style={styles.center}>
        <Text style={styles.warning}>Bu ekran sadece üreticilere özeldir.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.product}</Text>
      <Text style={styles.from}>Gönderen: {item.from}</Text>
      <Text style={styles.price}>Teklif: {item.price}</Text>
      {item.note ? <Text style={styles.note}>Not: {item.note}</Text> : null}
      <Text style={styles.date}>Tarih: {item.date}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#43a047' }]}
          onPress={() => router.push(`/offers/${item.id}?status=accepted`)}
        >
          <Text style={styles.buttonText}>Kabul Et</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#e53935' }]}
          onPress={() => router.push(`/offers/${item.id}?status=rejected`)}
        >
          <Text style={styles.buttonText}>Reddet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gelen Teklifler</Text>
      <FlatList
        data={dummyOffers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#888' }}>Henüz teklif bulunmuyor.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f1f8e9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: '#dcedc8',
    borderWidth: 1,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  from: { fontSize: 14, color: '#555' },
  price: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  note: { fontSize: 14, fontStyle: 'italic', marginTop: 4 },
  date: { fontSize: 12, color: '#888', marginTop: 4 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  warning: { fontSize: 16, color: '#999' },
});
