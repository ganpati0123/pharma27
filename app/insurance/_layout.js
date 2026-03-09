import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, StyleSheet, Animated } from 'react-native';
import { useRef, useEffect } from 'react';
import useTheme from '../components/insurance/shared/useTheme';

const TabIcon = ({ name, color, size, focused }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1.15 : 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(dotAnim, {
        toValue: focused ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <Animated.View style={[tabStyles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
      <View style={[tabStyles.iconBg, focused && tabStyles.iconBgActive]}>
        <Ionicons name={name} size={size || 22} color={color} />
      </View>
      <Animated.View style={[tabStyles.activeDot, { opacity: dotAnim, transform: [{ scale: dotAnim }] }]} />
    </Animated.View>
  );
};

export default function InsuranceLayout() {
  const router = useRouter();
  const { colors, isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 72,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: colors.tabBar,
          borderTopWidth: 1,
          borderTopColor: isDarkMode ? colors.border : '#F0F0F0',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="back"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="arrow-back" color={color} size={size} focused={focused} />
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
          title: 'Insurance',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="shield-checkmark" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="topup"
        options={{
          title: 'Top Up',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="add-circle" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="compass" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="policies"
        options={{
          title: 'My Policies',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="document-text" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="help-circle" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="health-insurance"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="topup-dedicated"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const tabStyles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBgActive: {
    backgroundColor: '#FFF3E0',
  },
  iconBgActiveDark: {
    backgroundColor: '#3D2E1F',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF6B35',
    marginTop: 2,
  },
});
