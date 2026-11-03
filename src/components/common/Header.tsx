import React, { useState, useEffect } from 'react';
import { PageId } from '../../types';
import { Menu, X, FileText, Command } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenResume: () => void;
  onOpenCommand: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenResume,
  onOpenCommand,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
  ];

  const handleNavLink = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050816]/85 backdrop-blur-md border-b border-[#38BDF8]/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand title, one line */}
          <button
            onClick={() => handleNavLink('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF]"
            aria-label="Muniba Ijaz - Home"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0B1220] border border-[#00A6FF]/40 flex items-center justify-center text-[#00A6FF] shadow-[0_0_15px_rgba(0,166,255,0.25)] group-hover:border-[#00A6FF] transition-all">
              <span className="font-mono text-xs font-bold tracking-tighter">MI</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#38BDF8] transition-colors whitespace-nowrap">
              Muniba Ijaz
            </span>
          </button>

          {/* Zone 2: 4-5 single-line nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavLink(link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] ${
                    isActive
                      ? 'text-[#00A6FF] font-semibold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00A6FF] shadow-[0_0_8px_#00A6FF]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action (Desktop) & Utilities */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Quick Command Palette trigger */}
            <button
              onClick={onOpenCommand}
              className="p-2 text-[#94A3B8] hover:text-white hover:bg-[#0B1220] rounded-lg border border-transparent hover:border-[#38BDF8]/20 transition-all cursor-pointer"
              title="Quick Search & Navigation (Ctrl+K)"
              aria-label="Open command palette"
            >
              <Command className="w-4 h-4" />
            </button>

            {/* Resume action */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[#94A3B8] hover:text-white bg-[#0B1220]/80 hover:bg-[#0B1220] border border-[#38BDF8]/20 hover:border-[#00A6FF]/40 rounded-lg transition-all cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-[#00A6FF]" />
              <span>Resume</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavLink('contact')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap shadow-sm ${
                currentPage === 'contact'
                  ? 'bg-[#00A6FF] text-[#050816] shadow-[0_0_20px_rgba(0,166,255,0.5)]'
                  : 'bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] hover:shadow-[0_0_18px_rgba(0,166,255,0.4)]'
              }`}
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCommand}
              className="p-2 text-[#94A3B8] hover:text-white bg-[#0B1220] rounded-lg border border-[#38BDF8]/20"
              aria-label="Open command search"
            >
              <Command className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#94A3B8] hover:text-white bg-[#0B1220] rounded-lg border border-[#38BDF8]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#00A6FF]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-[#050816]/95 backdrop-blur-xl border-b border-[#38BDF8]/20 px-5 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavLink(link.id)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#00A6FF]/15 text-[#00A6FF] border border-[#00A6FF]/30'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#0B1220]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNavLink('contact')}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentPage === 'contact'
                  ? 'bg-[#00A6FF] text-[#050816] font-semibold'
                  : 'text-white bg-[#2563EB] hover:bg-[#00A6FF] hover:text-[#050816]'
              }`}
            >
              Contact Me
            </button>

            <div className="pt-3 border-t border-[#38BDF8]/15 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium text-[#94A3B8] hover:text-white bg-[#0B1220] border border-[#38BDF8]/20 rounded-lg"
              >
                <FileText className="w-4 h-4 text-[#00A6FF]" />
                <span>View Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
