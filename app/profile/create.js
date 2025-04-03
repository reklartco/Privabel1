// app/profile/create.js
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function CreateProfileScreen() {
  const router = useRouter();
  const { role, updateProfile } = useAuth();

  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSave = () => {
    if (!companyName || !phone || !fullName) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    updateProfile({ companyName, phone, fullName });
    Alert.alert('Başarılı', 'Profil oluşturuldu.');
    router.replace('/(tabs)'); // anasayfaya yönlendirme
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Oluştur</Text>

      <TextInput
        style={styles.input}
        placeholder="Şirket Adı"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Yetkili Adı Soyadı"
        value={fullName}
        onChangeText={setFullName}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2e7d32' },
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
});
