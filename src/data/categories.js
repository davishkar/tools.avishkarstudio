export const categories = [
  {
    id: 'pdf',
    slug: 'pdf-document-tools',
    name: 'PDF & Document Tools',
    shortName: 'PDF & Docs',
    description: 'Compress, merge, split, convert, and manage PDF documents directly in your browser.',
    icon: 'FileText',
    color: '#DC2626',
    colorLight: '#FEF2F2',
    colorBorder: '#FECACA',
  },
  {
    id: 'image',
    slug: 'image-design-tools',
    name: 'Image & Design Tools',
    shortName: 'Image & Design',
    description: 'Compress, resize, convert formats, and optimize images for web and print.',
    icon: 'Image',
    color: '#EA580C',
    colorLight: '#FFF7ED',
    colorBorder: '#FED7AA',
  },
  {
    id: 'developer',
    slug: 'developer-tools',
    name: 'Developer Tools',
    shortName: 'Dev Tools',
    description: 'Format, validate, test, encode, decode, and debug code snippets effortlessly.',
    icon: 'Code2',
    color: '#2563EB',
    colorLight: '#EFF6FF',
    colorBorder: '#BFDBFE',
  },
  {
    id: 'text',
    slug: 'text-tools',
    name: 'Text & Content Tools',
    shortName: 'Text & Content',
    description: 'Count words, convert letter cases, clean text, and format copy with precision.',
    icon: 'Type',
    color: '#7C3AED',
    colorLight: '#F5F3FF',
    colorBorder: '#DDD6FE',
  },
  {
    id: 'calculators',
    slug: 'calculators',
    name: 'Calculators & Finance',
    shortName: 'Calculators',
    description: 'Compute GST, percentages, interest, and everyday business math with zero fuss.',
    icon: 'Wrench',
    color: '#059669',
    colorLight: '#ECFDF5',
    colorBorder: '#A7F3D0',
  },
  {
    id: 'seo',
    slug: 'seo-web-tools',
    name: 'SEO & Web Tools',
    shortName: 'SEO & Web',
    description: 'Generate meta tags, analyze URLs, preview social snippets, and audit web assets.',
    icon: 'Globe',
    color: '#0891B2',
    colorLight: '#ECFEFF',
    colorBorder: '#A5F3FC',
  },
];

export function getCategoryById(id) {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
