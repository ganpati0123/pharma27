import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LabTestsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#E05A2B',
        tabBarInactiveTintColor: '#555555',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="back"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="arrow-back" size={22} color={color} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace('/');
          },
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lab Tests',
          tabBarIcon: ({ color }) => (
            <Ionicons name="flask-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fullbody"
        options={{
          title: 'Full Body',
          tabBarIcon: ({ color }) => (
            <Ionicons name="body-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="prohealth"
        options={{
          title: 'Prohealth',
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 9, fontWeight: '700', color: color, letterSpacing: 0.5 }}>PRO</Text>
              <Text style={{ fontSize: 7, color: color, marginTop: -2 }}>HEALTH</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'My Orders',
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
