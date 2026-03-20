import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function InsuranceEntry() {
  const router = useRouter();

  useEffect(() => {
    router.push('/insurance');
  }, []);

  return null;
}
