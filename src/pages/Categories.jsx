import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import DynamicIcon from '../components/DynamicIcon';
import { categories } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Categories() {
  useDocumentTitle('All Tool Categories');

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <Breadcrumbs items={[{ label: 'Categories' }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-3">
            All Tool Categories
          </h1>
          <p className="text-sm text-text-secondary mt-1 max-w-xl">
            Browse our comprehensive suite of online utilities organized by functional discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const catTools = getToolsByCategory(cat.id);
            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-border shadow-card p-6 flex flex-col justify-between hover:border-brand-300 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-2xs"
                      style={{ backgroundColor: cat.colorLight }}
                    >
                      <DynamicIcon name={cat.icon} size={24} style={{ color: cat.color }} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-text-secondary rounded-full">
                      {catTools.length} {catTools.length === 1 ? 'tool' : 'tools'}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-text-primary mb-1.5">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-text-secondary leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Tools preview list */}
                  {catTools.length > 0 && (
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block">
                        Included Tools:
                      </span>
                      <ul className="space-y-1.5">
                        {catTools.slice(0, 4).map((t) => (
                          <li key={t.id}>
                            <Link
                              to={`/tools/${t.slug}`}
                              className="text-xs font-semibold text-text-secondary hover:text-brand-700 flex items-center justify-between py-1 transition-colors"
                            >
                              <span>{t.name}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded ${t.status === 'available' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                {t.status === 'available' ? 'Live' : 'Soon'}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Link
                  to={`/categories/${cat.slug}`}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-gray-50 hover:bg-brand-50 text-xs font-bold text-brand-700 rounded-xl border border-border hover:border-brand-200 transition-colors"
                >
                  Explore {cat.shortName}
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
