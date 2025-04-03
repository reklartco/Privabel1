import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';


export default function SelectRoleScreen() {
    const [selectedRole, setSelectedRole] = useState(null);
    const { login, setRole, role } = useAuth();
    const router = useRouter();
  
    const handleContinue = () => {
      if (!selectedRole) {
        Alert.alert('Rol Seçimi Gerekli', 'Lütfen bir rol seçin.');
        return;
      }
  
      setRole(selectedRole); // rolü context’e kaydet
      login();               // giriş durumunu ayarla
      router.replace('/');   // anasayfaya yönlendir
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Rolünüzü Seçin</Text>
  
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'producer' && styles.selectedButton,
          ]}
          onPress={() => setSelectedRole('producer')}
        >
          <Text style={styles.buttonText}>Üretici</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'customer' && styles.selectedButton,
          ]}
          onPress={() => setSelectedRole('customer')}
        >
          <Text style={styles.buttonText}>Alıcı</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Devam Et</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    roleButton: {
      backgroundColor: '#eee',
      padding: 16,
      marginVertical: 10,
      width: '100%',
      alignItems: 'center',
      borderRadius: 8,
    },
    selectedButton: {
      backgroundColor: '#4caf50',
    },
    buttonText: {
      fontSize: 18,
      color: '#333',
    },
    continueButton: {
      backgroundColor: '#2e7d32',
      padding: 16,
      borderRadius: 8,
      marginTop: 30,
      width: '100%',
      alignItems: 'center',
    },
    continueText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  

