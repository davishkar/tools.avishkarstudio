import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from '../ui/DynamicIcon';
import DynamicIcon from '../ui/DynamicIcon';
import { searchTools } from '../../data/tools';
import { categories } from '../../data/categories';
import Badge from '../ui/Badge';
import type { Tool } from '../../data/tools';

export default function SearchSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    if (value.trim().length >= 2) {
      setResults(searchTools(value));
    } else {
      setResults([]);
    }
  }, []);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  // Keyboard shortcut: Ctrl+K or / to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || ''))) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const getCategoryName = (catId: string) => categories.find((c) => c.id === catId)?.name || catId;

  const showResults = isFocused && query.trim().length >= 2;

  return (
    <div id="search-tools" className="relative max-w-2xl mx-auto">
      {/* Search Input */}
      <div
        className={`
          relative flex items-center gap-3 px-5 py-3.5
          bg-white rounded-2xl border transition-all duration-300
          ${isFocused ? 'border-brand-300 shadow-lg ring-4 ring-brand-50' : 'border-border shadow-card'}
        `}
      >
        <Search size={20} className="text-text-muted shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search tools by name or keyword..."
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
          aria-label="Search tools"
          role="searchbox"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="p-1 text-text-muted hover:text-text-primary rounded-md hover:bg-gray-100 transition-colors"
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
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-border shadow-xl overflow-hidden z-40">
          {results.length > 0 ? (
            <ul className="divide-y divide-border-light max-h-80 overflow-y-auto" role="listbox">
              {results.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-brand-50/50 transition-colors"
                    role="option"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor:
                          categories.find((c) => c.id === tool.categoryId)
                            ?.colorLight || '#F0FDFA',
                      }}
                    >
                      <DynamicIcon
                        name={tool.icon}
                        size={18}
                        style={{
                          color:
                            categories.find((c) => c.id === tool.categoryId)
                              ?.color || '#0F766E',
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-text-primary truncate">
                          {tool.name}
                        </span>
                        <Badge
                          variant={
                            tool.status === 'available'
                              ? 'success'
                              : tool.status === 'beta'
                              ? 'info'
                              : 'warning'
                          }
                        >
                          {tool.status === 'available'
                            ? 'Available'
                            : tool.status === 'beta'
                            ? 'Beta'
                            : 'Coming Soon'}
                        </Badge>
                      </div>
                      <p className="text-xs text-text-secondary truncate mt-0.5">
                        {getCategoryName(tool.categoryId)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-10 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-50 flex items-center justify-center">
                <Search size={20} className="text-text-muted" />
              </div>
              <p className="text-sm font-medium text-text-primary mb-1">
                No matching tools found
              </p>
              <p className="text-xs text-text-secondary">
                We are expanding our tool library continuously.{' '}
                <Link
                  to="/suggest-tool"
                  className="text-brand-700 hover:underline"
                >
                  Suggest a tool
                </Link>{' '}
                to our team.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
