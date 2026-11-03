import React, { useState } from 'react';
import { X, Download, Printer, Check, Copy, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, INITIAL_SKILLS, INITIAL_PROJECTS, EDUCATION_HISTORY } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textResume = `
MUNIBA IJAZ
Aspiring AI Engineer
Email: ${PERSONAL_INFO.email}
Location: ${PERSONAL_INFO.location}

CAREER OBJECTIVE:
${PERSONAL_INFO.careerGoal}

ACADEMIC BACKGROUND:
- ${EDUCATION_HISTORY[0].title} (${EDUCATION_HISTORY[0].level})
  Key Coursework: ${EDUCATION_HISTORY[0].keySubjects.join(', ')}

CORE SKILLS:
${INITIAL_SKILLS.map(s => `- ${s.name}: ${s.description}`).join('\n')}

FEATURED PROJECTS:
${INITIAL_PROJECTS.map(p => `- ${p.title} (${p.technologies.join(', ')}): ${p.description}`).join('\n\n')}
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0B1220] border border-[#38BDF8]/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#38BDF8]/15 bg-[#050816]/70">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-base">Curriculum Vitae</span>
            <span className="text-xs text-[#94A3B8]">·</span>
            <span className="text-xs text-[#38BDF8] font-mono">Muniba Ijaz</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#0B1220] border border-[#38BDF8]/20 hover:border-[#00A6FF]/40 text-[#94A3B8] hover:text-white transition-all cursor-pointer"
              title="Copy plain-text resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#00A6FF]" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Resume Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#050816]/40 text-slate-200">
          {/* Header Block */}
          <div className="border-b border-[#38BDF8]/15 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Muniba Ijaz
            </h1>
            <p className="text-sm font-semibold text-[#00A6FF] mt-1 font-mono">
              Aspiring AI Engineer · Python Developer
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#94A3B8] mt-3">
              <span>Email: {PERSONAL_INFO.email}</span>
              <span>·</span>
              <span>Education: Intermediate</span>
              <span>·</span>
              <span>Status: {PERSONAL_INFO.availability}</span>
            </div>
          </div>

          {/* Objective */}
          <div>
            <h2 className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider font-mono mb-2">
              Professional Objective
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {PERSONAL_INFO.careerGoal} Armed with an Intermediate analytical foundation, dedicated to mastering deep learning fundamentals, Python systems engineering, and scalable machine intelligence.
            </p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider font-mono mb-3">
              Education
            </h2>
            <div className="space-y-4">
              {EDUCATION_HISTORY.map((edu, idx) => (
                <div key={idx} className="bg-[#0B1220]/60 p-4 rounded-xl border border-[#38BDF8]/15">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h3 className="text-sm font-bold text-white">{edu.title}</h3>
                    <span className="text-xs font-mono text-[#00A6FF]">{edu.year}</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] mb-2">{edu.institution} · {edu.level}</p>
                  <p className="text-xs text-slate-300 mb-2.5 leading-relaxed">{edu.description}</p>
                  <div className="flex flex-wrap gap-1.5 text-xs text-[#94A3B8]">
                    <span className="text-slate-400 font-medium">Focus Areas:</span>
                    {edu.keySubjects.map((sub, sIdx) => (
                      <span key={sIdx} className="text-slate-300">
                        {sub}{sIdx < edu.keySubjects.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider font-mono mb-3">
              Technical Competencies & Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INITIAL_SKILLS.map((skill) => (
                <div key={skill.id} className="p-3 bg-[#0B1220]/60 rounded-xl border border-[#38BDF8]/15">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-white">{skill.name}</span>
                    <span className="text-xs font-mono text-[#00A6FF]">{skill.proficiencyLevel}</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-2">{skill.description}</p>
                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                    {skill.highlights.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-xs font-bold text-[#38BDF8] uppercase tracking-wider font-mono mb-3">
              Key Engineering Projects
            </h2>
            <div className="space-y-4">
              {INITIAL_PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 bg-[#0B1220]/60 rounded-xl border border-[#38BDF8]/15">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#38BDF8]">
                      <span>{proj.status}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#00A6FF] mb-2">{proj.tagline}</p>
                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">{proj.detailedOverview}</p>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#94A3B8]">
                    <span className="text-slate-400 font-medium">Stack:</span>
                    {proj.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="text-slate-300">
                        {t}{tIdx < proj.technologies.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
