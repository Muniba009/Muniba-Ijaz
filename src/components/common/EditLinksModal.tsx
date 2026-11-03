import React, { useState } from 'react';
import { X, Check, Link as LinkIcon, RotateCcw } from 'lucide-react';
import { ProjectItem } from '../../types';

interface EditLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onSaveProjects: (updated: ProjectItem[]) => void;
  onResetDefaults: () => void;
}

export const EditLinksModal: React.FC<EditLinksModalProps> = ({
  isOpen,
  onClose,
  projects,
  onSaveProjects,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<ProjectItem[]>(projects);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleUrlChange = (id: string, field: 'githubUrl' | 'liveDemoUrl', value: string) => {
    setFormData((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj))
    );
  };

  const handleSave = () => {
    onSaveProjects(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#0B1220] border border-[#38BDF8]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#38BDF8]/15 bg-[#050816]/80">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-[#00A6FF]" />
            <span className="font-semibold text-white text-sm">Configure Project URLs</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#94A3B8] hover:text-white rounded-lg hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Customize the GitHub repository and Live Demo URLs for each project. Your changes are saved locally so you can link your real repositories.
          </p>

          <div className="space-y-5">
            {formData.map((proj) => (
              <div key={proj.id} className="p-4 rounded-xl bg-[#050816]/70 border border-[#38BDF8]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{proj.title}</span>
                  <span className="text-[11px] font-mono text-[#00A6FF]">{proj.category}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#94A3B8] font-mono mb-1">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={proj.githubUrl || ''}
                      onChange={(e) => handleUrlChange(proj.id, 'githubUrl', e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#38BDF8]/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00A6FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#94A3B8] font-mono mb-1">
                      Live Demo URL (or hash anchor)
                    </label>
                    <input
                      type="text"
                      value={proj.liveDemoUrl || ''}
                      onChange={(e) => handleUrlChange(proj.id, 'liveDemoUrl', e.target.value)}
                      placeholder="#demo-... or https://..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#0B1220] border border-[#38BDF8]/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00A6FF]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-[#38BDF8]/15 bg-[#050816]/80">
          <button
            onClick={() => {
              onResetDefaults();
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-[#94A3B8] hover:text-white bg-[#0B1220] border border-[#38BDF8]/20 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,166,255,0.3)]"
            >
              {savedSuccess ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{savedSuccess ? 'Saved!' : 'Save URLs'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
