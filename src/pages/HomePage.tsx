import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, LayoutGrid } from '../components/ui/DynamicIcon';
import Section, { SectionHeader } from '../components/ui/Section';
import Hero3DScene from '../components/hero/Hero3DScene';
import SearchSection from '../components/search/SearchSection';
import CategoryGrid from '../components/categories/CategoryGrid';
import ToolCard from '../components/tools/ToolCard';
import HowItWorks from '../components/sections/HowItWorks';
import SuggestToolForm from '../components/sections/SuggestToolForm';
import FAQ from '../components/sections/FAQ';
import { getFeaturedTools } from '../data/tools';

export default function HomePage() {
  const featuredTools = getFeaturedTools();

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative hero-bg min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Content */}
            <div className="max-w-xl animate-fade-in-up">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-xs font-semibold tracking-wider uppercase text-brand-700 bg-brand-50 rounded-full border border-brand-100">
                <Sparkles size={12} />
                Built for everyday productivity
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-text-primary tracking-tight leading-[1.1] mb-5">
                One Platform.{' '}
                <span className="text-gradient">Every Tool</span>{' '}
                You Need.
              </h1>

              <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-md">
                Discover simple, powerful online tools for documents,
                development, design, SEO, networking, and everyday
                productivity.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/tools"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-brand-700 rounded-xl hover:bg-brand-800 shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  Explore All Tools
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
                <a
                  href="#categories"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-brand-700 bg-white border border-brand-200 rounded-xl hover:bg-brand-50 hover:border-brand-300 shadow-sm transition-all duration-200"
                >
                  <LayoutGrid size={16} />
                  Explore Categories
                </a>
              </div>
            </div>

            {/* Right: 3D Scene */}
            <div className="relative hidden md:block">
              <Hero3DScene />
            </div>
          </div>

          {/* Mobile: Simplified category pills */}
          <div className="md:hidden mt-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {['PDF & Docs', 'Dev Tools', 'SEO & Web', 'Image & Design', 'Network & IT', 'Utilities'].map(
                (label) => (
                  <span
                    key={label}
                    className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-white rounded-full border border-border shadow-sm"
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEARCH ===== */}
      <Section id="search-section" className="-mt-8 relative z-10 !pt-0 !pb-16">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-text-muted text-center mb-4">
            Direct access to planned and in-flight browser utilities with
            instant filtering.
          </p>
          <SearchSection />
        </div>
      </Section>

      {/* ===== CATEGORIES ===== */}
      <Section id="categories">
        <SectionHeader
          tag="Categories"
          title="Explore Tool Categories"
          description="Browse by category to find the right tool for your workflow."
        />
        <CategoryGrid />
      </Section>

      {/* ===== FEATURED TOOLS ===== */}
      <Section className="bg-white">
        <SectionHeader
          tag="Featured"
          title="Featured Tools"
          description="A preview of what's coming to the platform. We're building these tools first."
        />
        {featuredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-text-secondary">
              No tools are live yet. Check back soon — we are actively building.
            </p>
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors group"
          >
            View all tools
            <ArrowRight
              size={16}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>
      </Section>

      {/* ===== HOW IT WORKS ===== */}
      <Section>
        <SectionHeader
          tag="How It Works"
          title="Zero Friction Workflow"
          description="No sign-up walls. No cloud processing delays. Just open, use, and go."
        />
        <HowItWorks />
      </Section>

      {/* ===== SUGGEST A TOOL ===== */}
      <Section id="suggest-tool" className="bg-white">
        <SectionHeader
          tag="Suggest"
          title="Suggest a Tool You Need"
          description="Is there a specific converter, formatter, or small job that slows you down every day? Tell us what to build next."
        />
        <SuggestToolForm />
      </Section>

      {/* ===== FAQ ===== */}
      <Section>
        <SectionHeader
          tag="FAQ"
          title="Frequently Asked Questions"
          description="Clear answers regarding availability, browser support, and how 360° Tools operates."
        />
        <FAQ />
      </Section>
    </>
  );
}
