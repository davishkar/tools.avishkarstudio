import {
  FileText, Code2, Globe, Image, Network, Wrench,
  FilePlus2, Type, FileDown, Braces, Regex, Fingerprint,
  Tags, Map, ImageDown, AppWindow, ArrowLeftRight, QrCode,
  Search, Menu, X, ChevronDown, ChevronRight, ArrowRight,
  ExternalLink, Lightbulb, Zap, Download, Copy, Upload,
  Clock, Star, Send, MessageSquare, HelpCircle, Shield,
  Smartphone, Monitor, Check, AlertCircle, Sparkles,
  Layers, LayoutGrid,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  FileText, Code2, Globe, Image, Network, Wrench,
  FilePlus2, Type, FileDown, Braces, Regex, Fingerprint,
  Tags, Map, ImageDown, AppWindow, ArrowLeftRight, QrCode,
  Search, Menu, X, ChevronDown, ChevronRight, ArrowRight,
  ExternalLink, Lightbulb, Zap, Download, Copy, Upload,
  Clock, Star, Send, MessageSquare, HelpCircle, Shield,
  Smartphone, Monitor, Check, AlertCircle, Sparkles,
  Layers, LayoutGrid,
};

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    return <Sparkles {...props} />;
  }
  return <IconComponent {...props} />;
}

// Re-export commonly used icons for direct import
export {
  Search, Menu, X, ChevronDown, ChevronRight, ArrowRight,
  ExternalLink, Lightbulb, Zap, Download, Copy, Upload,
  Clock, Star, Send, MessageSquare, HelpCircle, Shield,
  Smartphone, Monitor, Check, AlertCircle, Sparkles,
  Layers, LayoutGrid,
};
