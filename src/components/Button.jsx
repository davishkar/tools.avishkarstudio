import React from 'react';

/**
 * Reusable Button component with standardized brand variants
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-brand-700 text-white hover:bg-brand-800 shadow-sm hover:shadow-md focus:ring-brand-500',
    secondary: 'bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200 focus:ring-brand-500',
    outline: 'bg-white text-text-primary border border-border hover:bg-gray-50 hover:border-brand-300 focus:ring-brand-500 shadow-2xs',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-gray-100 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-2xs',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-6 py-3.5',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
