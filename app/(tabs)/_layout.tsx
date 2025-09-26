import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Ionicons } from '@expo/vector-icons';
import { Linking, TouchableOpacity } from 'react-native';
import { desktopBaseURL } from '@/constants/url';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#0869B9' },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#adadadff',
        tabBarInactiveTintColor: '#fff',

        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="product"
        options={{
          title: 'Produto',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="bag-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="box"
        options={{
          title: 'Caixa',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="cube-outline" color={color} />
        }}
      />;
      <Tabs.Screen
        name="scanner"

        options={{
          title: 'Scanner',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="qr-code-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="movement"
        options={{
          title: 'Movimentação',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="reload-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: 'Logout',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="log-out-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
