import Section from '../components/ui/Section';

export default function TermsPage() {
  return (
    <Section className="pt-32!">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Terms of Use
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Last updated: October 2025
        </p>

        <div className="prose prose-sm max-w-none text-text-secondary space-y-6">
          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing and using 360° Tools by Avishkar Studio, you agree
              to these terms. If you do not agree, please do not use the
              platform.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Use of Tools
            </h2>
            <p className="leading-relaxed">
              The tools provided on this platform are available for personal
              and professional use. You are responsible for the content you
              process through our tools. Tools are provided "as is" without
              warranties of any kind.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Availability
            </h2>
            <p className="leading-relaxed">
              We strive to keep all tools available, but we do not guarantee
              uninterrupted access. Tools may be modified, updated, or
              temporarily unavailable during maintenance or development.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Intellectual Property
            </h2>
            <p className="leading-relaxed">
              The 360° Tools platform, including its design, code, and
              branding, is the property of Avishkar Studio. You may not
              reproduce, distribute, or create derivative works of the platform
              without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              Avishkar Studio is not liable for any damages resulting from the
              use of tools on this platform. You use the tools at your own
              risk and should verify important outputs independently.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-text-primary mb-2">
              Changes to Terms
            </h2>
            <p className="leading-relaxed">
              These terms may be updated from time to time. Continued use of
              the platform after changes constitutes acceptance of the revised
              terms.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
