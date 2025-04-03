// src/components/ui/form.jsx
'use client';

import React from 'react';

// Label component
export function Label({ htmlFor, children, required, className = '' }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

// Input component
export function Input({
  id,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon size={18} className="text-gray-400" />
        </div>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 rounded-md shadow-sm 
          border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
          bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          dark:disabled:bg-gray-700 dark:disabled:text-gray-400
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// Select component
export function Select({
  id,
  name,
  options = [],
  value,
  onChange,
  onBlur,
  error,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        className={`w-full pl-4 pr-10 py-2 rounded-md shadow-sm appearance-none
          border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
          bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          dark:disabled:bg-gray-700 dark:disabled:text-gray-400
          ${className}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// Textarea component
export function Textarea({
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  rows = 4,
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`w-full px-4 py-2 rounded-md shadow-sm resize-none
          border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
          bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
          dark:disabled:bg-gray-700 dark:disabled:text-gray-400
          ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// Checkbox component
export function Checkbox({
  id,
  name,
  label,
  checked,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed"
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label 
            htmlFor={id} 
            className={`font-medium ${disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}
          >
            {label}
          </label>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}

// Form group component for layout
export function FormGroup({ children, className = '' }) {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
}

// Form row component for horizontal layout
export function FormRow({ children, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {children}
    </div>
  );
}

// Form component
export function Form({ 
  onSubmit, 
  children,
  className = '',
  ...props 
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={className}
      {...props}
    >
      {children}
    </form>
  );
}