export interface Category {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // accent color for the category
  colorLight: string; // light variant for backgrounds
  toolCount: number;
}

export const categories: Category[] = [
  {
    id: 'pdf-documents',
    slug: 'pdf-documents',
    name: 'PDF & Documents',
    shortName: 'PDF & Docs',
    description:
      'Merge, split and compress PDFs, convert files and count words without exposing private document contents.',
    icon: 'FileText',
    color: '#0F766E',
    colorLight: '#F0FDFA',
    toolCount: 3,
  },
  {
    id: 'developer-tools',
    slug: 'developer-tools',
    name: 'Developer Tools',
    shortName: 'Dev Tools',
    description:
      'Format JSON, encode text, test regular expressions and generate UUIDs for production software workflows.',
    icon: 'Code2',
    color: '#7C3AED',
    colorLight: '#F5F3FF',
    toolCount: 3,
  },
  {
    id: 'seo-website',
    slug: 'seo-website',
    name: 'SEO & Website',
    shortName: 'SEO & Web',
    description:
      'Create meta tags, check sitemaps and prepare structured JSON-LD data for search crawlers and social platforms.',
    icon: 'Globe',
    color: '#2563EB',
    colorLight: '#EFF6FF',
    toolCount: 2,
  },
  {
    id: 'image-design',
    slug: 'image-design',
    name: 'Image & Design',
    shortName: 'Image & Design',
    description:
      'Resize and compress images, choose colors and create favicons with direct hardware-accelerated canvas rendering.',
    icon: 'Image',
    color: '#DB2777',
    colorLight: '#FDF2F8',
    toolCount: 2,
  },
  {
    id: 'networking-it',
    slug: 'networking-it',
    name: 'Networking & IT',
    shortName: 'Network & IT',
    description:
      'DNS lookups, port scanners, IP info tools and network diagnostic utilities for IT professionals.',
    icon: 'Network',
    color: '#EA580C',
    colorLight: '#FFF7ED',
    toolCount: 0,
  },
  {
    id: 'everyday-utilities',
    slug: 'everyday-utilities',
    name: 'Everyday Utilities',
    shortName: 'Utilities',
    description:
      'Quick calculators, converters, QR codes and text helpers created to solve the little problems that disrupt daily focus.',
    icon: 'Wrench',
    color: '#0891B2',
    colorLight: '#ECFEFF',
    toolCount: 2,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
