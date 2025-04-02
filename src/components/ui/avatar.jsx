import React from 'react';

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg'
};

export default function Avatar({
  name,
  image,
  size = 'md',
  className = '',
  ...props
}) {
  // Extract initials from name (first letter of first and last name)
  const getInitials = (name) => {
    if (!name) return 'U';
    
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  // Generate a consistent color based on the name
  const getColorClass = (name) => {
    if (!name) return 'bg-blue-500';
    
    const colors = [
      'bg-blue-500',
      'bg-red-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    
    // Simple hash function to get consistent color
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div
      className={`
        ${sizeClasses[size] || sizeClasses.md}
        ${!image ? getColorClass(name) : ''}
        rounded-full flex items-center justify-center text-white font-medium
        ${className}
      `}
      {...props}
    >
      {image ? (
        <img
          src={image}
          alt={name || 'User'}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}