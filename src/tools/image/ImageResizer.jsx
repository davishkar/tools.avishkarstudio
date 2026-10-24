import { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, Lock, Unlock, Image as ImageIcon } from 'lucide-react';
import { formatBytes, downloadBlob } from '../../utils/fileHelpers';
import Button from '../../components/Button';

export default function ImageResizer() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  const [format, setFormat] = useState('image/png');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const imageElementRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
    setFile(selectedFile);

    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageElementRef.current = img;
      setOriginalWidth(img.naturalWidth || img.width);
      setOriginalHeight(img.naturalHeight || img.height);
      setWidth(img.naturalWidth || img.width);
      setHeight(img.naturalHeight || img.height);
    };
  };

  const handleWidthChange = (val) => {
    const num = Math.max(1, Math.min(10000, Number(val) || 0));
    setWidth(num);
    if (aspectRatioLocked && originalWidth > 0) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(num * ratio));
    }
  };

  const handleHeightChange = (val) => {
    const num = Math.max(1, Math.min(10000, Number(val) || 0));
    setHeight(num);
    if (aspectRatioLocked && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(num * ratio));
    }
  };

  const handlePercentageScale = (percent) => {
    if (originalWidth > 0 && originalHeight > 0) {
      const factor = percent / 100;
      setWidth(Math.round(originalWidth * factor));
      setHeight(Math.round(originalHeight * factor));
    }
  };

  const applyPreset = (w, h) => {
    setWidth(w);
    setHeight(h);
    setAspectRatioLocked(false);
  };

  const handleDownload = () => {
    if (!imageElementRef.current || width <= 0 || height <= 0) return;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Smooth image rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (format === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(imageElementRef.current, 0, 0, width, height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
        const baseName = file ? file.name.substring(0, file.name.lastIndexOf('.')) || 'image' : 'image';
        downloadBlob(blob, `${baseName}-${width}x${height}.${ext}`);
      },
      format,
      0.92
    );
  };

  const handleReset = () => {
    setFile(null);
    setImageUrl('');
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth(0);
    setHeight(0);
    imageElementRef.current = null;
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
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          />
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center shadow-xs">
            <Upload size={32} />
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2">
            Upload Image to Resize
          </h3>
          <p className="text-sm text-text-secondary max-w-sm mx-auto mb-4">
            Supports PNG, JPEG, SVG, WebP. High-quality client-side rendering.
          </p>
          <span className="inline-block px-4 py-2 bg-brand-700 text-white text-xs font-semibold rounded-xl shadow-xs">
            Browse Image
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Container */}
          <div className="p-6 bg-white rounded-2xl border border-border shadow-xs space-y-6">
            {/* Dimensions Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Width (px)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-border rounded-xl text-sm font-semibold text-text-primary outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Height (px)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-border rounded-xl text-sm font-semibold text-text-primary outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Aspect Ratio
                </label>
                <button
                  type="button"
                  onClick={() => setAspectRatioLocked(!aspectRatioLocked)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${
                    aspectRatioLocked
                      ? 'bg-brand-50 text-brand-700 border-brand-200'
                      : 'bg-white text-text-secondary border-border'
                  }`}
                >
                  {aspectRatioLocked ? <Lock size={16} /> : <Unlock size={16} />}
                  {aspectRatioLocked ? 'Locked' : 'Unlocked'}
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Output Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-sm font-medium text-text-primary outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
                >
                  <option value="image/png">PNG (.png)</option>
                  <option value="image/jpeg">JPEG (.jpg)</option>
                  <option value="image/webp">WebP (.webp)</option>
                </select>
              </div>
            </div>

            {/* Scale Presets */}
            <div>
              <span className="block text-xs font-semibold text-text-muted mb-2">
                Quick Percentage Scale:
              </span>
              <div className="flex flex-wrap gap-2">
                {[25, 50, 75, 100, 150, 200].map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePercentageScale(p)}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>

            {/* Standard Aspect Presets */}
            <div>
              <span className="block text-xs font-semibold text-text-muted mb-2">
                Standard Dimensions:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Square (1080x1080)', w: 1080, h: 1080 },
                  { name: 'Avatar (400x400)', w: 400, h: 400 },
                  { name: 'Full HD (1920x1080)', w: 1920, h: 1080 },
                  { name: 'Twitter / X (1200x675)', w: 1200, h: 675 },
                  { name: 'Icon (64x64)', w: 64, h: 64 },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => applyPreset(item.w, item.h)}
                    className="px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image Preview */}
          <div className="p-6 bg-white rounded-2xl border border-border shadow-xs text-center">
            <div className="flex items-center justify-between text-xs text-text-muted mb-4">
              <span>Original: {originalWidth} × {originalHeight} px ({formatBytes(file.size)})</span>
              <span className="font-semibold text-brand-700">Target: {width} × {height} px</span>
            </div>

            <div className="max-h-[420px] w-full flex items-center justify-center bg-gray-50 rounded-xl p-4 overflow-hidden border border-border-light">
              <img
                src={imageUrl}
                alt="Resize target preview"
                className="max-h-[380px] max-w-full object-contain"
                style={{
                  width: width > 0 ? 'auto' : undefined,
                }}
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RefreshCw size={16} />
              Reset & Choose New Image
            </Button>

            <Button
              variant="primary"
              onClick={handleDownload}
              className="gap-2 px-8 py-3.5 shadow-md hover:shadow-lg"
            >
              <Download size={18} />
              Download Resized Image ({width}×{height})
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
