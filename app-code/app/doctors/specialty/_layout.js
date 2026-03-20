import { Stack } from 'expo-router';

export default function SpecialtyLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="cardiology" />
      <Stack.Screen name="dermatology" />
      <Stack.Screen name="generalpractitioner" />
      <Stack.Screen name="womenshealth" />
      <Stack.Screen name="psychiatry" />
      <Stack.Screen name="orthopaedics" />
    </Stack>
  );
}
