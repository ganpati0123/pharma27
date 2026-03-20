import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(mainTabs)" />
      <Stack.Screen name="cart" options={{ presentation: 'card', animation: 'slide_from_right' }} />
      <Stack.Screen name="account" options={{ presentation: 'card', animation: 'slide_from_right' }} />
      <Stack.Screen name="doctors" />
      <Stack.Screen name="doctors/specialty/cardiology" options={{ presentation: 'card', animation: 'slide_from_right' }} />
      <Stack.Screen name="doctors/specialty/dermatology" options={{ presentation: 'card', animation: 'slide_from_right' }} />
      <Stack.Screen name="doctors/specialty/generalpractitioner" options={{ presentation: 'card', animation: 'slide_from_right' }} />
      <Stack.Screen name="doctors/specialty/womenshealth" options={{ presentation: 'card', animation: 'slide_from_right' }} />
      <Stack.Screen name="doctors/specialty/psychiatry" options={{ presentation: 'card', animation: 'slide_from_right' }} />
      <Stack.Screen name="doctors/specialty/orthopaedics" options={{ presentation: 'card', animation: 'slide_from_right' }} />
      <Stack.Screen name="pharmacy" />
      <Stack.Screen name="labtests" />
      <Stack.Screen name="insurance" />
      <Stack.Screen name="myhealth" />
    </Stack>
  );
}
