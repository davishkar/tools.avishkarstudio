import { useState, useMemo } from 'react';
import { Copy, Check, Trash2, Clock, BookOpen, Mic, BarChart2 } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';
import Button from '../../components/Button';

const SAMPLE_TEXT = `360° Tools by Avishkar Studio provides simple, powerful online utilities for students, developers, designers, and everyday productivity.

Every tool runs directly inside your browser without uploading private files or personal documents to external cloud servers. Experience lightning-fast performance, elegant 3D interfaces, and complete peace of mind.`;

export default function WordCounter() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const { copied, copy } = useClipboard();

  const stats = useMemo(() => {
    const raw = text.trim();
    if (!raw) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: '0 sec',
        speakingTime: '0 sec',
        keywords: [],
      };
    }

    const words = raw.match(/\b[a-zA-Z0-9_\u00C0-\u017F'-]+\b/g) || [];
    const wordCount = words.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const sentences = (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (raw ? 1 : 0);
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length;

    // Reading time: 200 wpm
    const readMinutes = wordCount / 200;
    const readingTime = readMinutes < 1
      ? `${Math.max(1, Math.round(readMinutes * 60))} sec`
      : `${Math.ceil(readMinutes)} min`;

    // Speaking time: 130 wpm
    const speakMinutes = wordCount / 130;
    const speakingTime = speakMinutes < 1
      ? `${Math.max(1, Math.round(speakMinutes * 60))} sec`
      : `${Math.ceil(speakMinutes)} min`;

    // Keyword density
    const frequency = {};
    const stopWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'for', 'on', 'with', 'by', 'as', 'at', 'this', 'that', 'or', 'an']);
    words.forEach((w) => {
      const lower = w.toLowerCase();
      if (lower.length > 2 && !stopWords.has(lower)) {
        frequency[lower] = (frequency[lower] || 0) + 1;
      }
    });

    const keywords = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        percent: ((count / (wordCount || 1)) * 100).toFixed(1),
      }));

    return {
      words: wordCount,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      keywords,
    };
  }, [text]);

  return (
    <div className="space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-border shadow-xs text-center">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Words</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-brand-700 mt-1">{stats.words}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-border shadow-xs text-center">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Characters</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1">{stats.charsWithSpaces}</p>
          <span className="text-[10px] text-text-muted">({stats.charsNoSpaces} no spaces)</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-border shadow-xs text-center">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Sentences</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1">{stats.sentences}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-border shadow-xs text-center">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Paragraphs</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-text-primary mt-1">{stats.paragraphs}</p>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-border shadow-xs text-center col-span-2 sm:col-span-1">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Reading Time</span>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">{stats.readingTime}</p>
          <span className="text-[10px] text-text-muted">Speaking: {stats.speakingTime}</span>
        </div>
      </div>

      {/* Editor Area */}
      <div className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-3 bg-gray-50 border-b border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-text-secondary">Text Input</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setText(SAMPLE_TEXT)}
              className="text-xs font-semibold text-text-muted hover:text-brand-700 px-2 py-1 transition-colors cursor-pointer"
            >
              Load Sample
            </button>
            <button
              onClick={() => setText('')}
              className="text-xs font-semibold text-text-muted hover:text-red-600 px-2 py-1 transition-colors cursor-pointer"
            >
              Clear
            </button>
            <Button
              variant="secondary"
              onClick={() => copy(text)}
              className="text-xs gap-1 px-3 py-1.5"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Text'}
            </Button>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here to calculate words and characters..."
          rows={12}
          className="w-full p-6 text-sm text-text-primary outline-none resize-y leading-relaxed bg-transparent"
        />
      </div>

      {/* Keyword Density Table */}
      {stats.keywords.length > 0 && (
        <div className="p-6 bg-white rounded-2xl border border-border shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 size={18} className="text-brand-700" />
            <h4 className="text-sm font-bold text-text-primary">Top Keywords Density</h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {stats.keywords.map((k) => (
              <div key={k.word} className="p-3 bg-gray-50 rounded-xl border border-border-light text-center">
                <p className="text-xs font-bold text-text-primary truncate">"{k.word}"</p>
                <p className="text-sm font-extrabold text-brand-700 mt-0.5">{k.count}x</p>
                <span className="text-[10px] text-text-muted">{k.percent}% density</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
