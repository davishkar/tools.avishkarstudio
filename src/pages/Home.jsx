import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, LayoutGrid, Shield, Zap, Lock, ChevronDown } from 'lucide-react';
import Hero3DScene from '../components/Hero3DScene';
import SearchBar from '../components/SearchBar';
import ToolCard from '../components/ToolCard';
import DynamicIcon from '../components/DynamicIcon';
import Button from '../components/Button';
import { categories } from '../data/categories';
import { getFeaturedTools } from '../data/tools';
import useDocumentTitle from '../hooks/useDocumentTitle';

const FAQS = [
  {
    q: 'Are these tools really 100% free with no sign-up?',
    a: 'Yes. Every tool on 360° Tools runs entirely in your browser without requiring an account, email verification, or payment. You can use them as often as you need.',
  },
  {
    q: 'Are my files and documents uploaded to your servers?',
    a: 'No. Tools like the Image Compressor, Image Resizer, PDF Merge, and PDF Split operate strictly in your browser memory using HTML5 Canvas and WebAssembly. Your files never leave your device.',
  },
  {
    q: 'Do the tools work on mobile phones and tablets?',
    a: 'Yes! The platform is designed mobile-first and adapts cleanly across smartphones, tablets, laptops, and ultra-wide desktops.',
  },
  {
    q: 'Can I suggest a new tool for the platform?',
    a: 'Absolutely. We actively build tools based on user feedback. Use our Contact/Suggest page to let us know what calculator, converter, or utility would save you time.',
  },
];

export default function Home() {
  useDocumentTitle('One Platform. Every Tool You Need');
  const featuredTools = getFeaturedTools();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative hero-bg min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Column: Vision & Action */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-xs font-semibold tracking-wider uppercase text-brand-700 bg-brand-50 rounded-full border border-brand-100 shadow-2xs">
                <Sparkles size={12} className="text-brand-600" />
                Built for everyday productivity
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold text-text-primary tracking-tight leading-[1.1] mb-5">
                One Platform.{' '}
                <span className="text-gradient">Every Tool</span>{' '}
                You Need.
              </h1>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-md">
                Fast, private, client-side online tools for documents,
                development, images, text, and business math directly in your browser.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/tools">
                  <Button variant="primary" size="lg" className="gap-2 shadow-md hover:shadow-lg">
                    Explore All Tools
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button variant="outline" size="lg" className="gap-2 shadow-2xs">
                    <LayoutGrid size={16} />
                    Browse Categories
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 mt-10 pt-6 border-t border-border-light text-xs text-text-muted">
                <div className="flex items-center gap-1.5">
                  <Shield size={14} className="text-emerald-600" />
                  <span>100% Private (Client-side)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={14} className="text-amber-500" />
                  <span>Instant Processing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock size={14} className="text-brand-600" />
                  <span>No Sign-Up Required</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive 3D Universe */}
            <div className="relative hidden md:block">
              <Hero3DScene />
            </div>
          </div>

          {/* Mobile Category Quick Chips */}
          <div className="md:hidden mt-10 pt-6 border-t border-border-light">
            <p className="text-xs font-semibold text-text-muted text-center mb-3 uppercase tracking-wider">
              Quick Categories
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  className="px-3 py-1.5 text-xs font-semibold text-text-secondary bg-white rounded-full border border-border shadow-2xs hover:border-brand-300 hover:text-brand-700 transition-colors"
                >
                  {cat.shortName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEARCH SECTION ===== */}
      <section className="relative z-10 -mt-8 mx-auto max-w-4xl px-4 sm:px-6">
        <SearchBar />
      </section>

      {/* ===== FEATURED TOOLS SECTION ===== */}
      <section className="py-20 bg-white border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Ready to Use
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1">
                Featured Tools
              </h2>
              <p className="text-sm text-text-secondary mt-1 max-w-lg">
                Fully functional, browser-based utilities with zero server upload.
              </p>
            </div>

            <Link
              to="/tools"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors group"
            >
              Browse all tools
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES EXPLORER ===== */}
      <section className="py-20 bg-bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Taxonomy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1">
              Explore by Category
            </h2>
            <p className="text-sm text-text-secondary mt-2">
              Browse organized tool collections tailored for each specific domain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="group p-6 bg-white rounded-2xl border border-border hover:border-brand-300 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-start gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: cat.colorLight }}
                >
                  <DynamicIcon name={cat.icon} size={24} style={{ color: cat.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-text-primary group-hover:text-brand-700 transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ZERO FRICTION WORKFLOW ===== */}
      <section className="py-20 bg-white border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Privacy & Speed
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1">
              Zero Friction Workflow
            </h2>
            <p className="text-sm text-text-secondary mt-2">
              Designed around respect for your privacy, data, and time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-bg-primary rounded-2xl border border-border shadow-xs text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center shadow-2xs font-extrabold text-xl">
                1
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">No Sign-Up Barrier</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Open any tool URL and begin immediately. No passwords, no credit card forms, and no annoying email capture modals.
              </p>
            </div>

            <div className="p-8 bg-bg-primary rounded-2xl border border-border shadow-xs text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center shadow-2xs font-extrabold text-xl">
                2
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">100% Client-Side Engine</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Images, text, and PDF data are manipulated directly in browser memory using HTML5 Canvas & WebAssembly without cloud transmission.
              </p>
            </div>

            <div className="p-8 bg-bg-primary rounded-2xl border border-border shadow-xs text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center shadow-2xs font-extrabold text-xl">
                3
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">Instant Download & Copy</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Export converted files, compressed photos, and formatted payloads with a single click. Clean, crisp, and fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-20 bg-bg-primary border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-text-primary hover:text-brand-700 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-text-muted transition-transform duration-200 shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-brand-700' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border-light pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
