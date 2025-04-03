import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Simülasyon - Varsayılan bilgiler
  const [fullName, setFullName] = useState('Ahmet Soylu');
  const [companyName, setCompanyName] = useState('Soylu Gıda Sanayi');
  const [phoneNumber, setPhoneNumber] = useState('+90 532 123 45 67');

  const handleSave = () => {
    console.log('Yeni Profil Bilgileri:', { fullName, companyName, phoneNumber });
    Alert.alert('Başarılı', 'Profil bilgileri güncellendi.');
    router.back(); // Profili geri döndür
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profili Düzenle</Text>

      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Şirket Adı"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2e7d32',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
