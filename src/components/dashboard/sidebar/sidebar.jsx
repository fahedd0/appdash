'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sun, Moon, X, LogOut } from 'lucide-react';
import { navigationConfig } from '@/lib/navigation';

export default function Sidebar({
  collapsed,
  setCollapsed,
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
  darkMode,
  setDarkMode
}) {
  const pathname = usePathname();
  
  // Animation variants
  const sidebarVariants = {
    expanded: { width: 240 },
    collapsed: { width: 70 }
  };
  
  const logoTextVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };
  
  const itemTextVariants = {
    expanded: { opacity: 1, x: 0, display: "block" },
    collapsed: { opacity: 0, x: -10, display: "none" }
  };

  return (
    <>
      {/* Expand Button - Outside sidebar when collapsed */}
      {!isMobile && collapsed && (
        <motion.button 
          onClick={() => setCollapsed(false)}
          className="absolute left-7 top-5 z-30 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Expand sidebar"
        >
          <ChevronRight size={18} className="text-gray-500 dark:text-gray-400" />
        </motion.button>
      )}
      
      <motion.aside 
        variants={sidebarVariants}
        animate={collapsed && !mobileMenuOpen && !isMobile ? 'collapsed' : 'expanded'}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          ${isMobile ? 'fixed z-30 h-full' : 'relative'} 
          ${mobileMenuOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : ''} 
          transition-all duration-300 ease-in-out flex flex-col
          bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-md border-r border-gray-100 dark:border-gray-700
        `}
      >
        {/* Mobile close button */}
        {isMobile && mobileMenuOpen && (
          <motion.button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <X size={18} className="text-gray-500 dark:text-gray-400" />
          </motion.button>
        )}

        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white mr-3">
              <span className="font-bold text-lg">A</span>
            </div>
            <motion.span 
              variants={logoTextVariants}
              className="font-bold text-gray-800 dark:text-white text-xl"
            >
              AppDash
            </motion.span>
          </div>
          
          {/* Collapse button - Only show when sidebar is expanded */}
          {!isMobile && !collapsed && (
            <motion.button 
              onClick={() => setCollapsed(true)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Collapse sidebar"
            >
              <ChevronLeft size={18} className="text-gray-500 dark:text-gray-400" />
            </motion.button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-5 px-2">
          {navigationConfig.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-5">
              {section.title && (
                <motion.h3 
                  variants={itemTextVariants}
                  className="px-3 mb-2 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider"
                >
                  {section.title}
                </motion.h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.05 + sectionIndex * 0.1 }}
                    >
                      <Link 
                        href={item.href}
                        className={`
                          group flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 dark:from-blue-900/30 dark:to-indigo-900/30 dark:text-blue-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
                        `}
                      >
                        <div className={`
                          ${isActive 
                            ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}
                          p-1.5 rounded-lg mr-2.5 transition-colors duration-200
                        `}>
                          <item.icon size={16} />
                        </div>
                        <motion.span variants={itemTextVariants} className="text-sm">
                          {item.name}
                        </motion.span>
                        
                        {isActive && (
                          <motion.div 
                            className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"
                            layoutId="activeIndicator"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
          {/* Dark Mode Toggle */}
          <motion.button 
            onClick={() => setDarkMode(!darkMode)}
            className={`
              w-full flex items-center justify-center py-2.5 px-4 text-sm font-medium rounded-xl
              ${darkMode 
                ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
              transition-all duration-200
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {darkMode ? (
              <>
                <Sun size={18} className={collapsed && !mobileMenuOpen && !isMobile ? 'mx-auto' : 'mr-3'} />
                <motion.span variants={itemTextVariants}>Light Mode</motion.span>
              </>
            ) : (
              <>
                <Moon size={18} className={collapsed && !mobileMenuOpen && !isMobile ? 'mx-auto' : 'mr-3'} />
                <motion.span variants={itemTextVariants}>Dark Mode</motion.span>
              </>
            )}
          </motion.button>
          
          {/* Logout Button */}
          <motion.button 
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="w-full flex items-center justify-center py-2.5 px-4 text-sm font-medium rounded-xl
              bg-red-50 text-red-600 hover:bg-red-100 
              dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50
              transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={18} className={collapsed && !mobileMenuOpen && !isMobile ? 'mx-auto' : 'mr-3'} />
            <motion.span variants={itemTextVariants}>Logout</motion.span>
          </motion.button>
        </div>
      </motion.aside>
    </>
  );
}
