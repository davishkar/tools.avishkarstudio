import { Link } from 'react-router-dom';
import Section, { SectionHeader } from '../components/ui/Section';
import { Sparkles, Zap, Shield, Monitor } from '../components/ui/DynamicIcon';

const values = [
  {
    icon: Zap,
    title: 'Fast & Browser-Based',
    description:
      'All tools are designed to run directly in your browser. No downloads, no heavy installs, no waiting for server processing when possible.',
  },
  {
    icon: Shield,
    title: 'Privacy-Conscious',
    description:
      'We design tools to process data client-side whenever technically feasible. Each tool clearly states its data handling approach.',
  },
  {
    icon: Monitor,
    title: 'Works Everywhere',
    description:
      'Built with modern web standards. Works on Chrome, Firefox, Safari, and Edge across desktop, tablet, and mobile devices.',
  },
  {
    icon: Sparkles,
    title: 'Continuously Growing',
    description:
      'We actively develop new tools and improve existing ones. Every user suggestion is reviewed and considered for the roadmap.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32!">
        <SectionHeader
          tag="About"
          title="About 360° Tools"
          description="A centralized online platform helping students, developers, designers, and businesses complete everyday tasks directly in their browsers."
        />

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-border p-8 shadow-card mb-12">
            <h2 className="text-xl font-bold text-text-primary mb-4">
              Our Mission
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              360° Tools by Avishkar Studio is built with a simple objective: provide
              a collection of useful, fast, accessible online tools without requiring
              users to install separate applications.
            </p>
            <p className="text-text-secondary leading-relaxed">
              We believe that common tasks like formatting code, converting files,
              generating meta tags, or creating QR codes shouldn't require downloading
              software or navigating cluttered ad-heavy websites. Every tool we build
              aims to be fast, clear, and respectful of your time.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-border p-6 shadow-card"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-brand-700" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <p className="text-text-secondary mb-4">
              Have a question or want to get in touch?
            </p>
            <Link
              to="/suggest-tool"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-brand-700 rounded-xl hover:bg-brand-800 shadow-md transition-all"
            >
              Suggest a Tool
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
