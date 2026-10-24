import { useState, useMemo } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SearchBar from '../components/SearchBar';
import ToolCard from '../components/ToolCard';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function AllTools() {
  useDocumentTitle('All Online Tools');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeCategory === 'all' || tool.categoryId === activeCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <Breadcrumbs items={[{ label: 'All Tools' }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-3">
            Explore All Online Tools
          </h1>
          <p className="text-sm text-text-secondary mt-1 max-w-xl">
            Filter by category or search by keyword to locate the right browser utility instantly.
          </p>
        </div>

        {/* Search */}
        <SearchBar
          onSearchChange={setSearchQuery}
          placeholder="Filter tools by keyword, format, or action..."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-brand-700 text-white border-brand-700 shadow-xs'
                : 'bg-white text-text-secondary border-border hover:bg-gray-50'
            }`}
          >
            All Tools ({tools.length})
          </button>
          {categories.map((cat) => {
            const count = tools.filter((t) => t.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brand-700 text-white border-brand-700 shadow-xs'
                    : 'bg-white text-text-secondary border-border hover:bg-gray-50'
                }`}
              >
                {cat.shortName} ({count})
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 text-xs text-text-muted">
            <span>Showing {filteredTools.length} {filteredTools.length === 1 ? 'utility' : 'utilities'}</span>
            {searchQuery && <span>Filtered by: "{searchQuery}"</span>}
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="p-16 bg-white rounded-2xl border border-border text-center">
              <p className="text-base font-bold text-text-primary mb-2">No matching tools found</p>
              <p className="text-xs text-text-secondary mb-6">
                Try searching with different terms or reset your category filter.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-brand-700 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
