// src/app/dashboard/layout.jsx - Fixed version with improved collapse/expand functionality
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// React icons
import { 
  FiHome, FiPackage, FiFileText, FiShield, FiDownload, 
  FiLifeBuoy, FiActivity, FiGrid, FiUsers, FiBell, 
  FiList, FiChevronLeft, FiChevronRight, FiLogOut, 
  FiMenu, FiX, FiSun, FiMoon
} from 'react-icons/fi';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Navigation items
  const navItems = [
    {
      title: null,
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: FiHome },
        { name: 'Products', href: '/dashboard/products', icon: FiPackage },
      ]
    },
    {
      title: 'Policy Management Center',
      items: [
        { name: 'Quotes', href: '/dashboard/quotes', icon: FiFileText },
        { name: 'Policies', href: '/dashboard/policies', icon: FiShield },
      ]
    },
    {
      title: 'Reports',
      items: [
        { name: 'Download Center', href: '/dashboard/download', icon: FiDownload },
      ]
    },
    {
      title: 'Support',
      items: [
        { name: 'Request Support', href: '/dashboard/support', icon: FiLifeBuoy },
      ]
    },
    {
      title: 'Settings',
      items: [
        { name: 'Activity Log', href: '/dashboard/activity', icon: FiActivity },
        { name: 'Agencies', href: '/dashboard/agencies', icon: FiGrid },
        { name: 'Users', href: '/dashboard/users', icon: FiUsers },
        { name: 'Notifications', href: '/dashboard/notifications', icon: FiBell },
        { name: 'Sequences', href: '/dashboard/sequences', icon: FiList },
      ]
    },
  ];

  return (
    <div className={`h-screen flex overflow-hidden transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Expand Button - Outside sidebar when collapsed */}
      {!isMobile && collapsed && (
        <button 
          onClick={() => setCollapsed(false)}
          className="absolute left-5 top-4 z-30 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          aria-label="Expand sidebar"
        >
          <FiChevronRight size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
      )}

      {/* Sidebar */}
      <aside 
        className={`
          ${isMobile ? 'fixed z-30 h-full' : 'relative'} 
          ${mobileMenuOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : ''} 
          ${collapsed && !mobileMenuOpen && !isMobile ? 'w-20' : 'w-64'} 
          transition-all duration-300 ease-in-out flex flex-col
          border-r dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm
        `}
      >
        {/* Mobile close button */}
        {isMobile && mobileMenuOpen && (
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiX size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        )}

        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
          <Link 
            href="/dashboard" 
            className={`text-xl font-bold text-gray-800 dark:text-white transition-opacity duration-200 ${collapsed && !mobileMenuOpen && !isMobile ? 'opacity-0' : 'opacity-100'}`}
          >
            AppDash
          </Link>
          
          {/* Collapse button - Only show when sidebar is expanded */}
          {!isMobile && !collapsed && (
            <button 
              onClick={() => setCollapsed(true)}
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Collapse sidebar"
            >
              <FiChevronLeft size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {section.title && (
                <h3 
                  className={`
                    px-4 mb-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider
                    transition-opacity duration-200 ${collapsed && !mobileMenuOpen && !isMobile ? 'opacity-0' : 'opacity-100'}
                  `}
                >
                  {section.title}
                </h3>
              )}
              <ul>
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className={`
                          group flex items-center px-4 py-2 text-sm font-medium
                          ${isActive 
                            ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border-l-4 border-transparent'
                          }
                          transition-all duration-200
                        `}
                      >
                        <Icon 
                          size={20} 
                          className={`
                            ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white'} 
                            mr-3 flex-shrink-0
                          `}
                        />
                        <span className={`transition-opacity duration-200 ${collapsed && !mobileMenuOpen && !isMobile ? 'opacity-0' : 'opacity-100'}`}>
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="p-4 border-t dark:border-gray-700">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`
              w-full flex items-center justify-center py-2 px-4 text-sm font-medium rounded-md
              ${collapsed && !mobileMenuOpen && !isMobile ? 'px-0' : ''}
              ${darkMode 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }
              transition-all duration-200
            `}
          >
            {darkMode ? (
              <FiSun size={20} className={collapsed && !mobileMenuOpen && !isMobile ? 'mx-auto' : 'mr-2'} />
            ) : (
              <FiMoon size={20} className={collapsed && !mobileMenuOpen && !isMobile ? 'mx-auto' : 'mr-2'} />
            )}
            <span className={`transition-opacity duration-200 ${collapsed && !mobileMenuOpen && !isMobile ? 'hidden' : 'block'}`}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 border-b dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-between px-6 sticky top-0 z-10">
          {/* Mobile menu button */}
          {isMobile && (
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="mr-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiMenu size={24} className="text-gray-500 dark:text-gray-400" />
            </button>
          )}
          
          {/* Page title - dynamically set based on pathname */}
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            {pathname === '/dashboard' 
              ? 'Dashboard' 
              : navItems.flatMap(section => section.items).find(item => item.href === pathname)?.name || 'Dashboard'
            }
          </h1>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <FiBell size={20} className="text-gray-500 dark:text-gray-400" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                A
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">admin</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}