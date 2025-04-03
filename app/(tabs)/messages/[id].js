import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [messages, setMessages] = useState([
    { id: '1', text: 'Merhaba, ürün hakkında bilgi rica ederim.', sender: 'user' },
    { id: '2', text: 'Merhaba, elbette yardımcı olayım!', sender: 'firma' },
  ]);

  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    setMessages([...messages, { id: Date.now().toString(), text: inputText, sender: 'user' }]);
    setInputText('');
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 16 }}>Lütfen giriş yapın</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Üst Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2e7d32" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mesajlar</Text>
        <View style={{ width: 24 }} /> {/* Simetri için boşluk */}
      </View>

      {/* Mesajlar */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <FlatList
          data={[...messages].reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[
              styles.messageBubble,
              item.sender === 'user' ? styles.userBubble : styles.firmBubble
            ]}>
              <Text style={{ color: item.sender === 'user' ? '#fff' : '#000' }}>
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          inverted
        />

        {/* Mesaj Gönderme */}
        <View style={styles.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            style={styles.input}
            placeholder="Mesaj yaz..."
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={{ color: '#fff' }}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8f5',
  },
  header: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 6,
    maxWidth: '75%',
    marginHorizontal: 12,
  },
  userBubble: {
    backgroundColor: '#2e7d32',
    alignSelf: 'flex-end',
  },
  firmBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#c8e6c9',
    borderWidth: 1,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
