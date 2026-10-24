import Breadcrumbs from '../components/Breadcrumbs';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Privacy() {
  useDocumentTitle('Privacy Policy');

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          <h1 className="text-3xl font-extrabold text-text-primary mt-3">
            Privacy Policy
          </h1>
          <p className="text-xs text-text-muted mt-1">Last updated: October 2026</p>
        </div>

        <div className="bg-white rounded-3xl border border-border p-8 sm:p-10 shadow-xs space-y-6 text-sm text-text-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-text-primary">1. Client-Side Data Processing Principle</h2>
            <p>
              At 360° Tools by Avishkar Studio, user privacy is our core architectural foundation. The tools provided across this platform—including but not limited to the Image Compressor, Image Resizer, PDF Merge, PDF Split, JSON Formatter, and Base64 Converter—execute strictly inside your web browser using HTML5 Canvas, WebAssembly, and JavaScript APIs.
            </p>
            <p className="font-semibold text-text-primary">
              Your files, images, code snippets, and confidential documents are NEVER uploaded to or stored on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-text-primary">2. Information We Collect</h2>
            <p>
              We do not require user accounts, passwords, or personal registrations. We do not maintain user profile databases. If you voluntarily submit a tool suggestion via our Contact form, we receive the text and email address you provide solely for addressing your request.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-text-primary">3. Local Storage</h2>
            <p>
              Certain tools may utilize your browser's local storage (localStorage) to preserve user preferences (such as quality settings, case options, or recent inputs) for your convenience. This data remains on your physical device and can be cleared at any time via your browser settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-text-primary">4. Analytics & Cookies</h2>
            <p>
              We may utilize standard, privacy-preserving, cookieless aggregate traffic metrics to analyze which tools are most utilized to prioritize maintenance and future development.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-text-primary">5. Contact</h2>
            <p>
              If you have any questions or feedback regarding our privacy standards, please contact us at <a href="mailto:support@avishkarstudio.com" className="text-brand-700 underline font-semibold">support@avishkarstudio.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
