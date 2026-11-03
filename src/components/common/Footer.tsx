import React from 'react';
import { PageId } from '../../types';
import { ArrowUp, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../data/portfolioData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github':
        return <Github className="w-4 h-4" />;
      case 'Linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'Mail':
        return <Mail className="w-4 h-4" />;
      case 'Twitter':
        return <Twitter className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative bg-[#050816] border-t border-[#38BDF8]/15 pt-12 pb-8 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#00A6FF]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Identity & Ambition */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#0B1220] border border-[#00A6FF]/40 flex items-center justify-center text-[#00A6FF]">
                <span className="font-mono text-xs font-bold">MI</span>
              </div>
              <span className="text-base font-bold text-white tracking-tight">Muniba Ijaz</span>
              <span className="text-xs text-[#94A3B8]">·</span>
              <span className="text-xs text-[#38BDF8] font-mono">Aspiring AI Engineer</span>
            </div>
            <p className="text-sm text-[#94A3B8] max-w-md leading-relaxed">
              Dedicated to computational problem solving, Python architecture, and machine learning research. Building foundational intelligence from the ground up.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="w-9 h-9 rounded-lg bg-[#0B1220] border border-[#38BDF8]/20 flex items-center justify-center text-[#94A3B8] hover:text-[#00A6FF] hover:border-[#00A6FF]/50 transition-all cursor-pointer"
                >
                  {getSocialIcon(link.iconName)}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase font-mono">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              {(['home', 'about', 'skills', 'projects', 'education', 'contact'] as PageId[]).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => {
                      onNavigate(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors capitalize text-left cursor-pointer"
                  >
                    {page === 'about' ? 'About Me' : page}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources & Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wider uppercase font-mono">
              Direct Access
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <button
                  onClick={onOpenResume}
                  className="hover:text-[#00A6FF] transition-colors cursor-pointer text-left"
                >
                  Academic & Technical CV
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-[#00A6FF] transition-colors cursor-pointer block truncate"
                  title={PERSONAL_INFO.email}
                >
                  {PERSONAL_INFO.email}
                </a>
              </li>
              <li>
                <span className="text-xs text-[#94A3B8] block">Status: {PERSONAL_INFO.availability}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#38BDF8]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Muniba Ijaz</span>
            <span>·</span>
            <span>All rights reserved</span>
            <span>·</span>
            <span>Engineered with Python, AI & Modern Web</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#38BDF8]/20 hover:border-[#00A6FF]/40 text-[#94A3B8] hover:text-white transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#00A6FF]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
