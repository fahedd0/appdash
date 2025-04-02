'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WelcomeCard from '@/components/dashboard/welcome-card';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null; // wait for user to load

  return (
    <div className="space-y-6">
      <WelcomeCard />
      {/* Add more dashboard sections here if needed */}
    </div>
  );
}
