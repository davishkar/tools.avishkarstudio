import { useState, useRef } from 'react';
import { Upload, Download, FileText, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { formatBytes, readFileAsArrayBuffer, downloadBlob } from '../../utils/fileHelpers';
import Button from '../../components/Button';

export default function PdfSplit() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [rangeInput, setRangeInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedBlob, setExtractedBlob] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const originalBufferRef = useRef(null);

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile || (!selectedFile.type.includes('pdf') && !selectedFile.name.endsWith('.pdf'))) {
      alert('Please select a valid PDF file.');
      return;
    }

    try {
      const buffer = await readFileAsArrayBuffer(selectedFile);
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = pdf.getPageCount();

      originalBufferRef.current = buffer;
      setFile(selectedFile);
      setPageCount(count);
      setRangeInput(`1-${Math.min(count, 3)}`);
      setExtractedBlob(null);
      setError('');
    } catch (err) {
      alert(`Could not load PDF: ${err.message}`);
    }
  };

  const parsePageRanges = (str, maxPages) => {
    const pages = new Set();
    const parts = str.split(',').map((p) => p.trim()).filter(Boolean);

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start < 1 || end > maxPages || start > end) {
          throw new Error(`Invalid range: "${part}". Valid pages are 1 to ${maxPages}.`);
        }
        for (let i = start; i <= end; i++) {
          pages.add(i);
        }
      } else {
        const page = parseInt(part, 10);
        if (isNaN(page) || page < 1 || page > maxPages) {
          throw new Error(`Invalid page number: "${part}". Must be between 1 and ${maxPages}.`);
        }
        pages.add(page);
      }
    }

    const sortedPages = Array.from(pages).sort((a, b) => a - b);
    if (sortedPages.length === 0) {
      throw new Error('Please specify at least one valid page to extract.');
    }
    return sortedPages;
  };

  const handleExtract = async () => {
    if (!originalBufferRef.current || pageCount === 0) return;

    setError('');
    setIsProcessing(true);

    try {
      const targetPages = parsePageRanges(rangeInput, pageCount);
      // pdf-lib page indices are 0-based
      const zeroBasedIndices = targetPages.map((p) => p - 1);

      const srcPdf = await PDFDocument.load(originalBufferRef.current);
      const newPdf = await PDFDocument.create();

      const copiedPages = await newPdf.copyPages(srcPdf, zeroBasedIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newPdfBytes = await newPdf.save();
      const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
      setExtractedBlob(blob);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!extractedBlob) return;
    const base = file ? file.name.replace(/\.pdf$/i, '') : 'document';
    downloadBlob(extractedBlob, `${base}-extracted.pdf`);
  };

  const handleReset = () => {
    setFile(null);
    setPageCount(0);
    setRangeInput('');
    setExtractedBlob(null);
    setError('');
    originalBufferRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`dropzone p-12 text-center cursor-pointer transition-all duration-200 ${
            dragActive ? 'border-brand-500 bg-brand-50' : 'hover:border-brand-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          />
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center shadow-xs">
            <Upload size={32} />
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Upload PDF Document to Split
          </h3>
          <p className="text-sm text-text-secondary max-w-sm mx-auto mb-4">
            Select a PDF file. You can extract individual pages or custom ranges instantly.
          </p>
          <span className="inline-block px-5 py-2.5 bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-xs">
            Browse PDF
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Info Card */}
          <div className="p-6 bg-white rounded-2xl border border-border shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-text-primary">{file.name}</h4>
                <p className="text-xs text-text-muted mt-0.5">
                  {formatBytes(file.size)} · <span className="text-brand-700 font-semibold">{pageCount} total pages</span>
                </p>
              </div>
            </div>

            <Button variant="ghost" onClick={handleReset} className="text-xs gap-1.5">
              <RefreshCw size={14} />
              Choose Another PDF
            </Button>
          </div>

          {/* Range Configuration */}
          <div className="p-6 bg-white rounded-2xl border border-border space-y-5">
            <div>
              <label className="block text-sm font-bold text-text-primary mb-1">
                Pages to Extract:
              </label>
              <p className="text-xs text-text-muted mb-3">
                Specify pages and ranges separated by commas. Example: <code className="bg-gray-100 px-1 py-0.5 rounded text-brand-700 font-mono">1-3, 5, 8</code>
              </p>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => {
                  setRangeInput(e.target.value);
                  setExtractedBlob(null);
                  setError('');
                }}
                placeholder={`1-${pageCount}`}
                className="w-full max-w-lg px-4 py-2.5 bg-gray-50 border border-border rounded-xl text-sm font-mono text-text-primary outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Quick buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setRangeInput('1')}
                className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors cursor-pointer"
              >
                Page 1 Only
              </button>
              <button
                type="button"
                onClick={() => setRangeInput(`1-${Math.ceil(pageCount / 2)}`)}
                className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors cursor-pointer"
              >
                First Half (1-{Math.ceil(pageCount / 2)})
              </button>
              <button
                type="button"
                onClick={() => setRangeInput(`1-${pageCount}`)}
                className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors cursor-pointer"
              >
                All Pages (1-{pageCount})
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {extractedBlob && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 text-sm rounded-xl border border-emerald-200">
                <CheckCircle size={16} className="text-emerald-600" />
                <span>Extracted PDF ready ({formatBytes(extractedBlob.size)})!</span>
              </div>
            )}

            <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
              {!extractedBlob ? (
                <Button
                  variant="primary"
                  onClick={handleExtract}
                  disabled={isProcessing || !rangeInput.trim()}
                  className="px-8 py-3.5 shadow-md"
                >
                  {isProcessing ? 'Extracting Pages...' : 'Extract Pages'}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleDownload}
                  className="gap-2 px-8 py-3.5 shadow-lg bg-emerald-600 hover:bg-emerald-700"
                >
                  <Download size={18} />
                  Download Extracted PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
