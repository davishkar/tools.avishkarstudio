import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import { getCategoryById } from '../data/categories';

export default function ToolCard({ tool }) {
  const category = getCategoryById(tool.categoryId);

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="tool-card group flex flex-col justify-between min-h-[148px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-[8px] bg-brand-50 text-brand-700 flex items-center justify-center">
            <DynamicIcon name={tool.icon} size={20} />
          </div>
          <span className="text-[12px] font-medium text-text-secondary">
            {tool.status === 'available' ? 'Available' : 'Coming soon'}
          </span>
        </div>

        <h3 className="text-[17px] font-semibold text-text-primary leading-snug mb-1">
          {tool.name}
        </h3>
        <p className="text-[14px] text-text-secondary leading-relaxed line-clamp-2">
          {tool.shortDescription}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-border text-[13px]">
        <span className="text-text-secondary">{category?.shortName || tool.categoryId}</span>
        <span className="inline-flex items-center gap-1 font-medium text-brand-700">
          Open
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
