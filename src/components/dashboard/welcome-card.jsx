'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function WelcomeCard() {
  const router = useRouter();
  const [user, setUser] = useState(null); // initially null
  const [isClient, setIsClient] = useState(false); // flag for client-side only

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    router.push('/login');
    window.location.reload();
  };

  if (!isClient || !user) return null; // wait for client + user data

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4">
            {user.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <LogOut size={16} className="mr-2" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}
