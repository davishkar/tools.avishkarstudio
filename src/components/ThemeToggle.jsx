import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center min-w-10 min-h-10 w-10 h-10 rounded-[8px] text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-600 ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun
            size={19}
            className="text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45"
          />
        ) : (
          <Moon
            size={19}
            className="text-slate-600 transition-transform duration-300 rotate-0 hover:-rotate-12"
          />
        )}
      </div>
    </button>
  );
}
