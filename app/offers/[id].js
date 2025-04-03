import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function OfferDetail() {
  const { id, status } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teklif Detayı</Text>
      <Text style={styles.detail}>Teklif ID: {id}</Text>
      <Text style={styles.status}>
        Durum: {status === 'accepted' ? '✅ Kabul Edildi' : '❌ Reddedildi'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  detail: { fontSize: 18 },
  status: { fontSize: 18, marginTop: 12, color: '#2e7d32' },
});
