import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Ionicons } from '@expo/vector-icons';
import { Linking, TouchableOpacity } from 'react-native';
import { ExternalLink } from '@/components/external-link';
import { DesktopBaseURL } from '@/constants/url';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#0869B9' },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#adadadff',
        tabBarInactiveTintColor: '#fff',

        headerShown: true,
        headerStyle: { backgroundColor: '#0869B9' },
        headerTintColor: '#fff',

        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => Linking.openURL(DesktopBaseURL)}>
            <Ionicons size={28} name="desktop-outline" color="#fff" />
          </TouchableOpacity>
        ),

        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="product/index"
        options={{
          title: 'Produto',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="bag-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scanner/index"

        options={{
          title: 'Scanner',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="qr-code-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="movement/index"
        options={{
          title: 'Movimentação',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="reload-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="logout/index"
        options={{
          title: 'Logout',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="log-out-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
