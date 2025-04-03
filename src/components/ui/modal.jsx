'use client';

import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Modal Context
const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modals, setModals] = useState([]);
  
  const openModal = (content, options = {}) => {
    const id = Math.random().toString(36).substring(2, 9);
    setModals(prev => [...prev, { id, content, options }]);
    return id;
  };
  
  const closeModal = (id) => {
    setModals(prev => prev.filter(modal => modal.id !== id));
  };
  
  const contextValue = {
    openModal,
    closeModal
  };
  
  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {modals.map(modal => (
          <Modal
            key={modal.id}
            id={modal.id}
            content={modal.content}
            options={modal.options}
            onClose={() => closeModal(modal.id)}
          />
        ))}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

function Modal({ id, content, options, onClose }) {
  const {
    title,
    size = 'md',
    closeOnOutsideClick = true,
    showCloseButton = true
  } = options;
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };
  
  // Handle outside click
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget && closeOnOutsideClick) {
      onClose();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleOutsideClick}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`${sizeClasses[size]} w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden`}
      >
        {title && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>
        )}
        
        <div className={!title ? 'pt-6' : ''}>
          {typeof content === 'function' 
            ? content({ onClose }) 
            : content
          }
        </div>
      </motion.div>
    </motion.div>
  );
}

// Custom hook to use modal
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}