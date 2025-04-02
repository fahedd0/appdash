'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { navigationConfig } from '@/lib/navigation';

export default function Header({ isMobile, setMobileMenuOpen }) {
  const pathname = usePathname();
  const [user, setUser] = useState({ email: '', role: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const getCurrentPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    for (const section of navigationConfig) {
      for (const item of section.items) {
        if (item.href === pathname) return item.name;
      }
    }
    return 'Dashboard';
  };

  return (
    <header className="h-16 border-b dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-6 sticky top-0 z-10">
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="mr-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu size={24} className="text-gray-500 dark:text-gray-400" />
        </button>
      )}

      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{getCurrentPageTitle()}</h1>

      <div className="flex items-center space-x-4">
        <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
          <Bell size={20} className="text-gray-500 dark:text-gray-400" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>

        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
            {user.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
            {user.role || 'admin'}
          </span>
        </div>
      </div>
    </header>
  );
}
