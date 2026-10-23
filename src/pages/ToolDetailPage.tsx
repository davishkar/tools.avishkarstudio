import { useParams, Link } from 'react-router-dom';
import Section from '../components/ui/Section';
import Badge from '../components/ui/Badge';
import DynamicIcon, { ArrowRight, Clock } from '../components/ui/DynamicIcon';
import { getToolBySlug, getToolsByCategory } from '../data/tools';
import { getCategoryBySlug, categories } from '../data/categories';
import ToolCard from '../components/tools/ToolCard';

export default function ToolDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getToolBySlug(slug) : undefined;

  if (!tool) {
    return (
      <Section className="pt-32!">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-text-primary mb-3">
            Tool Not Found
          </h1>
          <p className="text-text-secondary mb-6">
            The tool you're looking for doesn't exist or may have been renamed.
          </p>
          <Link
            to="/tools"
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            ← Browse all tools
          </Link>
        </div>
      </Section>
    );
  }

  const category = categories.find((c) => c.id === tool.categoryId);
  const relatedTools = getToolsByCategory(tool.categoryId).filter(
    (t) => t.id !== tool.id
  );

  return (
    <>
      {/* Tool Header */}
      <section className="pt-32 pb-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-muted mb-6">
            <Link to="/" className="hover:text-brand-700 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/tools" className="hover:text-brand-700 transition-colors">
              All Tools
            </Link>
            <span>/</span>
            {category && (
              <>
                <Link
                  to={`/categories/${category.slug}`}
                  className="hover:text-brand-700 transition-colors"
                >
                  {category.shortName}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-text-primary font-medium">{tool.name}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
              style={{ backgroundColor: category?.color || '#0F766E' }}
            >
              <DynamicIcon
                name={tool.icon}
                size={24}
                className="text-white"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                  {tool.name}
                </h1>
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
              <p className="text-text-secondary leading-relaxed max-w-2xl">
                {tool.longDescription}
              </p>
              {category && (
                <Link
                  to={`/categories/${category.slug}`}
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-text-muted hover:text-brand-700 transition-colors"
                >
                  <DynamicIcon name={category.icon} size={13} />
                  {category.name}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tool Body */}
      <Section>
        {tool.status === 'coming-soon' ? (
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-50 flex items-center justify-center">
              <Clock size={32} className="text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              Coming Soon
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              This tool is currently under development and will be available in
              a future release. We are building it with care to ensure quality
              and reliability.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/tools"
                className="px-5 py-2.5 text-sm font-semibold text-brand-700 bg-brand-50 rounded-xl hover:bg-brand-100 transition-colors"
              >
                Browse available tools
              </Link>
              <Link
                to="/suggest-tool"
                className="px-5 py-2.5 text-sm font-semibold text-text-secondary hover:text-brand-700 transition-colors"
              >
                Suggest a feature
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* Tool interface would go here for available tools */}
            <div className="bg-white rounded-2xl border border-border p-8 shadow-card">
              <p className="text-sm text-text-secondary text-center">
                Tool interface loading...
              </p>
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-xl font-bold text-text-primary mb-6 text-center">
              More in {category?.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedTools.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
