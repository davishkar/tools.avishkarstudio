import Section from '../components/ui/Section';

export default function PrivacyPage() {
  return (
    <Section className="pt-32!">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Last updated: October 2025
        </p>

        <div className="prose prose-sm max-w-none text-text-secondary space-y-6">
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Overview
            </h2>
            <p className="leading-relaxed">
              360° Tools by Avishkar Studio is committed to respecting your
              privacy. This policy explains how the platform handles data when
              you use our browser-based tools.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Data Processing
            </h2>
            <p className="leading-relaxed">
              Our tools are designed to process data client-side in your browser
              whenever technically feasible. Each tool page will clearly
              indicate whether it processes data locally or requires server-side
              processing. We do not make blanket claims about all tools
              processing data locally, as some features may require server
              interaction in the future.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Information We Collect
            </h2>
            <p className="leading-relaxed">
              We may collect basic analytics data such as page visits and
              general usage patterns to improve the platform. We do not
              collect, store, or sell personal data. Tool suggestions submitted
              through the website may include the information you voluntarily
              provide.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Third-Party Services
            </h2>
            <p className="leading-relaxed">
              The website uses Google Fonts for typography. If specific tools
              require third-party APIs or services, this will be clearly
              disclosed on the respective tool page.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Contact
            </h2>
            <p className="leading-relaxed">
              For questions about this privacy policy, please reach out through
              the platform's contact channels.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
