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
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-[8px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-700 text-white hover:bg-brand-800',
    secondary: 'bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-100',
    outline: 'bg-white text-text-primary border border-border hover:bg-bg-tertiary',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
    danger: 'bg-error text-white hover:bg-red-800',
  };

  const sizes = {
    sm: 'text-[14px] px-3 min-h-11',
    md: 'text-[15px] px-4 min-h-11',
    lg: 'text-[16px] px-5 min-h-11',
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
