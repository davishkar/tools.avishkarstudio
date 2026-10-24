import { useState } from 'react';
import { Send, CheckCircle, Mail, MessageSquare, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import { categories } from '../data/categories';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Contact() {
  useDocumentTitle('Suggest a Tool & Contact');
  const [formState, setFormState] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [toolName, setToolName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!toolName.trim()) {
      setError('Please provide a tool name or concept title.');
      return;
    }
    if (!description.trim()) {
      setError('Please tell us a little about how this tool would work.');
      return;
    }

    setError('');
    setFormState('submitting');

    setTimeout(() => {
      setFormState('success');
    }, 1000);
  };

  const handleReset = () => {
    setFormState('idle');
    setToolName('');
    setCategory('');
    setDescription('');
    setEmail('');
    setError('');
  };

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <Breadcrumbs items={[{ label: 'Contact & Suggest' }]} />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary mt-3">
            Suggest a Tool / Contact
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Tell us what online tool or calculator you need, or share feedback directly with Avishkar Studio.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border p-8 sm:p-10 shadow-card">
          {formState === 'success' ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle size={36} />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">
                Thank You for Your Suggestion!
              </h2>
              <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                Your suggestion has been logged in our development backlog. The Avishkar Studio product team reviews all suggestions weekly.
              </p>
              <div className="pt-4">
                <Button variant="outline" onClick={handleReset}>
                  Submit Another Idea
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-700 text-xs sm:text-sm rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Tool Name or Idea <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  placeholder="e.g. SVG to PNG Converter, Markdown Previewer, Regex Tester..."
                  className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl text-sm font-medium text-text-primary outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl text-sm font-medium text-text-primary outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 cursor-pointer"
                >
                  <option value="">Select a category (optional)</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Description & Intended Use <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="Describe the problem this tool solves and any specific options or outputs you'd like to see..."
                  className="w-full p-4 bg-gray-50 border border-border rounded-xl text-sm text-text-primary outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 resize-y"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Your Email <span className="text-text-muted font-normal text-[11px]">(optional, if you'd like an update when it goes live)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-border rounded-xl text-sm font-medium text-text-primary outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={formState === 'submitting'}
                  className="w-full gap-2 shadow-md hover:shadow-lg"
                >
                  <Send size={16} />
                  {formState === 'submitting' ? 'Submitting Idea...' : 'Submit Tool Suggestion'}
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Direct Email Card */}
        <div className="p-6 bg-white rounded-2xl border border-border shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
              <Mail size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary">Direct Developer Contact</h4>
              <p className="text-xs text-text-muted">Questions, partnerships, or bug reports</p>
            </div>
          </div>
          <a
            href="mailto:support@avishkarstudio.com"
            className="text-xs font-bold text-brand-700 hover:underline"
          >
            support@avishkarstudio.com
          </a>
        </div>
      </div>
    </div>
  );
}
