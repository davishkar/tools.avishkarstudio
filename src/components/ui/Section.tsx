import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClass?: string;
}

export default function Section({
  children,
  id,
  className = '',
  containerClass = '',
}: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${containerClass}`}>
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  tag?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  tag,
  title,
  description,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`text-center max-w-2xl mx-auto mb-14 ${className}`}>
      {tag && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase text-brand-700 bg-brand-50 rounded-full">
          {tag}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
