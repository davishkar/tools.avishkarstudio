import { useState } from 'react';
import { Calculator, ArrowRight, Percent, Check } from 'lucide-react';
import { formatNumber } from '../../utils/formatting';
import Button from '../../components/Button';

export default function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState('of'); // 'of' | 'isWhat' | 'change'

  // Mode 1: What is X% of Y?
  const [m1Percent, setM1Percent] = useState('25');
  const [m1Total, setM1Total] = useState('400');

  // Mode 2: X is what % of Y?
  const [m2Part, setM2Part] = useState('75');
  const [m2Total, setM2Total] = useState('300');

  // Mode 3: Change from X to Y
  const [m3Initial, setM3Initial] = useState('200');
  const [m3Final, setM3Final] = useState('260');

  // Calculation 1
  const m1Result = ((parseFloat(m1Percent) || 0) / 100) * (parseFloat(m1Total) || 0);

  // Calculation 2
  const m2Result = (parseFloat(m2Total) || 0) !== 0
    ? ((parseFloat(m2Part) || 0) / (parseFloat(m2Total) || 1)) * 100
    : 0;

  // Calculation 3
  const initVal = parseFloat(m3Initial) || 0;
  const finalVal = parseFloat(m3Final) || 0;
  const m3Diff = finalVal - initVal;
  const m3Result = initVal !== 0 ? (m3Diff / Math.abs(initVal)) * 100 : 0;
  const isIncrease = m3Diff >= 0;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveTab('of')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTab === 'of'
              ? 'bg-brand-50 border-brand-300 text-brand-900 shadow-xs ring-2 ring-brand-100'
              : 'bg-white border-border text-text-secondary hover:bg-gray-50'
          }`}
        >
          <span className="block text-xs font-bold uppercase tracking-wider text-brand-700">Formula 1</span>
          <span className="block text-sm font-bold text-text-primary mt-1">What is X% of Y?</span>
          <span className="block text-xs text-text-muted mt-0.5">Discounts, tax amounts</span>
        </button>

        <button
          onClick={() => setActiveTab('isWhat')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTab === 'isWhat'
              ? 'bg-brand-50 border-brand-300 text-brand-900 shadow-xs ring-2 ring-brand-100'
              : 'bg-white border-border text-text-secondary hover:bg-gray-50'
          }`}
        >
          <span className="block text-xs font-bold uppercase tracking-wider text-brand-700">Formula 2</span>
          <span className="block text-sm font-bold text-text-primary mt-1">X is what % of Y?</span>
          <span className="block text-xs text-text-muted mt-0.5">Test scores, portions</span>
        </button>

        <button
          onClick={() => setActiveTab('change')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            activeTab === 'change'
              ? 'bg-brand-50 border-brand-300 text-brand-900 shadow-xs ring-2 ring-brand-100'
              : 'bg-white border-border text-text-secondary hover:bg-gray-50'
          }`}
        >
          <span className="block text-xs font-bold uppercase tracking-wider text-brand-700">Formula 3</span>
          <span className="block text-sm font-bold text-text-primary mt-1">% Increase / Decrease</span>
          <span className="block text-xs text-text-muted mt-0.5">Growth, price differences</span>
        </button>
      </div>

      {/* Active Form */}
      <div className="bg-white rounded-2xl border border-border p-8 shadow-xs">
        {activeTab === 'of' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-text-primary">
              Calculate: What is <span className="text-brand-700">{m1Percent}%</span> of <span className="text-brand-700">{m1Total}</span>?
            </h3>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-secondary">What is</span>
                <div className="relative">
                  <input
                    type="number"
                    value={m1Percent}
                    onChange={(e) => setM1Percent(e.target.value)}
                    className="w-24 px-3 py-2 bg-gray-50 border border-border rounded-xl font-bold text-base text-center outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted font-bold">%</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-secondary">of</span>
                <input
                  type="number"
                  value={m1Total}
                  onChange={(e) => setM1Total(e.target.value)}
                  className="w-32 px-3 py-2 bg-gray-50 border border-border rounded-xl font-bold text-base text-center outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <span className="text-lg font-bold text-text-muted">=</span>

              <div className="px-5 py-2.5 bg-brand-50 rounded-xl border border-brand-200">
                <span className="text-2xl font-extrabold text-brand-700">
                  {formatNumber(m1Result, 2)}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl text-xs text-text-secondary">
              <strong>Formula:</strong> ({m1Percent} ÷ 100) × {m1Total} = {formatNumber(m1Result, 2)}
            </div>
          </div>
        )}

        {activeTab === 'isWhat' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-text-primary">
              Calculate: <span className="text-brand-700">{m2Part}</span> is what percentage of <span className="text-brand-700">{m2Total}</span>?
            </h3>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={m2Part}
                  onChange={(e) => setM2Part(e.target.value)}
                  className="w-28 px-3 py-2 bg-gray-50 border border-border rounded-xl font-bold text-base text-center outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
                <span className="text-sm font-medium text-text-secondary">is what % of</span>
              </div>

              <input
                type="number"
                value={m2Total}
                onChange={(e) => setM2Total(e.target.value)}
                className="w-32 px-3 py-2 bg-gray-50 border border-border rounded-xl font-bold text-base text-center outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
              />

              <span className="text-lg font-bold text-text-muted">=</span>

              <div className="px-5 py-2.5 bg-brand-50 rounded-xl border border-brand-200">
                <span className="text-2xl font-extrabold text-brand-700">
                  {formatNumber(m2Result, 2)}%
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl text-xs text-text-secondary">
              <strong>Formula:</strong> ({m2Part} ÷ {m2Total}) × 100 = {formatNumber(m2Result, 2)}%
            </div>
          </div>
        )}

        {activeTab === 'change' && (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-text-primary">
              Calculate percentage change from <span className="text-brand-700">{m3Initial}</span> to <span className="text-brand-700">{m3Final}</span>
            </h3>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-secondary">From</span>
                <input
                  type="number"
                  value={m3Initial}
                  onChange={(e) => setM3Initial(e.target.value)}
                  className="w-28 px-3 py-2 bg-gray-50 border border-border rounded-xl font-bold text-base text-center outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-secondary">to</span>
                <input
                  type="number"
                  value={m3Final}
                  onChange={(e) => setM3Final(e.target.value)}
                  className="w-28 px-3 py-2 bg-gray-50 border border-border rounded-xl font-bold text-base text-center outline-none focus:bg-white focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <span className="text-lg font-bold text-text-muted">=</span>

              <div className={`px-5 py-2.5 rounded-xl border ${isIncrease ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                <span className="text-2xl font-extrabold">
                  {isIncrease ? '+' : ''}{formatNumber(m3Result, 2)}% {isIncrease ? 'Increase' : 'Decrease'}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl text-xs text-text-secondary">
              <strong>Formula:</strong> (({m3Final} - {m3Initial}) ÷ {m3Initial}) × 100 = {formatNumber(m3Result, 2)}%
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
