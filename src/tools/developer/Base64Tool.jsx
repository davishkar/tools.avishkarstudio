import { useState } from 'react';
import { Copy, Check, ArrowLeftRight, Upload, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';
import { readFileAsDataURL, downloadBlob } from '../../utils/fileHelpers';
import Button from '../../components/Button';

export default function Base64Tool() {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'file'
  const [action, setAction] = useState('encode'); // 'encode' | 'decode'
  const [textInput, setTextInput] = useState('Hello, World! 360° Tools by Avishkar Studio.');
  const [textOutput, setTextOutput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [error, setError] = useState('');

  // File state
  const [fileBase64, setFileBase64] = useState('');
  const [fileMime, setFileMime] = useState('');
  const [fileName, setFileName] = useState('');

  const { copied: copiedOutput, copy: copyOutput } = useClipboard();

  // Handle Text Conversion
  const handleConvert = (inputVal = textInput, act = action, isUrlSafe = urlSafe) => {
    setError('');
    if (!inputVal) {
      setTextOutput('');
      return;
    }

    try {
      if (act === 'encode') {
        // UTF-8 safe encode
        const bytes = new TextEncoder().encode(inputVal);
        let binary = '';
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        let encoded = btoa(binary);
        if (isUrlSafe) {
          encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        setTextOutput(encoded);
      } else {
        // Decode
        let toDecode = inputVal.trim();
        if (isUrlSafe) {
          toDecode = toDecode.replace(/-/g, '+').replace(/_/g, '/');
          while (toDecode.length % 4) {
            toDecode += '=';
          }
        }
        const binary = atob(toDecode);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const decoded = new TextDecoder().decode(bytes);
        setTextOutput(decoded);
      }
    } catch (err) {
      setError(`Failed to ${act}: Invalid format or corrupted input.`);
      setTextOutput('');
    }
  };

  const handleSwap = () => {
    const nextAction = action === 'encode' ? 'decode' : 'encode';
    setAction(nextAction);
    setTextInput(textOutput || textInput);
    handleConvert(textOutput || textInput, nextAction, urlSafe);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileMime(file.type || 'application/octet-stream');

    try {
      const dataUrl = await readFileAsDataURL(file);
      setFileBase64(dataUrl);
    } catch (err) {
      alert(`Error reading file: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('text')}
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'text'
              ? 'border-brand-700 text-brand-700'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          Text Base64
        </button>
        <button
          onClick={() => setActiveTab('file')}
          className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'file'
              ? 'border-brand-700 text-brand-700'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          File to Base64 (Data URI)
        </button>
      </div>

      {activeTab === 'text' ? (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 bg-white rounded-2xl border border-border shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-xl bg-gray-100 p-1">
                <button
                  onClick={() => {
                    setAction('encode');
                    handleConvert(textInput, 'encode', urlSafe);
                  }}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    action === 'encode' ? 'bg-white text-brand-700 shadow-xs' : 'text-text-secondary'
                  }`}
                >
                  Encode
                </button>
                <button
                  onClick={() => {
                    setAction('decode');
                    handleConvert(textInput, 'decode', urlSafe);
                  }}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    action === 'decode' ? 'bg-white text-brand-700 shadow-xs' : 'text-text-secondary'
                  }`}
                >
                  Decode
                </button>
              </div>

              <label className="flex items-center gap-1.5 text-xs font-medium text-text-secondary cursor-pointer ml-3">
                <input
                  type="checkbox"
                  checked={urlSafe}
                  onChange={(e) => {
                    setUrlSafe(e.target.checked);
                    handleConvert(textInput, action, e.target.checked);
                  }}
                  className="rounded text-brand-700 focus:ring-brand-500"
                />
                URL-Safe (Base64URL)
              </label>
            </div>

            <Button
              variant="outline"
              onClick={handleSwap}
              className="text-xs gap-1.5 px-3 py-1.5"
            >
              <ArrowLeftRight size={14} />
              Swap Input / Output
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Editors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <div className="bg-white rounded-2xl border border-border p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-text-muted">
                <span>INPUT ({action === 'encode' ? 'PLAIN TEXT' : 'BASE64 STRING'})</span>
                <button
                  onClick={() => {
                    setTextInput('');
                    setTextOutput('');
                  }}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>
              <textarea
                value={textInput}
                onChange={(e) => {
                  setTextInput(e.target.value);
                  handleConvert(e.target.value, action, urlSafe);
                }}
                rows={10}
                placeholder={action === 'encode' ? 'Enter plain text...' : 'Enter base64 string...'}
                className="w-full p-3 font-mono text-xs text-text-primary bg-gray-50 border border-border rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-brand-500 resize-y"
              />
            </div>

            {/* Output Panel */}
            <div className="bg-white rounded-2xl border border-border p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-text-muted">
                <span>OUTPUT ({action === 'encode' ? 'BASE64 RESULT' : 'DECODED PLAIN TEXT'})</span>
                <Button
                  variant="secondary"
                  onClick={() => copyOutput(textOutput)}
                  className="text-xs gap-1 px-2.5 py-1"
                >
                  {copiedOutput ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  {copiedOutput ? 'Copied' : 'Copy Output'}
                </Button>
              </div>
              <textarea
                value={textOutput}
                readOnly
                rows={10}
                placeholder="Output will appear here automatically..."
                className="w-full p-3 font-mono text-xs text-text-primary bg-brand-50/30 border border-border rounded-xl outline-none resize-y"
              />
            </div>
          </div>
        </div>
      ) : (
        /* File to Base64 */
        <div className="space-y-6">
          <div className="p-8 bg-white rounded-2xl border border-border shadow-xs text-center">
            <label className="cursor-pointer inline-flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mb-3">
                <Upload size={28} />
              </div>
              <span className="text-sm font-bold text-text-primary mb-1">
                Select Any File to Convert to Base64
              </span>
              <span className="text-xs text-text-muted mb-4">
                Images, PDFs, audio, documents, icons
              </span>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="px-5 py-2 bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-xs">
                Browse File
              </span>
            </label>
          </div>

          {fileBase64 && (
            <div className="p-6 bg-white rounded-2xl border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-text-primary">{fileName}</h4>
                  <p className="text-xs text-text-muted">{fileMime}</p>
                </div>
                <Button
                  variant="primary"
                  onClick={() => copyOutput(fileBase64)}
                  className="gap-2 text-xs"
                >
                  {copiedOutput ? <Check size={14} /> : <Copy size={14} />}
                  {copiedOutput ? 'Copied Data URI' : 'Copy Full Base64 Data URI'}
                </Button>
              </div>

              {fileMime.startsWith('image/') && (
                <div className="p-4 bg-gray-50 rounded-xl max-h-48 flex items-center justify-center">
                  <img src={fileBase64} alt="File preview" className="max-h-40 object-contain rounded" />
                </div>
              )}

              <textarea
                value={fileBase64}
                readOnly
                rows={6}
                className="w-full p-3 font-mono text-xs text-text-secondary bg-gray-50 border border-border rounded-xl outline-none"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
