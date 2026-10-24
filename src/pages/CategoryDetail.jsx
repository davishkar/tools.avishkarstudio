import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ToolCard from '../components/ToolCard';
import DynamicIcon from '../components/DynamicIcon';
import { getCategoryBySlug, categories } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function CategoryDetail() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);

  useDocumentTitle(category ? category.name : 'Category');

  if (!category) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Category Not Found</h1>
        <p className="text-sm text-text-secondary mb-6">The category you requested does not exist.</p>
        <Link to="/categories" className="text-sm font-semibold text-brand-700 hover:underline">
          ← Back to All Categories
        </Link>
      </div>
    );
  }

  const categoryTools = getToolsByCategory(category.id);
  const otherCategories = categories.filter((c) => c.id !== category.id);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Category Header */}
        <div
          className="p-8 sm:p-12 rounded-3xl border border-border shadow-xs relative overflow-hidden"
          style={{ backgroundColor: category.colorLight }}
        >
          <div className="relative z-10 space-y-4">
            <Breadcrumbs
              items={[
                { label: 'Categories', to: '/categories' },
                { label: category.shortName },
              ]}
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
                style={{ backgroundColor: category.color }}
              >
                <DynamicIcon name={category.icon} size={32} className="text-white" />
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
                  {category.name}
                </h1>
                <p className="text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed mt-1">
                  {category.description}
                </p>
                <span className="inline-block mt-3 px-3 py-1 bg-white/80 border border-border rounded-full text-xs font-bold text-text-primary">
                  {categoryTools.length} {categoryTools.length === 1 ? 'utility available' : 'utilities available'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-6">
            Tools in {category.shortName}
          </h2>

          {categoryTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="p-12 bg-white rounded-2xl border border-border text-center">
              <p className="text-sm font-semibold text-text-primary mb-1">
                More tools are currently under active development.
              </p>
              <Link to="/contact" className="text-xs font-semibold text-brand-700 hover:underline">
                Suggest a tool for this category →
              </Link>
            </div>
          )}
        </div>

        {/* Browse Other Categories */}
        <div className="pt-8 border-t border-border">
          <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">
            Explore Other Categories
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {otherCategories.map((c) => (
              <Link
                key={c.id}
                to={`/categories/${c.slug}`}
                className="flex items-center gap-2 p-3 bg-white rounded-xl border border-border hover:border-brand-300 hover:shadow-2xs transition-all"
              >
                <DynamicIcon name={c.icon} size={16} style={{ color: c.color }} />
                <span className="text-xs font-bold text-text-primary truncate">
                  {c.shortName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
