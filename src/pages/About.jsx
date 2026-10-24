import { Link } from 'react-router-dom';
import { Shield, Zap, Sparkles, Heart, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function About() {
  useDocumentTitle('About 360° Tools');

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <Breadcrumbs items={[{ label: 'About' }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-3">
            About 360° Tools
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Created and maintained with care by Avishkar Studio.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-3xl border border-border p-8 sm:p-10 shadow-card space-y-4">
          <h2 className="text-xl font-extrabold text-text-primary">
            Our Mission: Everyday Utilities Without Friction
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            360° Tools is designed to eliminate the headaches of traditional online converters and utility sites: spammy popups, intrusive ads, forced sign-ups, and dubious file uploads to unknown servers.
          </p>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            We provide clean, modern, client-side browser utilities for students, software engineers, content creators, designers, and small business owners.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-border shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Shield size={20} />
            </div>
            <h3 className="text-base font-bold text-text-primary">Strict Client-Side Privacy</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Whenever technically possible, we execute all processing (image resizing, compression, PDF manipulation, formatting) inside your browser memory. Your documents and sensitive data never touch our servers.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-border shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-bold text-text-primary">Instant Response Time</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              No server queue times or network upload lags. Calculations, code formatting, and Base64 conversions happen synchronously in milliseconds.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-border shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <h3 className="text-base font-bold text-text-primary">Modern 3D Aesthetics</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Utility tools do not have to look like 1990s web pages. We craft rich, responsive interfaces with glassmorphism, responsive 3D scenes, and thoughtful micro-interactions.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-border shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Heart size={20} />
            </div>
            <h3 className="text-base font-bold text-text-primary">Continuous Expansion</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              We continually release new tools based on user feedback. Have an idea for a tool that would save your team 10 minutes every week? Let us know.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 bg-slate-900 text-white rounded-3xl text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to streamline your workflow?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Explore our collection of tools or tell us what tool we should build next.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/tools">
              <Button variant="primary" size="md">
                Explore All Tools
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="md" className="bg-slate-800 text-white border-slate-700 hover:bg-slate-700">
                Contact & Feedback
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
