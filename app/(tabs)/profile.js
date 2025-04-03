import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { isLoggedIn, role, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const handleRoleChange = () => {
    router.push('/select-role');
  };

  const handleAddProduct = () => {
    router.push('/management/add-products');
  };

  const handleEditProfile = () => {
    router.push('/management/edit/1'); // ID sabit örnek olarak verildi
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>

      <Text style={styles.label}>Giriş Durumu: {isLoggedIn ? 'Giriş Yapıldı' : 'Giriş Yapılmadı'}</Text>
      <Text style={styles.label}>Kullanıcı Rolü: {role ?? 'Belirtilmemiş'}</Text>

      <TouchableOpacity style={styles.button} onPress={handleRoleChange}>
        <Text style={styles.buttonText}>Rolü Değiştir</Text>
      </TouchableOpacity>

      {isLoggedIn && role === 'producer' && (
        <>
          <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
            <Text style={styles.buttonText}>➕ Ürün Ekle</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>✏️ Profili Düzenle</Text>
          </TouchableOpacity>
        </>
      )}

      {isLoggedIn && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#c62828' }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  button: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
