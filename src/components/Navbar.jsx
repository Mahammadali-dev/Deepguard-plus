import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ isAuthenticated, user, onLoginClick, onLogout }) {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    ...(isAuthenticated ? [{ name: 'Detect', path: '/detect' }] : []),
    { name: 'Research', path: '/research' },
    { name: 'API', path: '/api' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 w-full bg-background/80 backdrop-blur-md border-b border-outline z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded bg-inverse-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">D+</span>
            </div>
            <span className="text-on-surface font-bold tracking-tight text-base hidden sm:inline group-hover:text-primary transition-colors">
              DeepGuard<span className="text-primary">+</span>
            </span>
          </Link>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-md font-label-lg text-[13px] tracking-wide transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-surface-container-high text-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <button
                onClick={onLoginClick}
                className="bg-inverse-primary text-white px-4 py-1.5 rounded-md font-label-lg text-[13px] hover:bg-primary-container hover:text-on-primary-container transition-colors"
              >
                Sign In
              </button>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-surface-container transition-colors">
                  <div className="w-7 h-7 rounded-full bg-surface-container-high border border-outline flex items-center justify-center text-on-surface font-bold text-xs">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-on-surface-variant font-label-md text-[12px] hidden sm:inline">{user?.displayName || 'User'}</span>
                  <span className="material-symbols-outlined text-[16px] text-outline-variant">expand_more</span>
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-1 w-52 bg-surface border border-outline rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2.5 border-b border-outline">
                      <p className="font-label-md text-[12px] text-on-surface-variant truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors">
                      <span className="material-symbols-outlined text-[18px]">home</span>Home
                    </Link>
                    <button
                      onClick={onLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-error hover:bg-surface-container transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-on-surface-variant hover:text-on-surface"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-outline bg-surface-container-lowest px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md font-label-lg text-[14px] ${
                isActive(link.path)
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
