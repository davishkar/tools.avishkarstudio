import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import Button from './Button';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/tools', label: 'All Tools' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-md py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="360° Tools Home">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
            <span className="text-white text-sm font-extrabold tracking-tighter">360°</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-extrabold text-text-primary tracking-tight">
              360° Tools
            </span>
            <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase mt-0.5">
              by Avishkar Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors duration-150 ${
                  isActive
                    ? 'text-brand-700 bg-brand-50/80 shadow-2xs'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/80'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/tools">
            <Button variant="primary" size="sm" className="shadow-sm">
              Explore Tools
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary rounded-xl hover:bg-gray-100 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-2xl border-t border-border p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                    isActive
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/tools" className="mt-2">
              <Button variant="primary" className="w-full">
                Explore All Tools
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
