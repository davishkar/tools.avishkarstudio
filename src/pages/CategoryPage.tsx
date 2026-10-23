import { useParams, Link } from 'react-router-dom';
import Section, { SectionHeader } from '../components/ui/Section';
import ToolCard from '../components/tools/ToolCard';
import DynamicIcon, { ArrowRight } from '../components/ui/DynamicIcon';
import { getCategoryBySlug, categories } from '../data/categories';
import { getToolsByCategory } from '../data/tools';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  if (!category) {
    return (
      <Section className="pt-32!">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-text-primary mb-3">
            Category Not Found
          </h1>
          <p className="text-text-secondary mb-6">
            The category you're looking for doesn't exist.
          </p>
          <Link
            to="/categories"
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            ← Browse all categories
          </Link>
        </div>
      </Section>
    );
  }

  const categoryTools = getToolsByCategory(category.id);

  return (
    <>
      {/* Category Header */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ backgroundColor: category.colorLight }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-brand-700 mb-6 transition-colors"
          >
            ← All Categories
          </Link>
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
              style={{ backgroundColor: category.color }}
            >
              <DynamicIcon name={category.icon} size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                {category.name}
              </h1>
              <p className="text-text-secondary leading-relaxed max-w-xl">
                {category.description}
              </p>
              <p className="text-sm text-text-muted mt-3">
                {categoryTools.length}{' '}
                {categoryTools.length === 1 ? 'tool' : 'tools'} in this category
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <Section>
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-semibold text-text-primary mb-2">
              No tools available yet
            </p>
            <p className="text-sm text-text-secondary mb-6">
              We're working on building tools for this category. Stay tuned!
            </p>
            <Link
              to="/suggest-tool"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors"
            >
              Suggest a tool for {category.shortName}
              <ArrowRight size={14} />
            </Link>
          </div>
        )}

        {/* Other Categories */}
        <div className="mt-20 pt-12 border-t border-border">
          <h2 className="text-xl font-bold text-text-primary mb-6 text-center">
            Other Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories
              .filter((c) => c.id !== category.id)
              .map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-border hover:border-brand-200 hover:shadow-card transition-all"
                >
                  <DynamicIcon
                    name={cat.icon}
                    size={16}
                    style={{ color: cat.color }}
                  />
                  <span className="text-xs font-semibold text-text-primary truncate">
                    {cat.shortName}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </Section>
    </>
  );
}
