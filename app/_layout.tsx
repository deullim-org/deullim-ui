import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useAuthStore } from '@/src/features/auth/store/auth-store';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isAuthenticated = useAuthStore((state) => state.status === 'authenticated');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="search" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen
              name="memo/create"
              options={{ presentation: 'modal', title: 'New Memo' }}
            />
            <Stack.Screen name="memo/[id]" options={{ presentation: 'modal', title: 'Memo' }} />
          </Stack.Protected>

          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
