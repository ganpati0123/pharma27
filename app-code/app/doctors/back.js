import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function BackTab() {
  const router = useRouter();

  useEffect(() => {
    // This screen is never shown - just navigates back
  }, []);

  return null;
}
