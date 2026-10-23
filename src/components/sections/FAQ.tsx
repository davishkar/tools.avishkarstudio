import { useState } from 'react';
import { ChevronDown } from '../ui/DynamicIcon';

const faqs = [
  {
    q: 'Are these tools free to use?',
    a: 'Yes. All tools available on 360° Tools are free to use. The platform is built and maintained by Avishkar Studio to provide practical browser-based utilities.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. You can use any available tool without signing up, logging in, or providing personal information. Simply open a tool and start working.',
  },
  {
    q: 'How is my data handled?',
    a: 'Tools are designed to process data client-side in your browser whenever possible. We do not make claims about tools that may require server processing in the future — each tool page will clearly state its data handling policy.',
  },
  {
    q: 'Which devices and browsers are supported?',
    a: '360° Tools is built using modern web standards. The platform works best on up-to-date versions of Chrome, Firefox, Safari, and Edge on desktop, tablet, and mobile devices.',
  },
  {
    q: 'When will more tools be available?',
    a: 'We are actively developing new tools. Each tool listed as "Coming Soon" is on our roadmap. You can also suggest new tools using the form on this website.',
  },
  {
    q: 'Can I suggest a new tool?',
    a: 'Absolutely. Use the "Suggest a Tool" section on the homepage or the dedicated page. Every suggestion is reviewed by our product team and considered for the roadmap.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto divide-y divide-border">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="py-4">
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 text-left py-2 group cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-text-primary group-hover:text-brand-700 transition-colors">
                {faq.q}
              </span>
              <ChevronDown
                size={18}
                className={`text-text-muted shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-sm text-text-secondary leading-relaxed pb-2">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
