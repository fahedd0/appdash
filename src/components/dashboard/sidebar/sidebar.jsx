'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { navigationConfig } from '@/lib/navigation';
import SidebarSection from './sidebar-section';

export default function Sidebar({
  collapsed,
  setCollapsed,
  isMobile,
  mobileMenuOpen,
  setMobileMenuOpen,
  darkMode,
  setDarkMode
}) {
  return (
    <aside 
      className={`
        ${isMobile ? 'fixed z-30 h-full' : 'relative'} 
        ${mobileMenuOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : ''} 
        ${collapsed && !mobileMenuOpen && !isMobile ? 'w-20' : 'w-64'} 
        transition-all duration-300 ease-in-out flex flex-col
        border-r dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm
      `}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b dark:border-gray-700">
        <Link 
          href="/dashboard" 
          className={`text-xl font-bold text-gray-800 dark:text-white transition-opacity duration-200 ${collapsed && !mobileMenuOpen && !isMobile ? 'opacity-0' : 'opacity-100'}`}
        >
          AppDash
        </Link>
        
        {!isMobile && (
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {collapsed ? 
              <ChevronRight size={20} className="text-gray-500 dark:text-gray-400" /> :
              <ChevronLeft size={20} className="text-gray-500 dark:text-gray-400" />
            }
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navigationConfig.map((section, index) => (
          <SidebarSection 
            key={index}
            section={section}
            collapsed={collapsed}
            mobileMenuOpen={mobileMenuOpen}
            isMobile={isMobile}
          />
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
            <Sun size={20} className={collapsed && !mobileMenuOpen && !isMobile ? 'mx-auto' : 'mr-2'} />
          ) : (
            <Moon size={20} className={collapsed && !mobileMenuOpen && !isMobile ? 'mx-auto' : 'mr-2'} />
          )}
          <span className={`transition-opacity duration-200 ${collapsed && !mobileMenuOpen && !isMobile ? 'hidden' : 'block'}`}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>
    </aside>
  );
}