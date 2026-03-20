import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function PharmacyEntry() {
  const router = useRouter();

  useEffect(() => {
    router.push('/pharmacy');
  }, []);

  return null;
}
