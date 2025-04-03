export const unstable_settings = {
    showDevToolsInNav: false,
  };
  
  import React from 'react';
  import { Tabs } from 'expo-router';
  import { Bell, Menu, Home, Building2, Boxes, MessageCircle } from 'lucide-react-native';
  import { Ionicons } from '@expo/vector-icons';
  import { TouchableOpacity, View } from 'react-native';
  import { useRouter } from 'expo-router';
  
  export default function TabLayout() {
    const router = useRouter();
  
    return (
      <Tabs
        screenOptions={{
          headerShown: true,
          headerLeft: () => <Menu size={22} style={{ marginLeft: 16 }} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 16, marginRight: 16 }}>
              <TouchableOpacity onPress={() => router.push('/notifications')}>
                <Bell size={22} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                <Ionicons name="person-circle-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
          tabBarActiveTintColor: '#2e7d32',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Anasayfa',
            tabBarIcon: ({ color }) => <Home color={color} />,
          }}
        />
        <Tabs.Screen
          name="firms"
          options={{
            title: 'Firmalar',
            tabBarIcon: ({ color }) => <Building2 color={color} />,
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: 'Ürünler',
            tabBarIcon: ({ color }) => <Boxes color={color} />,
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Mesajlar',
            tabBarIcon: ({ color }) => <MessageCircle color={color} />,
          }}
        />
      </Tabs>
    );
  }
  