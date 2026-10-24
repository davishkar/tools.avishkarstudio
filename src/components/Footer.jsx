import { Link } from 'react-router-dom';
import { Shield, Sparkles, Heart } from 'lucide-react';
import { categories } from '../data/categories';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                360°
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold text-white tracking-tight">
                  360° Tools
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                  by Avishkar Studio
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Discover fast, simple, client-side online tools for documents, code, images, text, and business math. No software installs required.
            </p>

            <div className="flex items-center gap-2 text-xs text-brand-300 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700 w-fit">
              <Shield size={14} className="text-brand-400" />
              <span>100% Client-Side Processing · Zero Server Uploads</span>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Featured Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/tools/image-compressor" className="text-slate-400 hover:text-white transition-colors">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/tools/pdf-merge" className="text-slate-400 hover:text-white transition-colors">
                  PDF Merge
                </Link>
              </li>
              <li>
                <Link to="/tools/json-formatter" className="text-slate-400 hover:text-white transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link to="/tools/word-counter" className="text-slate-400 hover:text-white transition-colors">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link to="/tools/gst-calculator" className="text-slate-400 hover:text-white transition-colors">
                  GST Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Suggest a Tool / Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} 360° Tools by Avishkar Studio. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision by</span>
            <span className="font-semibold text-slate-400">Avishkar Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
