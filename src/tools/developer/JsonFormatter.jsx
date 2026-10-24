import { useState } from 'react';
import { Copy, Check, Download, Trash2, FileCode, CheckCircle, AlertCircle } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';
import { downloadText, formatBytes } from '../../utils/fileHelpers';
import Button from '../../components/Button';

const SAMPLE_JSON = `{
  "name": "360° Tools",
  "version": "1.0.0",
  "author": {
    "name": "Avishkar Studio",
    "website": "https://tools.avishkarstudio.com"
  },
  "features": [
    "100% Client-side Processing",
    "Zero File Uploads",
    "High Performance 3D Interface",
    "Open Source Tools"
  ],
  "settings": {
    "theme": "modern-teal",
    "offlineSupport": true,
    "maxFileSizeMb": 50
  }
}`;

export default function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState(2);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const { copied, copy } = useClipboard();

  const formatJson = (indentSize = indent) => {
    setError(null);
    if (!input.trim()) {
      setError('Please enter some JSON to format.');
      setStats(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setInput(formatted);
      calculateStats(parsed, formatted);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
      setStats(null);
    }
  };

  const minifyJson = () => {
    setError(null);
    if (!input.trim()) return;

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      calculateStats(parsed, minified);
    } catch (err) {
      setError(`Cannot minify invalid JSON: ${err.message}`);
    }
  };

  const validateJson = () => {
    if (!input.trim()) {
      setError('Input is empty.');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setError(null);
      calculateStats(parsed, input);
      alert('Valid JSON! Syntax is 100% correct.');
    } catch (err) {
      setError(`Syntax Error: ${err.message}`);
    }
  };

  const calculateStats = (parsed, rawText) => {
    const isArray = Array.isArray(parsed);
    const keyCount = typeof parsed === 'object' && parsed !== null
      ? Object.keys(parsed).length
      : 0;
    const lines = rawText.split('\n').length;
    const size = new Blob([rawText]).size;

    setStats({
      type: isArray ? 'Array' : typeof parsed === 'object' ? 'Object' : typeof parsed,
      keys: isArray ? `${parsed.length} items` : `${keyCount} keys`,
      lines,
      size: formatBytes(size),
    });
  };

  const handleDownload = () => {
    if (!input.trim()) return;
    downloadText(input, 'formatted.json', 'application/json');
  };

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="p-4 bg-white rounded-2xl border border-border shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="primary"
            onClick={() => formatJson()}
            className="text-xs px-4 py-2"
          >
            Beautify JSON
          </Button>
          <Button
            variant="outline"
            onClick={minifyJson}
            className="text-xs px-4 py-2"
          >
            Minify (Compact)
          </Button>
          <Button
            variant="outline"
            onClick={validateJson}
            className="text-xs px-4 py-2"
          >
            Validate
          </Button>
          <div className="h-4 w-px bg-border mx-1 hidden sm:block" />
          <select
            value={indent}
            onChange={(e) => {
              const val = Number(e.target.value);
              setIndent(val);
              formatJson(val);
            }}
            className="px-2.5 py-1.5 bg-gray-50 border border-border rounded-lg text-xs font-medium text-text-primary outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
            <option value={1}>1 Tab</option>
          </select>
        </div>

        {/* Right: Copy & Utilities */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setInput(SAMPLE_JSON);
              setError(null);
            }}
            className="text-xs font-semibold text-text-muted hover:text-brand-700 px-2 py-1 transition-colors cursor-pointer"
          >
            Load Sample
          </button>
          <button
            onClick={() => {
              setInput('');
              setError(null);
              setStats(null);
            }}
            className="text-xs font-semibold text-text-muted hover:text-red-600 px-2 py-1 transition-colors cursor-pointer"
          >
            Clear
          </button>
          <Button
            variant="secondary"
            onClick={() => copy(input)}
            className="text-xs gap-1.5 px-3 py-1.5"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="text-xs gap-1.5 px-3 py-1.5"
          >
            <Download size={14} />
            Save .json
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-2.5 p-4 bg-red-50 text-red-800 text-sm rounded-xl border border-red-200">
          <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-mono text-xs">{error}</div>
        </div>
      )}

      {/* Editor Container */}
      <div className="relative bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          placeholder="Paste or type raw JSON here..."
          rows={18}
          spellCheck={false}
          className="w-full p-6 font-mono text-xs sm:text-sm text-text-primary bg-slate-900 text-slate-100 outline-none resize-y leading-relaxed"
        />

        {/* Bottom Status Bar */}
        <div className="px-6 py-2.5 bg-slate-800 border-t border-slate-700 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>Lines: {input.split('\n').length}</span>
            <span>Size: {formatBytes(new Blob([input]).size)}</span>
            {stats && <span>Type: {stats.type} ({stats.keys})</span>}
          </div>
          <span className="text-slate-400">UTF-8 · Validated client-side</span>
        </div>
      </div>
    </div>
  );
}
