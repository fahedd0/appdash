'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Search, Calendar, MessageSquare } from 'lucide-react';
import { navigationConfig } from '@/lib/navigation';

export default function Header({ isMobile, setMobileMenuOpen }) {
  const pathname = usePathname();
  const [user, setUser] = useState({ email: '', role: '' });
  const [showSearchBar, setShowSearchBar] = useState(false);

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

  // Get current date in a nice format
  const getCurrentDate = () => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
    >
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={20} className="text-gray-500 dark:text-gray-400" />
            </motion.button>
          )}

          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{getCurrentPageTitle()}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{getCurrentDate()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-3">
          {/* Search Bar - Expandable */}
          <div className="relative">
            {showSearchBar ? (
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="relative"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  onBlur={() => setShowSearchBar(false)}
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </motion.div>
            ) : (
              <motion.button 
                onClick={() => setShowSearchBar(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search size={20} className="text-gray-500 dark:text-gray-400" />
              </motion.button>
            )}
          </div>
          
          {/* Calendar Button */}
          <motion.button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hidden md:flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar size={20} className="text-gray-500 dark:text-gray-400" />
          </motion.button>
          
          {/* Messages Button */}
          <motion.button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hidden md:flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare size={20} className="text-gray-500 dark:text-gray-400" />
          </motion.button>

          {/* Notifications Button */}
          <motion.button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} className="text-gray-500 dark:text-gray-400" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </motion.button>

          {/* User Profile */}
          <motion.div 
            className="flex items-center ml-2 pl-2 md:pl-4 border-l border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mr-2 shadow-md">
                {user.email?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {user.email ? user.email.split('@')[0] : 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role || 'user'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}