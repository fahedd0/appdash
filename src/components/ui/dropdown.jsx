// src/components/ui/dropdown.jsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function DropdownMenu({
  trigger,
  children,
  align = 'right',
  width = 'w-48',
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -5 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {typeof trigger === 'function' 
          ? trigger({ isOpen }) 
          : trigger || (
            <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Options
              <ChevronDown size={16} className={`ml-1 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
          )}
      </div>
      
      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            transition={{ duration: 0.15 }}
            className={`
              absolute z-50 mt-1 ${width} rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 
              ${align === 'left' ? 'left-0' : 'right-0'}
            `}
          >
            <div className="py-1">
              {typeof children === 'function' 
                ? children({ setIsOpen }) 
                : children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownItem({
  children,
  icon: Icon,
  onClick,
  disabled = false,
  destructive = false,
  className = '',
  closeOnClick = true,
  ...props
}) {
  // Get setIsOpen from context if available
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
    
    // Close dropdown automatically if closeOnClick is true
    if (closeOnClick && props.setIsOpen) {
      props.setIsOpen(false);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`
        ${disabled 
          ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' 
          : destructive 
            ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }
        group flex w-full items-center px-4 py-2 text-sm
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {Icon && (
        <Icon 
          size={16} 
          className={`mr-2 ${disabled ? 'opacity-50' : ''}`} 
        />
      )}
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />;
}
