import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function LabTestsEntry() {
  const router = useRouter();

  useEffect(() => {
    router.push('/labtests');
  }, []);

  return null;
}
