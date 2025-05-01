import { ITEM, ITEM_CODE } from '@/components/Constants';

import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Drizzle
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
const expo = SQLite.openDatabaseSync('db.db');
const db = drizzle(expo);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: '#ffd33d',
        // headerStyle: {
        //     backgroundColor: '#25292e',
        // },
        // headerShadowVisible: false,
        // headerTintColor: '#fff',
        // tabBarStyle: {
        //     backgroundColor: '#25292e',
        // },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `My ${ITEM}s`,
          tabBarIcon: ({ color, focused }) => (
            // <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            <MaterialCommunityIcons name="playlist-star" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: `Add New`,
          tabBarIcon: ({ color, focused }) => (
            // <Ionicons name={focused ? 'camera' : 'information-circle-outline'} color={color} size={24} />
            <MaterialCommunityIcons name="playlist-plus" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
