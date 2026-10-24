import {
  FileText, Code2, Globe, Image, Network, Wrench,
  FilePlus2, Type, FileDown, Braces, Regex, Fingerprint,
  Tags, Map, ImageDown, AppWindow, ArrowLeftRight, QrCode,
  Search, Menu, X, ChevronDown, ChevronRight, ArrowRight,
  ExternalLink, Lightbulb, Zap, Download, Copy, Upload,
  Clock, Star, Send, MessageSquare, HelpCircle, Shield,
  Smartphone, Monitor, Check, AlertCircle, Sparkles,
  Layers, LayoutGrid, Loader2, Lock, Unlock, ArrowUp, ArrowDown, Trash2,
  Percent, Calculator, RefreshCw, BarChart2, BookOpen, Mic
} from 'lucide-react';

const iconMap = {
  FileText, Code2, Globe, Image, Network, Wrench,
  FilePlus2, Type, FileDown, Braces, Regex, Fingerprint,
  Tags, Map, ImageDown, AppWindow, ArrowLeftRight, QrCode,
  Search, Menu, X, ChevronDown, ChevronRight, ArrowRight,
  ExternalLink, Lightbulb, Zap, Download, Copy, Upload,
  Clock, Star, Send, MessageSquare, HelpCircle, Shield,
  Smartphone, Monitor, Check, AlertCircle, Sparkles,
  Layers, LayoutGrid, Loader2, Lock, Unlock, ArrowUp, ArrowDown, Trash2,
  Percent, Calculator, RefreshCw, BarChart2, BookOpen, Mic
};

export default function DynamicIcon({ name, ...props }) {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    return <Sparkles {...props} />;
  }
  return <IconComponent {...props} />;
}

export {
  Search, Menu, X, ChevronDown, ChevronRight, ArrowRight,
  ExternalLink, Lightbulb, Zap, Download, Copy, Upload,
  Clock, Star, Send, MessageSquare, HelpCircle, Shield,
  Smartphone, Monitor, Check, AlertCircle, Sparkles,
  Layers, LayoutGrid, Loader2
};
