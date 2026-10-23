import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { ExternalLink } from '../ui/DynamicIcon';

const platformLinks = [
  { to: '/tools', label: 'All Tools' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About Studio' },
  { to: '/suggest-tool', label: 'Suggest a Tool' },
];

const legalLinks = [
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms of Service' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-[var(--radius-md)] bg-brand-700 flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-extrabold tracking-tighter">
                  360°
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold text-text-primary tracking-tight">
                  360° Tools
                </span>
                <span className="text-[10px] text-text-muted font-medium tracking-wider uppercase">
                  by Avishkar Studio
                </span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Comprehensive developer, designer, and utility web tools engineered with modern precision.
            </p>
            <a
              href="https://tools.avishkarstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800 transition-colors"
            >
              tools.avishkarstudio.com
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary hover:text-brand-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="text-sm text-text-secondary hover:text-brand-700 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              Legal & Info
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary hover:text-brand-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} 360° Tools by Avishkar Studio. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Engineered with native web standards for maximum utility and performance.
          </p>
        </div>
      </div>
    </footer>
  );
}
