import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const variants = {
  primary:
    'bg-brand-700 text-white hover:bg-brand-800 shadow-md hover:shadow-lg active:shadow-sm',
  secondary:
    'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50 hover:border-brand-300 shadow-sm',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-gray-100',
  outline:
    'bg-transparent text-text-primary border border-border hover:border-brand-300 hover:bg-surface-card',
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconRight,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-semibold
        rounded-[var(--radius-lg)] cursor-pointer
        transition-all duration-200 ease-[var(--ease-smooth)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}
