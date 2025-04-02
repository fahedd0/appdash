'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check if we're on the client side before accessing localStorage
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [router]); // Add router as a dependency

  return null;
}