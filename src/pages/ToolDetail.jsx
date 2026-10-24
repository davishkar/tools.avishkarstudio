import { useParams, Link } from 'react-router-dom';
import { Clock, Send, Sparkles } from 'lucide-react';
import ToolLayout from '../layouts/ToolLayout';
import { getToolBySlug } from '../data/tools';
import Button from '../components/Button';

// Tool Components
import ImageCompressor from '../tools/image/ImageCompressor';
import ImageResizer from '../tools/image/ImageResizer';
import PdfMerge from '../tools/pdf/PdfMerge';
import PdfSplit from '../tools/pdf/PdfSplit';
import JsonFormatter from '../tools/developer/JsonFormatter';
import Base64Tool from '../tools/developer/Base64Tool';
import WordCounter from '../tools/text/WordCounter';
import CaseConverter from '../tools/text/CaseConverter';
import GstCalculator from '../tools/calculators/GstCalculator';
import PercentageCalculator from '../tools/calculators/PercentageCalculator';

const toolComponentMap = {
  'image-compressor': ImageCompressor,
  'image-resizer': ImageResizer,
  'pdf-merge': PdfMerge,
  'pdf-split': PdfSplit,
  'json-formatter': JsonFormatter,
  'base64-tool': Base64Tool,
  'word-counter': WordCounter,
  'case-converter': CaseConverter,
  'gst-calculator': GstCalculator,
  'percentage-calculator': PercentageCalculator,
};

export default function ToolDetail() {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Tool Not Found</h1>
        <p className="text-sm text-text-secondary mb-6">
          The requested tool does not exist or may have been relocated.
        </p>
        <Link to="/tools" className="text-sm font-semibold text-brand-700 hover:underline">
          ← Browse All Tools
        </Link>
      </div>
    );
  }

  const ToolComponent = toolComponentMap[tool.slug];

  return (
    <ToolLayout tool={tool}>
      {ToolComponent ? (
        <ToolComponent />
      ) : (
        /* Coming Soon State */
        <div className="max-w-lg mx-auto text-center py-12 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
            <Clock size={32} />
          </div>
          <h3 className="text-xl font-bold text-text-primary">
            Tool Coming Soon
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {tool.name} is scheduled on our immediate development roadmap. We are engineering it for fast, 100% client-side execution.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <Link to="/contact">
              <Button variant="primary" size="sm" className="gap-1.5">
                <Send size={14} />
                Prioritize this Tool
              </Button>
            </Link>
            <Link to="/tools">
              <Button variant="outline" size="sm">
                Browse Live Tools
              </Button>
            </Link>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
