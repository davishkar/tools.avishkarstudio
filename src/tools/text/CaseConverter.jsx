import { useState } from 'react';
import { Copy, Check, Type, ArrowRight } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';
import Button from '../../components/Button';

export default function CaseConverter() {
  const [text, setText] = useState('Transform any text into sentence case, UPPERCASE, lowercase, camelCase, or snake_case with 360° Tools.');
  const { copied, copy } = useClipboard();

  const toSentenceCase = (str) => {
    return str
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toLowerCase = (str) => str.toLowerCase();
  const toUpperCase = (str) => str.toUpperCase();

  const toTitleCase = (str) => {
    return str.toLowerCase().replace(/\b\w+/g, (word) => {
      const minor = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'in', 'of'];
      if (minor.includes(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).replace(/^\w/, (c) => c.toUpperCase());
  };

  const toCamelCase = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return '';
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      })
      .replace(/[^a-zA-Z0-9]/g, '');
  };

  const toPascalCase = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
        if (+match === 0) return '';
        return match.toUpperCase();
      })
      .replace(/[^a-zA-Z0-9]/g, '');
  };

  const toSnakeCase = (str) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s-]+/g, '_');
  };

  const toKebabCase = (str) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-');
  };

  const toConstantCase = (str) => {
    return toSnakeCase(str).toUpperCase();
  };

  const toAlternatingCase = (str) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += i % 2 === 0 ? str[i].toLowerCase() : str[i].toUpperCase();
    }
    return result;
  };

  const applyCase = (transformFn) => {
    setText((prev) => transformFn(prev));
  };

  return (
    <div className="space-y-6">
      {/* Transformation Action Buttons */}
      <div className="p-6 bg-white rounded-2xl border border-border shadow-xs space-y-4">
        <span className="block text-xs font-bold text-text-muted uppercase tracking-wider">
          Click to Convert Text Case:
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <Button variant="outline" onClick={() => applyCase(toSentenceCase)} className="text-xs">
            Sentence case
          </Button>
          <Button variant="outline" onClick={() => applyCase(toLowerCase)} className="text-xs">
            lower case
          </Button>
          <Button variant="outline" onClick={() => applyCase(toUpperCase)} className="text-xs font-bold">
            UPPER CASE
          </Button>
          <Button variant="outline" onClick={() => applyCase(toTitleCase)} className="text-xs">
            Title Case
          </Button>
          <Button variant="outline" onClick={() => applyCase(toCamelCase)} className="text-xs font-mono">
            camelCase
          </Button>
          <Button variant="outline" onClick={() => applyCase(toPascalCase)} className="text-xs font-mono">
            PascalCase
          </Button>
          <Button variant="outline" onClick={() => applyCase(toSnakeCase)} className="text-xs font-mono">
            snake_case
          </Button>
          <Button variant="outline" onClick={() => applyCase(toKebabCase)} className="text-xs font-mono">
            kebab-case
          </Button>
          <Button variant="outline" onClick={() => applyCase(toConstantCase)} className="text-xs font-mono">
            CONSTANT_CASE
          </Button>
          <Button variant="outline" onClick={() => applyCase(toAlternatingCase)} className="text-xs">
            aLtErNaTiNg
          </Button>
        </div>
      </div>

      {/* Editor & Actions */}
      <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-text-secondary">
            {text.length} characters · {text.trim() ? text.trim().split(/\s+/).length : 0} words
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setText('')}
              className="text-xs font-semibold text-text-muted hover:text-red-600 px-2 py-1 transition-colors cursor-pointer"
            >
              Clear
            </button>
            <Button
              variant="secondary"
              onClick={() => copy(text)}
              className="text-xs gap-1.5 px-3 py-1.5"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Converted Text'}
            </Button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text here to convert its case..."
          rows={10}
          className="w-full p-6 text-sm text-text-primary outline-none resize-y leading-relaxed bg-transparent"
        />
      </div>
    </div>
  );
}
