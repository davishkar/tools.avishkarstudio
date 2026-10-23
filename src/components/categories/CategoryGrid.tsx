import { Link } from 'react-router-dom';
import DynamicIcon, { ArrowRight } from '../ui/DynamicIcon';
import { categories } from '../../data/categories';
import { getToolsByCategory } from '../../data/tools';
import { useState } from 'react';

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.map((cat, idx) => (
        <CategoryCard key={cat.id} category={cat} index={idx} />
      ))}
    </div>
  );
}

function CategoryCard({
  category: cat,
  index,
}: {
  category: (typeof categories)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const toolCount = getToolsByCategory(cat.id).length;

  return (
    <Link
      to={`/categories/${cat.slug}`}
      className={`
        group relative overflow-hidden
        bg-white rounded-2xl border border-border
        p-6 flex flex-col gap-4
        shadow-card hover:shadow-card-hover
        transition-all duration-300 ease-[var(--ease-smooth)]
        hover:-translate-y-1
        animate-fade-in-up stagger-${index + 1}
        focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
        style={{ backgroundColor: cat.color + '15' }}
      />

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: isHovered ? cat.color : cat.colorLight,
        }}
      >
        <DynamicIcon
          name={cat.icon}
          size={22}
          style={{ color: isHovered ? '#fff' : cat.color }}
          className="transition-colors duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-base font-bold text-text-primary mb-1.5">
          {cat.name}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
          {cat.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border-light">
        <span className="text-xs text-text-muted">
          {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 group-hover:gap-2 transition-all duration-300">
          Explore
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
