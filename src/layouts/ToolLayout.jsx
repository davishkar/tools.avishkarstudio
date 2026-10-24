import { Link } from 'react-router-dom';
import { Shield, Sparkles, HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import DynamicIcon from '../components/DynamicIcon';
import ToolCard from '../components/ToolCard';
import { getCategoryById } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function ToolLayout({ tool, children }) {
  useDocumentTitle(tool?.name);

  if (!tool) return null;

  const category = getCategoryById(tool.categoryId);
  const relatedTools = getToolsByCategory(tool.categoryId)
    .filter((t) => t.id !== tool.id)
    .slice(0, 3);

  const breadcrumbItems = [
    { label: 'All Tools', to: '/tools' },
    ...(category ? [{ label: category.shortName, to: `/categories/${category.slug}` }] : []),
    { label: tool.name },
  ];

  return (
    <div className="pt-24 pb-20">
      {/* Tool Header Section */}
      <section className="bg-white border-b border-border py-8 mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                style={{
                  backgroundColor: category?.colorLight || '#F0FDFA',
                }}
              >
                <DynamicIcon
                  name={tool.icon}
                  size={28}
                  style={{ color: category?.color || '#0F766E' }}
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                    {tool.name}
                  </h1>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      tool.status === 'available'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {tool.status === 'available' ? 'Available' : 'Coming Soon'}
                  </span>
                </div>

                <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
                  {tool.description || tool.shortDescription}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl w-fit">
              <Shield size={14} className="text-emerald-600" />
              <span>100% Client-Side · Private</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tool Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="tool-workspace p-6 sm:p-8">
          {children}
        </div>

        {/* Informational Lower Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Key Features */}
          {tool.features && tool.features.length > 0 && (
            <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-brand-700" />
                <h3 className="text-base font-bold text-text-primary">Key Capabilities</h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-text-secondary">
                {tool.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-brand-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to use */}
          {tool.howToUse && tool.howToUse.length > 0 && (
            <div className="bg-white rounded-2xl border border-border p-6 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle size={18} className="text-brand-700" />
                <h3 className="text-base font-bold text-text-primary">How to Use This Tool</h3>
              </div>
              <ol className="space-y-2.5 text-xs sm:text-sm text-text-secondary list-decimal list-inside">
                {tool.howToUse.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span className="font-medium text-text-primary">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-primary">
                More in {category?.name || 'this category'}
              </h3>
              {category && (
                <Link
                  to={`/categories/${category.slug}`}
                  className="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
                >
                  View all
                  <ArrowRight size={13} />
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedTools.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
