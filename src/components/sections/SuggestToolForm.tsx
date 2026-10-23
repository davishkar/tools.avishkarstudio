import { useState, type FormEvent } from 'react';
import { Send, Check } from '../ui/DynamicIcon';
import { categories } from '../../data/categories';

export default function SuggestToolForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );
  const [toolName, setToolName] = useState('');
  const [useCase, setUseCase] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!toolName.trim()) {
      setError('Please enter a tool name or idea.');
      return;
    }
    if (!useCase.trim()) {
      setError('Please describe how you would use this tool.');
      return;
    }

    setFormState('submitting');

    // Simulate submission — in production, this would POST to a backend
    setTimeout(() => {
      setFormState('success');
    }, 1200);
  };

  if (formState === 'success') {
    return (
      <div className="max-w-lg mx-auto text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-50 flex items-center justify-center">
          <Check size={28} className="text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">
          Thank you! Idea received.
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          Your tool concept has been added to the Avishkar Studio backlog
          evaluation list. We review every suggestion directly.
        </p>
        <button
          onClick={() => {
            setFormState('idle');
            setToolName('');
            setUseCase('');
            setCategory('');
          }}
          className="mt-6 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors cursor-pointer"
        >
          Submit another idea →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto space-y-4"
      noValidate
    >
      {error && (
        <div className="px-4 py-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="suggest-name"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          Tool Name or Idea <span className="text-red-500">*</span>
        </label>
        <input
          id="suggest-name"
          type="text"
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          placeholder="e.g. Base64 Encoder, Color Palette Generator"
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-50 transition-all"
        />
      </div>

      <div>
        <label
          htmlFor="suggest-usecase"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          Intended Use <span className="text-red-500">*</span>
        </label>
        <textarea
          id="suggest-usecase"
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
          placeholder="What problem would this tool solve for you?"
          rows={3}
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-50 transition-all resize-none"
        />
      </div>

      <div>
        <label
          htmlFor="suggest-category"
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          Category <span className="text-text-muted">(optional)</span>
        </label>
        <select
          id="suggest-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-primary outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-50 transition-all cursor-pointer"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-brand-700 rounded-xl hover:bg-brand-800 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
      >
        {formState === 'submitting' ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={16} />
            Submit Suggestion
          </>
        )}
      </button>

      <p className="text-xs text-text-muted text-center">
        Directly reviewed by the Avishkar Studio product team. Help us
        prioritize the roadmap.
      </p>
    </form>
  );
}
