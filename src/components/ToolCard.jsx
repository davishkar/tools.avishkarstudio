import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import { getCategoryById } from '../data/categories';

export default function ToolCard({ tool }) {
  const category = getCategoryById(tool.categoryId);

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-border hover:border-brand-300 shadow-card hover:shadow-card-hover transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
    >
      <div>
        {/* Top: Icon + Status */}
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-2xs"
            style={{
              backgroundColor: category?.colorLight || '#F0FDFA',
            }}
          >
            <DynamicIcon
              name={tool.icon}
              size={22}
              style={{ color: category?.color || '#0F766E' }}
            />
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
              tool.status === 'available'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}
          >
            {tool.status === 'available' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
            {tool.status === 'available' ? 'Available' : 'Coming Soon'}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-text-primary group-hover:text-brand-700 transition-colors duration-200 mb-1.5 flex items-center gap-1.5">
          {tool.name}
          {tool.featured && (
            <Sparkles size={14} className="text-amber-500 fill-amber-500 shrink-0" />
          )}
        </h3>

        {/* Description */}
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mb-4">
          {tool.shortDescription}
        </p>
      </div>

      {/* Footer: Category label + Arrow */}
      <div className="flex items-center justify-between pt-4 border-t border-border-light text-xs">
        <span className="font-medium text-text-muted">
          {category?.shortName || tool.categoryId}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-brand-700 group-hover:translate-x-1 transition-transform duration-200">
          Open Tool
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
