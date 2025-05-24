import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1B3274',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="moisture-sensors"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="tint" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="irrigation-sensors"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="wifi" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
