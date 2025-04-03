// app/_layout.js
import { Slot } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { NotificationProvider } from '../context/NotificationContext';

export const unstable_settings = {
  showDevToolsInNav: false,
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Slot />
      </NotificationProvider>
    </AuthProvider>
  );
}
