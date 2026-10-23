import { Link } from 'react-router-dom';
import Section, { SectionHeader } from '../components/ui/Section';
import ToolCard from '../components/tools/ToolCard';
import SearchSection from '../components/search/SearchSection';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { useState } from 'react';

export default function AllToolsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? tools.filter((t) => t.categoryId === activeCategory)
    : tools;

  return (
    <>
      <Section className="pt-32!">
        <SectionHeader
          tag="All Tools"
          title="Browse All Tools"
          description="Explore every tool on 360° Tools — filter by category, search by name."
        />

        {/* Search */}
        <div className="mb-10">
          <SearchSection />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
              !activeCategory
                ? 'bg-brand-700 text-white border-brand-700 shadow-md'
                : 'bg-white text-text-secondary border-border hover:border-brand-300 hover:text-brand-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveCategory(activeCategory === cat.id ? null : cat.id)
              }
              className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-700 text-white border-brand-700 shadow-md'
                  : 'bg-white text-text-secondary border-border hover:border-brand-300 hover:text-brand-700'
              }`}
            >
              {cat.shortName}
            </button>
          ))}
        </div>

        {/* Tool Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-sm text-text-secondary mb-4">
              No tools found in this category yet.
            </p>
            <Link
              to="/suggest-tool"
              className="text-sm font-semibold text-brand-700 hover:underline"
            >
              Suggest a tool →
            </Link>
          </div>
        )}
      </Section>
    </>
  );
}
