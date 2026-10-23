export type ToolStatus = 'available' | 'coming-soon' | 'beta';

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  categoryId: string;
  icon: string;
  status: ToolStatus;
  featured: boolean;
  keywords: string[];
}

export const tools: Tool[] = [
  // PDF & Documents
  {
    id: 'pdf-merge-split',
    slug: 'pdf-merge-split',
    name: 'PDF Merge & Split',
    description:
      'Reorder, stitch multiple documents together, or extract target page ranges.',
    longDescription:
      'Reorder, stitch multiple documents together, or extract target page ranges without uploading files to remote servers. All processing happens directly in your browser.',
    categoryId: 'pdf-documents',
    icon: 'FilePlus2',
    status: 'coming-soon',
    featured: true,
    keywords: ['pdf', 'merge', 'split', 'combine', 'extract', 'pages'],
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter & Readability',
    description:
      'Deep text metric analytics with Flesch-Kincaid grade levels, reading time, and keyword frequency.',
    longDescription:
      'Deep text metric analytics, calculating Flesch-Kincaid grade levels, character counts, reading time, and keyword frequency. Paste any text and get instant insights.',
    categoryId: 'pdf-documents',
    icon: 'Type',
    status: 'coming-soon',
    featured: false,
    keywords: ['word', 'count', 'readability', 'text', 'analytics', 'flesch'],
  },
  {
    id: 'pdf-compressor',
    slug: 'pdf-compressor',
    name: 'PDF Compressor',
    description:
      'Reduce PDF file size while preserving quality and text clarity.',
    longDescription:
      'Compress PDFs directly in your browser. Reduce file sizes for email attachments and uploads while preserving text clarity and image quality.',
    categoryId: 'pdf-documents',
    icon: 'FileDown',
    status: 'coming-soon',
    featured: false,
    keywords: ['pdf', 'compress', 'reduce', 'size', 'shrink'],
  },

  // Developer Tools
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    description:
      'Interactive collapsible tree, strict syntax diagnostics, and instant minification or indentation.',
    longDescription:
      'Interactive collapsible node tree, strict syntax error diagnostics, and instant clean minification or indentation. Paste messy JSON and get clean, validated output instantly.',
    categoryId: 'developer-tools',
    icon: 'Braces',
    status: 'coming-soon',
    featured: true,
    keywords: ['json', 'format', 'validate', 'minify', 'prettify', 'tree'],
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    name: 'Regex Tester & Cheat Sheet',
    description:
      'Live expression test environment with real-time match highlighting and capture groups.',
    longDescription:
      'Live expression test environment with real-time match highlighting, capture groups breakdown, and instant preset patterns. Test and debug regular expressions with ease.',
    categoryId: 'developer-tools',
    icon: 'Regex',
    status: 'coming-soon',
    featured: true,
    keywords: ['regex', 'regular', 'expression', 'test', 'match', 'pattern'],
  },
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    description:
      'Batch cryptographically secure RFC-4122 v4 & v1 identifiers with format toggles.',
    longDescription:
      'Batch cryptographically secure RFC-4122 v4 & v1 identifiers with format toggles, uppercase flags, and one-click copy. Generate unique identifiers for your applications.',
    categoryId: 'developer-tools',
    icon: 'Fingerprint',
    status: 'coming-soon',
    featured: false,
    keywords: ['uuid', 'guid', 'generate', 'unique', 'identifier', 'rfc4122'],
  },

  // SEO & Website
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'Meta Tag & Open Graph Generator',
    description:
      'Craft perfect social card previews for Twitter/X, LinkedIn, and Facebook.',
    longDescription:
      'Craft perfect social card previews for Twitter/X, LinkedIn, and Facebook with automatic HTML markup generation. Preview how your pages will look when shared.',
    categoryId: 'seo-website',
    icon: 'Tags',
    status: 'coming-soon',
    featured: true,
    keywords: ['meta', 'tag', 'open graph', 'og', 'twitter', 'seo', 'social'],
  },
  {
    id: 'sitemap-validator',
    slug: 'sitemap-validator',
    name: 'Sitemap Validator',
    description:
      'Verify XML sitemaps against official schemas, check for dead links and missing timestamps.',
    longDescription:
      'Verify XML sitemaps against official protocol schemas, check for dead links, missing lastmod timestamps, and excessive file sizes. Ensure search engines can crawl your site properly.',
    categoryId: 'seo-website',
    icon: 'Map',
    status: 'coming-soon',
    featured: false,
    keywords: ['sitemap', 'xml', 'validate', 'seo', 'crawl', 'links'],
  },

  // Image & Design
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor & WebP Converter',
    description:
      'Shrink image file weights up to 80% without visible quality loss directly in the browser.',
    longDescription:
      'Shrink image file weights up to 80% without visible quality loss directly in the browser via WebAssembly canvas decoders. Convert to WebP for optimal web performance.',
    categoryId: 'image-design',
    icon: 'ImageDown',
    status: 'coming-soon',
    featured: true,
    keywords: ['image', 'compress', 'webp', 'convert', 'optimize', 'shrink'],
  },
  {
    id: 'favicon-generator',
    slug: 'favicon-generator',
    name: 'Favicon & App Icon Generator',
    description:
      'Turn any square logo into a full multi-resolution package including .ico and touch icons.',
    longDescription:
      'Turn any square logo into a full multi-resolution package including .ico, iOS home screen touch icons, and webmanifest bundles. Upload once, download everything.',
    categoryId: 'image-design',
    icon: 'AppWindow',
    status: 'coming-soon',
    featured: false,
    keywords: ['favicon', 'icon', 'app', 'generate', 'ico', 'touch'],
  },

  // Everyday Utilities
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    name: 'Unit & Currency Converter',
    description:
      'Precision conversion matrix for metric/imperial measures and cached forex currencies.',
    longDescription:
      'Precision conversion matrix for scientific metric/imperial measures alongside cached forex fiat currencies. Convert length, weight, temperature, volume, and more.',
    categoryId: 'everyday-utilities',
    icon: 'ArrowLeftRight',
    status: 'coming-soon',
    featured: false,
    keywords: ['unit', 'convert', 'currency', 'metric', 'imperial', 'forex'],
  },
  {
    id: 'qr-code-maker',
    slug: 'qr-code-maker',
    name: 'Quick QR Code Maker',
    description:
      'Generate custom vector QR codes for Wi-Fi, vCards, or URLs with embedded brand icons.',
    longDescription:
      'Generate custom vector QR codes for Wi-Fi configurations, vCards, or web URLs with embedded center brand icons and SVG export. Create scannable codes instantly.',
    categoryId: 'everyday-utilities',
    icon: 'QrCode',
    status: 'coming-soon',
    featured: true,
    keywords: ['qr', 'code', 'generate', 'wifi', 'vcard', 'url', 'svg'],
  },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((t) => t.categoryId === categoryId);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q))
  );
}
