import React from 'react';
import { PageId } from '../../types';
import { AlertTriangle, Compass, Home } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: PageId) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl border border-[#38BDF8]/25 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-[#0B1220] border border-[#00A6FF]/40 mx-auto flex items-center justify-center text-[#00A6FF] shadow-[0_0_25px_rgba(0,166,255,0.3)]">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-[#00A6FF] uppercase">404 · Unresolved Synapse</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Node Not Found
          </h1>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            The neural pathway or page address you requested does not exist in Muniba Ijaz's portfolio architecture.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,166,255,0.3)]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>
          <button
            onClick={() => onNavigate('projects')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#050816] border border-[#38BDF8]/20 text-[#94A3B8] hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Projects</span>
          </button>
        </div>
      </div>
    </div>
  );
};
