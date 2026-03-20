/**
 * APOLLO 24|7 - PHARMACY DETAILS LAYOUT
 * Stack Navigation for all pharmacy detail pages
 */
import { Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function PharmacyDetailsLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Medicine Detail Routes */}
      <Stack.Screen name="MedicineDetail" options={{ title: 'Medicine Details' }} />
      
      {/* Category Detail Routes */}
      <Stack.Screen name="CategoryDetail" options={{ title: 'Category Details' }} />
      
      {/* Concern Detail Routes */}
      <Stack.Screen name="ConcernDetail" options={{ title: 'Health Concern' }} />
      
      {/* Brand Detail Routes */}
      <Stack.Screen name="BrandDetail" options={{ title: 'Brand Details' }} />
      
      {/* Service Detail Routes */}
      <Stack.Screen name="ServiceDetail" options={{ title: 'Service Details' }} />
    </Stack>
  );
}
