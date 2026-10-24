import { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, RefreshCw, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { formatBytes, downloadBlob } from '../../utils/fileHelpers';
import Button from '../../components/Button';

export default function ImageCompressor() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [compressedUrl, setCompressedUrl] = useState('');
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState('image/jpeg');
  const [isCompressing, setIsCompressing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const imageElementRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);

    // Revoke previous URLs
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);

    const url = URL.createObjectURL(selectedFile);
    setOriginalUrl(url);

    // Load image into HTML Image object for canvas compression
    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageElementRef.current = img;
      compressImage(img, quality, format);
    };
  };

  const compressImage = useCallback((img, currentQuality, currentFormat) => {
    if (!img) return;
    setIsCompressing(true);

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsCompressing(false);
      return;
    }

    // For JPEG, fill transparent background with white
    if (currentFormat === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        setIsCompressing(false);
        if (!blob) return;

        setCompressedBlob(blob);
        if (compressedUrl) URL.revokeObjectURL(compressedUrl);
        setCompressedUrl(URL.createObjectURL(blob));
      },
      currentFormat,
      currentQuality / 100
    );
  }, [compressedUrl]);

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    if (imageElementRef.current) {
      compressImage(imageElementRef.current, newQuality, format);
    }
  };

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
    if (imageElementRef.current) {
      compressImage(imageElementRef.current, quality, newFormat);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob) return;
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
    const baseName = file ? file.name.substring(0, file.name.lastIndexOf('.')) || 'image' : 'image';
    downloadBlob(compressedBlob, `${baseName}-compressed.${ext}`);
  };

  const handleReset = () => {
    setFile(null);
    setOriginalUrl('');
    setCompressedUrl('');
    setCompressedBlob(null);
    imageElementRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const savingsPercent = originalSize && compressedBlob
    ? Math.max(0, Math.round(((originalSize - compressedBlob.size) / originalSize) * 100))
    : 0;

  return (
    <div className="space-y-8">
      {!file ? (
        /* Upload Dropzone */
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
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          />
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center shadow-xs">
            <Upload size={32} />
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Click to upload or drag and drop image
          </h3>
          <p className="text-sm text-text-secondary max-w-sm mx-auto mb-4">
            Supports JPEG, PNG, and WebP. Processed 100% inside your browser for maximum privacy.
          </p>
          <span className="inline-block px-4 py-2 bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-xs">
            Browse Image
          </span>
        </div>
      ) : (
        /* Compression Controls & Preview */
        <div className="space-y-6">
          {/* Settings Bar */}
          <div className="p-6 bg-white rounded-2xl border border-border shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Quality Slider */}
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-text-primary">
                  Compression Quality: <span className="text-brand-700 font-bold">{quality}%</span>
                </label>
                <span className="text-xs text-text-muted">
                  {quality > 85 ? 'High Quality' : quality > 60 ? 'Balanced' : 'High Compression'}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={quality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                className="w-full accent-brand-700 cursor-pointer"
              />
            </div>

            {/* Format Selection */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Output Format
              </label>
              <select
                value={format}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-sm font-medium text-text-primary outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                <option value="image/jpeg">JPEG (.jpg)</option>
                <option value="image/webp">WebP (.webp)</option>
                <option value="image/png">PNG (.png)</option>
              </select>
            </div>
          </div>

          {/* Size Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-border">
              <span className="text-xs text-text-muted font-medium">Original Size</span>
              <p className="text-xl font-bold text-text-primary mt-1">{formatBytes(originalSize)}</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-border">
              <span className="text-xs text-text-muted font-medium">Compressed Size</span>
              <p className="text-xl font-bold text-brand-700 mt-1">
                {isCompressing ? 'Calculating...' : compressedBlob ? formatBytes(compressedBlob.size) : '—'}
              </p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-xs text-emerald-800 font-medium">Space Saved</span>
              <p className="text-xl font-bold text-emerald-600 mt-1">
                {isCompressing ? '...' : `-${savingsPercent}%`}
              </p>
            </div>
          </div>

          {/* Side by Side Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-2xl border border-border">
              <span className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Original Preview
              </span>
              <div className="aspect-video w-full rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-border-light">
                {originalUrl && (
                  <img
                    src={originalUrl}
                    alt="Original preview"
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Compressed Preview
                </span>
                {isCompressing && (
                  <span className="text-xs text-brand-600 animate-pulse font-medium">
                    Optimizing...
                  </span>
                )}
              </div>
              <div className="aspect-video w-full rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden border border-border-light">
                {compressedUrl ? (
                  <img
                    src={compressedUrl}
                    alt="Compressed preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-text-muted">Generating preview...</span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RefreshCw size={16} />
              Choose Another Image
            </Button>

            <Button
              variant="primary"
              onClick={handleDownload}
              disabled={isCompressing || !compressedBlob}
              className="gap-2 px-8 py-3.5 shadow-md hover:shadow-lg"
            >
              <Download size={18} />
              Download Compressed Image ({compressedBlob ? formatBytes(compressedBlob.size) : ''})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
