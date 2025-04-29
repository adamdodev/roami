import { ITEM, ITEM_CODE } from '@/components/Constants';

import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

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
        name={`my-items`}
        options={{
          title: `My ${ITEM}s`,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: `Add New ${ITEM}`,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'camera' : 'information-circle-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
