import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from '../ui/DynamicIcon';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/tools', label: 'All Tools' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/suggest-tool', label: 'Suggest a Tool' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-[var(--ease-smooth)]
        ${scrolled
          ? 'glass shadow-md py-2'
          : 'bg-transparent py-4'
        }
      `}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label="360° Tools Home"
        >
          <div className="relative w-9 h-9 rounded-[var(--radius-md)] bg-brand-700 flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
            <span className="text-white text-sm font-extrabold tracking-tighter">
              360°
            </span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold text-text-primary tracking-tight">
              360° Tools
            </span>
            <span className="text-[10px] text-text-muted font-medium tracking-wider uppercase">
              by Avishkar Studio
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm font-medium rounded-[var(--radius-md)] transition-colors duration-200 ${
                  isActive
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-brand-700 rounded-[var(--radius-lg)] hover:bg-brand-800 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Explore Tools
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-text-secondary hover:text-text-primary rounded-[var(--radius-md)] hover:bg-gray-100 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 glass shadow-xl border-t border-border-light">
          <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium rounded-[var(--radius-md)] transition-colors ${
                    isActive
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/tools"
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-brand-700 rounded-[var(--radius-lg)] hover:bg-brand-800 shadow-md transition-all"
            >
              Explore Tools
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
