// app/management/edit/index.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/AuthContext';

export default function EditProfileScreen() {
  const router = useRouter();
  const { updateProfile } = useAuth();

  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSave = () => {
    if (!companyName || !phone || !fullName) {
      Alert.alert('Eksik Bilgi', 'Tüm alanları doldurun');
      return;
    }

    updateProfile({ companyName, phone, fullName });
    Alert.alert('Başarılı', 'Profil bilgileriniz kaydedildi');
    router.replace('/(tabs)/profile'); // Profil ekranına yönlendir
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firma Bilgileri</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Şirket Adı"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
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
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 15 },
  button: { backgroundColor: 'green', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
});
