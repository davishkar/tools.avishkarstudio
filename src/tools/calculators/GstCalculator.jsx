import { useState, useMemo } from 'react';
import { Copy, Check, Calculator, ArrowRight } from 'lucide-react';
import { useClipboard } from '../../hooks/useClipboard';
import { formatCurrency, formatNumber } from '../../utils/formatting';
import Button from '../../components/Button';

export default function GstCalculator() {
  const [amount, setAmount] = useState('10000');
  const [gstType, setGstType] = useState('exclusive'); // 'exclusive' (add) | 'inclusive' (remove)
  const [rate, setRate] = useState(18);
  const [customRate, setCustomRate] = useState('');
  const [isInterState, setIsInterState] = useState(false); // true: IGST, false: CGST + SGST

  const { copied, copy } = useClipboard();

  const currentRate = customRate !== '' ? Number(customRate) || 0 : rate;

  const result = useMemo(() => {
    const val = parseFloat(amount) || 0;
    const r = currentRate / 100;

    let net = 0;
    let gstAmount = 0;
    let total = 0;

    if (gstType === 'exclusive') {
      // Add GST to base amount
      net = val;
      gstAmount = val * r;
      total = net + gstAmount;
    } else {
      // Remove GST from gross amount: Net = Gross / (1 + r)
      total = val;
      net = val / (1 + r);
      gstAmount = total - net;
    }

    const cgst = isInterState ? 0 : gstAmount / 2;
    const sgst = isInterState ? 0 : gstAmount / 2;
    const igst = isInterState ? gstAmount : 0;

    return {
      net,
      gstAmount,
      total,
      cgst,
      sgst,
      igst,
    };
  }, [amount, gstType, currentRate, isInterState]);

  const copySummary = () => {
    const summary = `GST Calculation Summary:
Original Input: ${formatCurrency(amount)} (${gstType === 'exclusive' ? 'GST Exclusive' : 'GST Inclusive'})
GST Rate: ${currentRate}%
Net Amount: ${formatCurrency(result.net)}
Total GST: ${formatCurrency(result.gstAmount)}
${isInterState ? `IGST: ${formatCurrency(result.igst)}` : `CGST: ${formatCurrency(result.cgst)} | SGST: ${formatCurrency(result.sgst)}`}
Total Gross Amount: ${formatCurrency(result.total)}`;
    copy(summary);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Inputs Form */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-border p-6 shadow-xs space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
            Amount (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-base">₹</span>
            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10,000"
              className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-border rounded-xl text-lg font-bold text-text-primary outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {/* GST Mode */}
        <div>
          <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">
            Calculation Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGstType('exclusive')}
              className={`p-3 rounded-xl border text-sm font-semibold text-center transition-all cursor-pointer ${
                gstType === 'exclusive'
                  ? 'bg-brand-50 text-brand-700 border-brand-300 shadow-xs ring-2 ring-brand-100'
                  : 'bg-white text-text-secondary border-border hover:bg-gray-50'
              }`}
            >
              Add GST (Exclusive)
              <span className="block text-[11px] font-normal text-text-muted mt-0.5">Base Price + GST</span>
            </button>
            <button
              type="button"
              onClick={() => setGstType('inclusive')}
              className={`p-3 rounded-xl border text-sm font-semibold text-center transition-all cursor-pointer ${
                gstType === 'inclusive'
                  ? 'bg-brand-50 text-brand-700 border-brand-300 shadow-xs ring-2 ring-brand-100'
                  : 'bg-white text-text-secondary border-border hover:bg-gray-50'
              }`}
            >
              Remove GST (Inclusive)
              <span className="block text-[11px] font-normal text-text-muted mt-0.5">Total already has GST</span>
            </button>
          </div>
        </div>

        {/* Rate Presets */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              GST Rate Slab (%)
            </label>
            <span className="text-xs font-bold text-brand-700">{currentRate}%</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[3, 5, 12, 18, 28].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRate(r);
                  setCustomRate('');
                }}
                className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                  rate === r && customRate === ''
                    ? 'bg-brand-700 text-white border-brand-700 shadow-xs'
                    : 'bg-gray-50 text-text-secondary border-border hover:bg-white'
                }`}
              >
                {r}%
              </button>
            ))}
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Custom"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              className={`py-2 px-1 text-xs text-center font-bold rounded-lg border outline-none ${
                customRate !== ''
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-border bg-gray-50 text-text-primary'
              }`}
            />
          </div>
        </div>

        {/* Location Toggle */}
        <div className="pt-2">
          <label className="flex items-center gap-2 text-xs font-medium text-text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={isInterState}
              onChange={(e) => setIsInterState(e.target.checked)}
              className="rounded text-brand-700 focus:ring-brand-500"
            />
            <span>Inter-State Supply (Apply IGST instead of CGST + SGST)</span>
          </label>
        </div>
      </div>

      {/* Results Breakdown */}
      <div className="lg:col-span-5 bg-gradient-to-br from-brand-900 to-brand-800 text-white rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-brand-700/60 pb-4">
          <div>
            <span className="text-xs text-brand-200 uppercase tracking-wider font-semibold">Total Invoice Amount</span>
            <p className="text-3xl font-extrabold text-white mt-1">
              {formatCurrency(result.total)}
            </p>
          </div>
          <span className="px-2.5 py-1 bg-brand-700/80 rounded-lg text-xs font-semibold text-brand-200">
            {currentRate}% GST
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between text-brand-100">
            <span>Net (Taxable) Amount:</span>
            <span className="font-semibold text-white">{formatCurrency(result.net)}</span>
          </div>

          <div className="flex items-center justify-between text-brand-100">
            <span>Total GST Amount:</span>
            <span className="font-bold text-brand-200">+{formatCurrency(result.gstAmount)}</span>
          </div>

          {/* Breakdown items */}
          <div className="pt-3 border-t border-brand-700/40 space-y-2 text-xs text-brand-200">
            {!isInterState ? (
              <>
                <div className="flex items-center justify-between">
                  <span>CGST ({(currentRate / 2).toFixed(1)}%):</span>
                  <span>{formatCurrency(result.cgst)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SGST ({(currentRate / 2).toFixed(1)}%):</span>
                  <span>{formatCurrency(result.sgst)}</span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <span>IGST ({currentRate}%):</span>
                <span>{formatCurrency(result.igst)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-brand-700/60">
          <button
            onClick={copySummary}
            className="w-full flex items-center justify-center gap-2 py-3 bg-white text-brand-900 hover:bg-brand-50 text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            {copied ? 'Summary Copied to Clipboard!' : 'Copy Calculation Breakdown'}
          </button>
        </div>
      </div>
    </div>
  );
}
