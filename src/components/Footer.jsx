import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-border pt-12 pb-8">
      <div className="content-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[8px] bg-brand-700 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                360°
              </div>
              <span className="text-[15px] font-semibold text-text-primary">
                360° TOOLS
              </span>
            </Link>
            <p className="text-[14px] text-text-secondary leading-relaxed max-w-xs">
              One Platform. Every Tool You Need. Free online utilities for everyday tasks, processed directly in your browser.
            </p>
          </div>

          <div>
            <h2 className="text-[13px] font-semibold text-text-primary mb-3">Categories</h2>
            <ul className="space-y-2 text-[14px]">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/categories/${cat.slug}`} className="text-text-secondary hover:text-brand-700">
                    {cat.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[13px] font-semibold text-text-primary mb-3">Popular tools</h2>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/tools/image-compressor" className="text-text-secondary hover:text-brand-700">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/tools/json-formatter" className="text-text-secondary hover:text-brand-700">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link to="/tools/word-counter" className="text-text-secondary hover:text-brand-700">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link to="/tools/pdf-merge" className="text-text-secondary hover:text-brand-700">
                  PDF Merge
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[13px] font-semibold text-text-primary mb-3">Company</h2>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link to="/about" className="text-text-secondary hover:text-brand-700">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-secondary hover:text-brand-700">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-text-secondary hover:text-brand-700">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-text-secondary hover:text-brand-700">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px] text-text-secondary">
          <p>© {new Date().getFullYear()} 360° Tools by Avishkar Studio.</p>
          <p>Browser-side processing when practical.</p>
        </div>
      </div>
    </footer>
  );
}
