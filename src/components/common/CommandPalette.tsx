import React, { useState, useEffect } from 'react';
import { PageId } from '../../types';
import { Search, Compass, Cpu, Code, BookOpen, Mail, FileText, Sparkles, X, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  onOpenResume: () => void;
  onOpenDemo?: (demoId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
  onOpenDemo,
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'nav-home',
      label: 'Home · Return to hero & introduction',
      icon: <Compass className="w-4 h-4 text-[#00A6FF]" />,
      action: () => { onNavigate('home'); onClose(); },
    },
    {
      id: 'nav-about',
      label: 'About Me · Education, journey & aspirations',
      icon: <Sparkles className="w-4 h-4 text-[#38BDF8]" />,
      action: () => { onNavigate('about'); onClose(); },
    },
    {
      id: 'nav-skills',
      label: 'Technical Skills · Python, AI, ML & problem solving',
      icon: <Cpu className="w-4 h-4 text-[#00A6FF]" />,
      action: () => { onNavigate('skills'); onClose(); },
    },
    {
      id: 'nav-projects',
      label: 'Projects Showcase · ATM, Chatbot, Inventory & Future AI',
      icon: <Code className="w-4 h-4 text-[#38BDF8]" />,
      action: () => { onNavigate('projects'); onClose(); },
    },
    {
      id: 'nav-education',
      label: 'Education & Roadmap · Intermediate & AI milestones',
      icon: <BookOpen className="w-4 h-4 text-[#00A6FF]" />,
      action: () => { onNavigate('education'); onClose(); },
    },
    {
      id: 'nav-contact',
      label: 'Contact Muniba · Send a direct message or inquiry',
      icon: <Mail className="w-4 h-4 text-[#38BDF8]" />,
      action: () => { onNavigate('contact'); onClose(); },
    },
    {
      id: 'action-resume',
      label: 'View / Print Resume (Curriculum Vitae)',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => { onClose(); onOpenResume(); },
    },
    {
      id: 'action-copy-email',
      label: `Copy Email Address (${PERSONAL_INFO.email})`,
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-[#00A6FF]" />,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
  ];

  const filtered = actions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0B1220] border border-[#38BDF8]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#38BDF8]/15 bg-[#050816]/70">
          <Search className="w-4 h-4 text-[#00A6FF] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, projects, skills, or actions..."
            className="w-full bg-transparent text-sm text-white placeholder-[#94A3B8] focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-[#94A3B8] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#94A3B8]">
              No actions found for "{query}".
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium text-slate-200 hover:text-white hover:bg-[#00A6FF]/15 hover:border-[#00A6FF]/30 border border-transparent transition-all cursor-pointer group"
              >
                <div className="p-1.5 rounded-lg bg-[#050816] border border-[#38BDF8]/20 group-hover:border-[#00A6FF]/50 transition-colors">
                  {item.icon}
                </div>
                <span className="flex-1 truncate">{item.label}</span>
                <span className="text-[10px] text-[#94A3B8] font-mono group-hover:text-[#38BDF8]">Jump ↵</span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-[#38BDF8]/10 bg-[#050816]/60 flex items-center justify-between text-[11px] text-[#94A3B8]">
          <span>Use <kbd className="px-1.5 py-0.5 rounded bg-[#0B1220] border border-[#38BDF8]/20 text-white font-mono text-[10px]">Esc</kbd> to close</span>
          <span>Muniba Ijaz · Aspiring AI Engineer</span>
        </div>
      </div>
    </div>
  );
};
