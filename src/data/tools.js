export const tools = [
  // --- IMAGE TOOLS ---
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor',
    shortDescription: 'Compress JPEG, PNG, and WebP images client-side with instant quality preview.',
    description: 'Reduce image file sizes directly in your browser without sacrificing visual quality. No uploads to external servers — 100% private and instant.',
    categoryId: 'image',
    icon: 'ImageDown',
    status: 'available',
    featured: true,
    tags: ['image', 'compress', 'optimize', 'jpg', 'png', 'webp', 'size'],
    features: [
      'Interactive quality slider with real-time file size estimation',
      'Side-by-side original vs. compressed preview',
      'Supports PNG, JPEG, and WebP formats',
      '100% client-side processing using HTML5 Canvas',
    ],
    howToUse: [
      'Drop your image or browse to select a file from your computer.',
      'Adjust the quality slider to find your desired balance of size and visual fidelity.',
      'Review the savings percentage and before/after comparison.',
      'Click "Download Compressed Image" to save your optimized file.',
    ],
  },
  {
    id: 'image-resizer',
    slug: 'image-resizer',
    name: 'Image Resizer',
    shortDescription: 'Resize photos by exact pixel dimensions or percentage with aspect ratio lock.',
    description: 'Quickly resize pictures for social media banners, website assets, or email attachments with smooth interpolation and format conversion.',
    categoryId: 'image',
    icon: 'Image',
    status: 'available',
    featured: true,
    tags: ['image', 'resize', 'scale', 'dimensions', 'crop', 'aspect-ratio'],
    features: [
      'Lock or unlock original aspect ratio',
      'Preset dimensions (Avatar, Instagram Post, Full HD, Thumbnail)',
      'Convert format on export (PNG, JPEG, WebP)',
      'Instant high-resolution download',
    ],
    howToUse: [
      'Upload an image from your device.',
      'Enter new width and height in pixels or select a percentage scale.',
      'Choose output format and click Resize.',
      'Download your resized asset immediately.',
    ],
  },

  // --- PDF TOOLS ---
  {
    id: 'pdf-merge',
    slug: 'pdf-merge',
    name: 'PDF Merge',
    shortDescription: 'Combine multiple PDF documents into a single organized file in seconds.',
    description: 'Merge several PDF files into one clean document right in your browser. Reorder files via drag and drop without uploading sensitive documents to any cloud server.',
    categoryId: 'pdf',
    icon: 'FilePlus2',
    status: 'available',
    featured: true,
    tags: ['pdf', 'merge', 'combine', 'join', 'documents'],
    features: [
      'Client-side merging powered by pdf-lib',
      'Drag and drop reordering of input files',
      'Page count inspection before merging',
      'Zero server upload — strict document confidentiality',
    ],
    howToUse: [
      'Select or drag multiple PDF files into the upload area.',
      'Arrange them in the order you want them to appear in the combined file.',
      'Click "Merge PDFs" to generate the single combined document.',
      'Download your merged PDF file.',
    ],
  },
  {
    id: 'pdf-split',
    slug: 'pdf-split',
    name: 'PDF Split',
    shortDescription: 'Extract specific pages or page ranges from any PDF document.',
    description: 'Split large PDF documents into smaller parts or extract just the pages you need. Fast, secure, and completed entirely within your browser.',
    categoryId: 'pdf',
    icon: 'FileDown',
    status: 'available',
    featured: false,
    tags: ['pdf', 'split', 'extract', 'pages', 'slice'],
    features: [
      'Split by flexible page ranges (e.g. 1-3, 5, 8-10)',
      'Client-side page extraction using pdf-lib',
      'Displays total page count and file details',
      'Safe and confidential for personal/legal docs',
    ],
    howToUse: [
      'Upload the PDF file you wish to split.',
      'Enter the target page ranges you want to extract.',
      'Click "Extract Pages" to build the new tailored PDF.',
      'Save the extracted document to your device.',
    ],
  },

  // --- DEVELOPER TOOLS ---
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortDescription: 'Beautify, minify, validate, and inspect JSON with syntax highlighting.',
    description: 'Clean up minified or messy JSON data, validate its syntax, pinpoint parsing errors, and format with customizable 2 or 4 space indentation.',
    categoryId: 'developer',
    icon: 'Braces',
    status: 'available',
    featured: true,
    tags: ['json', 'formatter', 'beautifier', 'validator', 'developer', 'minify'],
    features: [
      'Format (Beautify) with 2, 4 spaces or tabs',
      'Minify / compact JSON for network payloads',
      'Precise syntax error detection with error message',
      'Copy to clipboard or download as .json file',
    ],
    howToUse: [
      'Paste your raw JSON into the input editor or load sample JSON.',
      'Click "Format JSON" to beautify or "Minify" to condense.',
      'View parsed structure, character count, and keys summary.',
      'Copy the formatted output with one click.',
    ],
  },
  {
    id: 'base64-tool',
    slug: 'base64-tool',
    name: 'Base64 Encoder & Decoder',
    shortDescription: 'Encode and decode plain text or binary files into Base64 strings.',
    description: 'Convert text or files to Base64 data strings and decode Base64 back into readable UTF-8 text or downloadable binary files with URL-safe option.',
    categoryId: 'developer',
    icon: 'Code2',
    status: 'available',
    featured: true,
    tags: ['base64', 'encode', 'decode', 'binary', 'string', 'developer'],
    features: [
      'Bidirectional Text Encoding & Decoding',
      'File to Base64 Data URL converter (Images, Documents)',
      'URL-safe encoding toggle',
      'One-click copy and live character counts',
    ],
    howToUse: [
      'Choose between Text mode or File mode.',
      'Select Encode or Decode tab.',
      'Enter your text or upload a file.',
      'Copy the generated Base64 output or download the decoded file.',
    ],
  },

  // --- TEXT TOOLS ---
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word & Character Counter',
    shortDescription: 'Real-time text statistics: words, characters, sentences, reading & speaking time.',
    description: 'Detailed writing analytics for copywriters, students, and authors. Count words, characters (with and without spaces), paragraphs, reading time, and keyword density.',
    categoryId: 'text',
    icon: 'Type',
    status: 'available',
    featured: true,
    tags: ['word-count', 'character-counter', 'reading-time', 'text-analysis', 'copy'],
    features: [
      'Live stats: Words, Characters, Sentences, Paragraphs',
      'Estimated Reading Time & Speaking Time',
      'Top keyword density frequency table',
      'Case stats: Uppercase, Lowercase, Numbers, Symbols',
    ],
    howToUse: [
      'Type or paste your text into the editor area.',
      'Watch all statistics update in real time as you write.',
      'Inspect reading duration and vocabulary frequency.',
      'Clear or copy the processed text anytime.',
    ],
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    name: 'Letter Case Converter',
    shortDescription: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, etc.',
    description: 'Instantly transform your text between all major typography and programming cases. Perfect for content creators and software developers.',
    categoryId: 'text',
    icon: 'Type',
    status: 'available',
    featured: false,
    tags: ['case', 'converter', 'uppercase', 'lowercase', 'camelcase', 'snake_case', 'kebab-case'],
    features: [
      'Sentence case, lower case, UPPER CASE, Title Case, Capitalized Case',
      'Programming cases: camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE',
      'Alternating cAsE and Inverted Case',
      'Copy transformed text with a single click',
    ],
    howToUse: [
      'Type or paste your content in the text box.',
      'Click any case conversion button (e.g. "Title Case", "snake_case").',
      'The converted text updates instantly.',
      'Click "Copy to Clipboard" to paste anywhere.',
    ],
  },

  // --- CALCULATORS ---
  {
    id: 'gst-calculator',
    slug: 'gst-calculator',
    name: 'GST Calculator',
    shortDescription: 'Calculate Inclusive & Exclusive GST with CGST, SGST, and IGST breakdowns.',
    description: 'Simple and accurate Goods and Services Tax calculator for business owners, freelancers, and shoppers. Calculate GST addition or extraction with standard and custom tax slabs.',
    categoryId: 'calculators',
    icon: 'Wrench',
    status: 'available',
    featured: true,
    tags: ['gst', 'calculator', 'tax', 'finance', 'cgst', 'sgst', 'igst', 'invoice'],
    features: [
      'GST Inclusive (extract tax from total) & Exclusive (add tax to net amount)',
      'Standard rate presets: 3%, 5%, 12%, 18%, 28% + Custom rate input',
      'Detailed breakdown: Net Price, CGST (50%), SGST (50%), Total Gross',
      'Inter-state (IGST) vs Intra-state (CGST + SGST) toggle',
    ],
    howToUse: [
      'Enter the base or total amount in rupees/currency.',
      'Choose whether to Add GST (Exclusive) or Remove GST (Inclusive).',
      'Select a standard tax rate or type a custom percentage.',
      'Review the structured tax summary table.',
    ],
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    shortDescription: 'Calculate percentages, percentage increase/decrease, and proportions instantly.',
    description: 'All-in-one percentage problem solver for discounts, test marks, growth metrics, profit margins, and everyday mathematical calculations.',
    categoryId: 'calculators',
    icon: 'Wrench',
    status: 'available',
    featured: false,
    tags: ['percentage', 'calculator', 'math', 'discount', 'increase', 'decrease', 'ratio'],
    features: [
      'Mode 1: What is X% of Y?',
      'Mode 2: X is what percentage of Y?',
      'Mode 3: Percentage increase or decrease from X to Y',
      'Visual breakdown bar and step-by-step formula explanation',
    ],
    howToUse: [
      'Select the percentage formula type you need.',
      'Input the corresponding values into the fields.',
      'See the exact result and formula explanation instantly.',
    ],
  },

  // --- PLANNED / ROADMAP TOOLS ---
  {
    id: 'meta-tag-generator',
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    shortDescription: 'Generate SEO and social media OpenGraph / Twitter card tags.',
    description: 'Create compliant meta tags for title, description, robots, OpenGraph, and Twitter cards to improve search rankings and social previews.',
    categoryId: 'seo',
    icon: 'Tags',
    status: 'coming-soon',
    featured: false,
    tags: ['seo', 'meta-tags', 'opengraph', 'twitter', 'social'],
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    shortDescription: 'Generate high-resolution custom QR codes for URLs, WiFi, and contacts.',
    description: 'Create downloadable SVG and PNG QR codes with customizable colors, error correction, and embedded logos.',
    categoryId: 'image',
    icon: 'QrCode',
    status: 'coming-soon',
    featured: false,
    tags: ['qr', 'code', 'generator', 'wifi', 'url'],
  },
];

export function getToolBySlug(slug) {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categoryId) {
  return tools.filter((t) => t.categoryId === categoryId);
}

export function getFeaturedTools() {
  return tools.filter((t) => t.featured);
}

export function getAvailableTools() {
  return tools.filter((t) => t.status === 'available');
}

export function searchTools(query) {
  if (!query || typeof query !== 'string') return [];
  const q = query.toLowerCase().trim();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}
