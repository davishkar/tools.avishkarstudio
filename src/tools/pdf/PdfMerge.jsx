import { useState, useRef } from 'react';
import { Upload, Download, ArrowUp, ArrowDown, Trash2, FileText, CheckCircle, RefreshCw } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { formatBytes, readFileAsArrayBuffer, downloadBlob } from '../../utils/fileHelpers';
import Button from '../../components/Button';

export default function PdfMerge() {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedBlob, setMergedBlob] = useState(null);
  const [mergedFileName, setMergedFileName] = useState('merged-document.pdf');
  const [dragActive, setDragActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFiles = async (newFileList) => {
    const validPdfs = Array.from(newFileList).filter(
      (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    );

    if (validPdfs.length === 0) {
      alert('Please select valid PDF files.');
      return;
    }

    // Inspect page counts using pdf-lib
    const items = await Promise.all(
      validPdfs.map(async (f) => {
        try {
          const buffer = await readFileAsArrayBuffer(f);
          const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
          const pageCount = pdfDoc.getPageCount();
          return {
            id: Math.random().toString(36).substring(2, 9),
            file: f,
            name: f.name,
            size: f.size,
            pageCount,
          };
        } catch {
          return {
            id: Math.random().toString(36).substring(2, 9),
            file: f,
            name: f.name,
            size: f.size,
            pageCount: '?',
          };
        }
      })
    );

    setFiles((prev) => [...prev, ...items]);
    setMergedBlob(null);
  };

  const moveItem = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= files.length) return;

    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setFiles(newFiles);
    setMergedBlob(null);
  };

  const removeItem = (id) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
    setMergedBlob(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please add at least 2 PDF files to merge.');
      return;
    }

    setIsMerging(true);
    setStatusMessage('Reading and combining PDF pages...');

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        setStatusMessage(`Merging ${item.name} (${i + 1}/${files.length})...`);
        const buffer = await readFileAsArrayBuffer(item.file);
        const pdf = await PDFDocument.load(buffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      setStatusMessage('Finalizing merged document...');
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      setMergedBlob(blob);
      setStatusMessage('PDFs successfully merged!');
    } catch (err) {
      console.error('Error merging PDFs: ', err);
      alert(`Merge failed: ${err.message || 'Check if any file is encrypted'}`);
      setStatusMessage('');
    } finally {
      setIsMerging(false);
    }
  };

  const handleDownload = () => {
    if (!mergedBlob) return;
    downloadBlob(mergedBlob, mergedFileName || 'merged-document.pdf');
  };

  const handleReset = () => {
    setFiles([]);
    setMergedBlob(null);
    setStatusMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const totalPages = files.reduce((sum, f) => (typeof f.pageCount === 'number' ? sum + f.pageCount : sum), 0);

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`dropzone p-10 text-center cursor-pointer transition-all duration-200 ${
          dragActive ? 'border-brand-500 bg-brand-50' : 'hover:border-brand-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center shadow-xs">
          <Upload size={32} />
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-2">
          Select or Drag & Drop Multiple PDF Files
        </h3>
        <p className="text-sm text-text-secondary max-w-md mx-auto mb-4">
          Add two or more PDF files. You can arrange them in your exact desired order before merging.
        </p>
        <span className="inline-block px-5 py-2.5 bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-xs">
          Browse PDF Files
        </span>
      </div>

      {files.length > 0 && (
        <div className="space-y-6">
          {/* Header Summary */}
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-border">
            <div className="text-sm font-semibold text-text-primary">
              {files.length} {files.length === 1 ? 'file' : 'files'} selected · {totalPages} total pages
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold text-brand-700 hover:text-brand-800 cursor-pointer"
            >
              + Add More Files
            </button>
          </div>

          {/* Files List */}
          <ul className="space-y-3">
            {files.map((item, idx) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-border shadow-xs hover:border-brand-200 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-primary truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {formatBytes(item.size)} · {item.pageCount} {item.pageCount === 1 ? 'page' : 'pages'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveItem(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 text-text-muted hover:text-brand-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    onClick={() => moveItem(idx, 'down')}
                    disabled={idx === files.length - 1}
                    className="p-1.5 text-text-muted hover:text-brand-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown size={16} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-text-muted hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors ml-2"
                    title="Remove file"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Merge & Download Section */}
          <div className="p-6 bg-white rounded-2xl border border-border space-y-4">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider shrink-0">
                Output File Name:
              </label>
              <input
                type="text"
                value={mergedFileName}
                onChange={(e) => setMergedFileName(e.target.value)}
                placeholder="merged-document.pdf"
                className="flex-1 max-w-sm px-3 py-1.5 text-sm bg-gray-50 border border-border rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {statusMessage && (
              <div className="flex items-center gap-2 p-3 bg-brand-50 text-brand-800 text-sm rounded-xl border border-brand-100">
                <CheckCircle size={16} className="text-brand-600" />
                <span>{statusMessage}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={handleReset}
                className="gap-2"
              >
                <RefreshCw size={16} />
                Clear All Files
              </Button>

              {!mergedBlob ? (
                <Button
                  variant="primary"
                  onClick={handleMerge}
                  disabled={files.length < 2 || isMerging}
                  className="gap-2 px-8 py-3.5 shadow-md"
                >
                  {isMerging ? 'Merging Documents...' : `Merge ${files.length} PDFs`}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleDownload}
                  className="gap-2 px-8 py-3.5 shadow-lg bg-emerald-600 hover:bg-emerald-700"
                >
                  <Download size={18} />
                  Download Combined PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
