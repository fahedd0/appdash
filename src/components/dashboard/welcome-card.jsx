'use client';
import { useEffect, useState } from 'react';
import { LogOut } from 'lucide-react';

export default function WelcomeCard() {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data:", e);
        localStorage.removeItem('user'); // Clean up invalid data
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    window.location.href = '/login'; // full reload to reset UI
  };

  // Don't render anything during SSR to prevent hydration errors
  if (!isClient) return null;

  // Also handle missing user data
  if (!user) return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-400">Please log in to see dashboard content.</p>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4">
            {user.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Welcome</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.role || 'User'}</p>
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