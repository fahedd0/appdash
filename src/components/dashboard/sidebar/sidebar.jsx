'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Sun, Moon, X } from 'lucide-react';
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
    <>
      {/* Expand Button - Outside sidebar when collapsed */}
      {!isMobile && collapsed && (
        <button 
          onClick={() => setCollapsed(false)}
          className="absolute left-5 top-4 z-30 p-1.5 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          aria-label="Expand sidebar"
        >
          <ChevronRight size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
      )}
      
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
            <X size={20} className="text-gray-500 dark:text-gray-400" />
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
              <ChevronLeft size={20} className="text-gray-500 dark:text-gray-400" />
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
    </>
  );
}