import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

const ACTIVE_COLOR = '#E05A2B';
const INACTIVE_COLOR = '#555555';

function TabIcon({ name, color, size, badge }) {
  return (
    <View style={tabIconStyles.container}>
      <Ionicons name={name} size={size || 22} color={color} />
      {badge && (
        <View style={tabIconStyles.badge}>
          <Text style={tabIconStyles.badgeText}>AI</Text>
        </View>
      )}
    </View>
  );
}

const tabIconStyles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#E05A2B',
    borderRadius: 6,
    paddingHorizontal: 3,
    paddingVertical: 1,
    minWidth: 16,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '700',
  },
});

export default function DoctorsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 2,
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
          title: 'Doctors',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medical-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="online"
        options={{
          title: 'Online',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="videocam-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="surgery"
        options={{
          title: 'Surgery',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ontime"
        options={{
          title: 'On-Time',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="assistant"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="person-circle-outline" color={color} size={22} badge />
          ),
        }}
      />
    </Tabs>
  );
}
