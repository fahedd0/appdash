'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidebarItem({ item, collapsed, mobileMenuOpen, isMobile }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  
  return (
    <li>
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
        <item.icon 
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
}