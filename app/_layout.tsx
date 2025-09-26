import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { desktopBaseURL } from '@/constants/url';
import fetch from 'node-fetch'
import { Alert } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('access_token'); 

    if(!token) return;

    const requestCheckToken = await fetch(`${desktopBaseURL}/api/auth/user`, {
      headers: { 'Content-Type': 'application/json', 'Authorization': token }
    })

    if(requestCheckToken.ok) return router.replace('/(tabs)/product');

    await AsyncStorage.removeItem('access_token');
    Alert.alert('Atenção', 'Sua sessão expirou!');
  }

  useEffect(() => {
    checkLogin();
  }, [])
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName={'login'}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
