import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function MyHealthEntry() {
  const router = useRouter();

  useEffect(() => {
    router.push('/myhealth');
  }, []);

  return null;
}
