import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function DoctorsEntry() {
  const router = useRouter();

  useEffect(() => {
    router.push('/doctors');
  }, []);

  return null;
}
