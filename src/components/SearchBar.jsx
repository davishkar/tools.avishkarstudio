import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import { searchTools } from '../data/tools';
import { getCategoryById } from '../data/categories';

export default function SearchBar({ onSearchChange, placeholder = 'Search tools by name, tag, or utility...' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = useCallback((value) => {
    setQuery(value);
    if (onSearchChange) onSearchChange(value);
    if (value.trim().length >= 2) {
      setResults(searchTools(value));
    } else {
      setResults([]);
    }
  }, [onSearchChange]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    if (onSearchChange) onSearchChange('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || ''))) {
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
      {/* Search Bar Input */}
      <div
        className={`
          relative flex items-center gap-3 px-5 py-3.5
          bg-white rounded-2xl border transition-all duration-300
          ${isFocused ? 'border-brand-400 shadow-lg ring-4 ring-brand-50' : 'border-border shadow-card hover:border-gray-300'}
        `}
      >
        <Search size={20} className="text-text-muted shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 250)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
          aria-label="Search tools"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="p-1 text-text-muted hover:text-text-primary rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-medium text-text-muted bg-gray-50 border border-border-light rounded-md">
          Ctrl+K
        </kbd>
      </div>

      {/* Results Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-border shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {results.length > 0 ? (
            <ul className="divide-y divide-border-light max-h-80 overflow-y-auto">
              {results.map((tool) => {
                const category = getCategoryById(tool.categoryId);
                return (
                  <li key={tool.id}>
                    <Link
                      to={`/tools/${tool.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-brand-50/60 transition-colors"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                        style={{
                          backgroundColor: category?.colorLight || '#F0FDFA',
                        }}
                      >
                        <DynamicIcon
                          name={tool.icon}
                          size={18}
                          style={{ color: category?.color || '#0F766E' }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-text-primary truncate">
                            {tool.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              tool.status === 'available'
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {tool.status === 'available' ? 'Available' : 'Coming Soon'}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary truncate mt-0.5">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm font-semibold text-text-primary mb-1">
                No matching tools found for "{query}"
              </p>
              <p className="text-xs text-text-secondary">
                Need a specific utility?{' '}
                <Link to="/contact" className="text-brand-700 font-semibold hover:underline">
                  Suggest it to our team
                </Link>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
