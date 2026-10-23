import { Search, Upload, Download } from '../ui/DynamicIcon';

const steps = [
  {
    icon: Search,
    num: '01',
    title: 'Find the tool you need',
    description:
      'Search or browse our centralized catalog. No mandatory account logins, credit cards, or desktop downloads required.',
  },
  {
    icon: Upload,
    num: '02',
    title: 'Enter input or upload',
    description:
      'Fast, client-side browser processing designed for speed and clarity. Keep your data in your own browser.',
  },
  {
    icon: Download,
    num: '03',
    title: 'Export your result',
    description:
      'Copy clean syntax, download converted packages, or share output links instantly with zero added watermarks.',
  },
];

export default function HowItWorks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      {/* Connector line (desktop only) */}
      <div className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200" />

      {steps.map((step, idx) => {
        const Icon = step.icon;
        return (
          <div
            key={idx}
            className={`relative flex flex-col items-center text-center animate-fade-in-up stagger-${idx + 1}`}
          >
            {/* Step Number + Icon */}
            <div className="relative mb-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center relative z-10 border border-brand-100">
                <Icon size={24} className="text-brand-700" />
              </div>
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-700 text-white text-xs font-bold flex items-center justify-center z-20 shadow-md">
                {step.num}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-base font-bold text-text-primary mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
