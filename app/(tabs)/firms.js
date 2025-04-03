// app/(tabs)/firms.js
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const dummyFirms = [
  {
    id: '1',
    name: 'Doğal Gıda A.Ş.',
    description: 'Organik ve katkısız gıda ürünleri üreticisi.',
    logo: 'https://via.placeholder.com/80x80.png?text=Logo',
  },
  {
    id: '2',
    name: 'FitSnack Ltd.',
    description: 'Sağlıklı atıştırmalıklar markası.',
    logo: 'https://via.placeholder.com/80x80.png?text=Logo',
  },
];

export default function FirmsScreen() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/firms/${item.id}`)}
    >
      <Image source={{ uri: item.logo }} style={styles.logo} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.link}>Detayları Gör</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyFirms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8f5',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#c8e6c9',
    borderWidth: 1,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  desc: {
    fontSize: 14,
    color: '#444',
    marginVertical: 4,
  },
  link: {
    color: '#388e3c',
    fontWeight: '600',
  },
});
