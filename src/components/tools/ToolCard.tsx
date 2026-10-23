import { Link } from 'react-router-dom';
import DynamicIcon, { ArrowRight } from '../ui/DynamicIcon';
import Badge from '../ui/Badge';
import { categories } from '../../data/categories';
import type { Tool } from '../../data/tools';

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

export default function ToolCard({ tool, className = '' }: ToolCardProps) {
  const category = categories.find((c) => c.id === tool.categoryId);

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className={`
        group relative flex flex-col bg-white rounded-2xl border border-border
        p-5 shadow-card hover:shadow-card-hover
        transition-all duration-300 ease-[var(--ease-smooth)]
        hover:-translate-y-0.5
        focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2
        ${className}
      `}
    >
      {/* Top Row: Icon + Badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: category?.colorLight || '#F0FDFA' }}
        >
          <DynamicIcon
            name={tool.icon}
            size={20}
            style={{ color: category?.color || '#0F766E' }}
          />
        </div>
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

      {/* Content */}
      <h3 className="text-sm font-bold text-text-primary mb-1.5 group-hover:text-brand-700 transition-colors">
        {tool.name}
      </h3>
      <p className="text-xs text-text-secondary leading-relaxed flex-1 line-clamp-2">
        {tool.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-light">
        <span className="text-[11px] text-text-muted font-medium">
          {category?.shortName}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 group-hover:gap-2 transition-all duration-300">
          {tool.status === 'available' ? 'Open Tool' : 'Details'}
          <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}

// Compact variant for search results / listings
export function ToolCardCompact({ tool }: ToolCardProps) {
  const category = categories.find((c) => c.id === tool.categoryId);

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-border hover:border-brand-200 shadow-sm hover:shadow-card transition-all duration-200"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: category?.colorLight || '#F0FDFA' }}
      >
        <DynamicIcon
          name={tool.icon}
          size={18}
          style={{ color: category?.color || '#0F766E' }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-text-primary truncate group-hover:text-brand-700 transition-colors">
            {tool.name}
          </h3>
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
          {tool.description}
        </p>
      </div>
      <ArrowRight
        size={16}
        className="text-text-muted group-hover:text-brand-700 shrink-0 transition-colors"
      />
    </Link>
  );
}
