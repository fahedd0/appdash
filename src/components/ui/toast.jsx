// src/components/ui/toast.jsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

// Toast context
const ToastContext = createContext(null);

// Toast types and their styles
const toastTypes = {
  success: {
    icon: CheckCircle,
    style: 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-600 dark:text-green-300',
    iconColor: 'text-green-500 dark:text-green-400'
  },
  error: {
    icon: AlertCircle,
    style: 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300',
    iconColor: 'text-red-500 dark:text-red-400'
  },
  info: {
    icon: Info,
    style: 'bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-300',
    iconColor: 'text-blue-500 dark:text-blue-400'
  }
};

// Toast Provider Component
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  };
  
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  // Expose the context values
  const contextValue = {
    toasts,
    addToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Toast Container Component
function ToastContainer() {
  const { toasts, removeToast } = useContext(ToastContext);
  
  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-xs space-y-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual Toast Component
function Toast({ toast, onRemove }) {
  const { id, message, type, duration } = toast;
  const { icon: Icon, style, iconColor } = toastTypes[type] || toastTypes.info;
  
  useEffect(() => {
    if (duration === Infinity) return;
    
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`pointer-events-auto relative flex items-center p-4 rounded-lg shadow-md border-l-4 ${style}`}
    >
      <div className={`mr-3 ${iconColor}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 mr-2">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

// Custom hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}