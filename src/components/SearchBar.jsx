import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import { searchTools } from '../data/tools';
import { getCategoryById } from '../data/categories';

export default function SearchBar({
  onSearchChange,
  placeholder = 'Search for a tool...',
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = useCallback(
    (value) => {
      setQuery(value);
      if (onSearchChange) onSearchChange(value);
      if (value.trim().length >= 2) {
        setResults(searchTools(value));
      } else {
        setResults([]);
      }
    },
    [onSearchChange]
  );

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    if (onSearchChange) onSearchChange('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        (e.ctrlKey && e.key === 'k') ||
        (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || ''))
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const showDropdown = isFocused && query.trim().length >= 2;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`relative flex items-center gap-3 px-4 min-h-12 bg-white rounded-[8px] border ${
          isFocused ? 'border-brand-700 ring-2 ring-brand-50' : 'border-border'
        }`}
      >
        <Search size={18} className="text-text-secondary shrink-0" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="flex-1 min-h-11 bg-transparent text-[16px] text-text-primary placeholder:text-text-secondary outline-none"
          aria-label="Search for a tool"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="min-h-11 min-w-11 inline-flex items-center justify-center text-text-secondary hover:text-text-primary rounded-[8px]"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
        <kbd className="hidden sm:inline-flex items-center px-2 min-h-7 text-[12px] text-text-secondary bg-bg-tertiary border border-border rounded-[8px]">
          Ctrl+K
        </kbd>
      </div>

      {showDropdown && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[14px] border border-border shadow-dropdown overflow-hidden z-50"
          role="listbox"
        >
          {results.length > 0 ? (
            <ul className="divide-y divide-border-light max-h-80 overflow-y-auto">
              {results.map((tool) => {
                const category = getCategoryById(tool.categoryId);
                return (
                  <li key={tool.id}>
                    <Link
                      to={`/tools/${tool.slug}`}
                      className="flex items-center gap-3 px-4 py-3 min-h-11 hover:bg-brand-50"
                    >
                      <div className="w-9 h-9 rounded-[8px] bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                        <DynamicIcon name={tool.icon} size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[15px] font-medium text-text-primary truncate">
                            {tool.name}
                          </span>
                          <span className="text-[12px] text-text-secondary">
                            {tool.status === 'available' ? 'Available' : 'Coming soon'}
                          </span>
                        </div>
                        <p className="text-[13px] text-text-secondary truncate mt-0.5">
                          {tool.shortDescription}
                        </p>
                      </div>
                      {category && (
                        <span className="hidden sm:inline text-[12px] text-text-secondary shrink-0">
                          {category.shortName}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-6 text-center">
              <p className="text-[15px] font-medium text-text-primary mb-1">
                No tools match “{query}”
              </p>
              <p className="text-[14px] text-text-secondary">
                Try another keyword, or{' '}
                <Link to="/contact" className="text-brand-700 font-medium hover:underline">
                  report a missing tool
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
