import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-text-muted">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-brand-700 transition-colors"
      >
        <Home size={13} />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.label || idx} className="flex items-center">
            <ChevronRight size={13} className="mx-1.5 text-text-muted shrink-0" />
            {isLast || !item.to ? (
              <span className="font-semibold text-text-primary truncate max-w-[200px] sm:max-w-xs">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.to}
                className="hover:text-brand-700 transition-colors truncate max-w-[150px]"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
