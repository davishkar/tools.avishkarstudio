import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white border-b border-border">
      <div className="content-container h-full flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 min-h-11 shrink-0" aria-label="AVISHKAR TOOLS home">
          <div className="w-9 h-9 rounded-[8px] bg-brand-700 flex items-center justify-center">
            <span className="text-white text-xs font-bold tracking-tight">AT</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold text-text-primary tracking-tight">
              AVISHKAR TOOLS
            </span>
            <span className="text-[12px] text-text-secondary mt-0.5">
              Simple tools. Fast results.
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `min-h-11 px-3.5 inline-flex items-center text-[15px] font-medium rounded-[8px] ${
                  isActive
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/tools">
            <Button variant="primary" size="sm">
              Browse tools
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden min-h-11 min-w-11 inline-flex items-center justify-center text-text-secondary hover:text-text-primary rounded-[8px] hover:bg-bg-tertiary"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-border shadow-dropdown">
          <nav className="content-container py-3 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `min-h-11 px-4 inline-flex items-center text-[15px] font-medium rounded-[8px] ${
                    isActive
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/tools" className="mt-2">
              <Button variant="primary" className="w-full">
                Browse tools
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
