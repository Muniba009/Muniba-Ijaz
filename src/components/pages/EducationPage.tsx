import React, { useState } from 'react';
import { PageId } from '../../types';
import { EDUCATION_HISTORY, LEARNING_GOALS } from '../../data/portfolioData';
import { BookOpen, GraduationCap, CheckCircle2, Clock, Calendar, ArrowRight, Award, Compass, Sparkles } from 'lucide-react';

interface EducationPageProps {
  onNavigate: (page: PageId) => void;
  onOpenResume: () => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({ onNavigate, onOpenResume }) => {
  const [completedGoals, setCompletedGoals] = useState<Record<number, boolean>>({
    0: true, // foundational intermediate milestone
  });

  const toggleGoal = (idx: number) => {
    setCompletedGoals((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="pt-24 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="space-y-3 text-left">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00A6FF]">
          <span>Academic Pedigree</span>
          <span aria-hidden="true">·</span>
          <span>Intermediate Education</span>
          <span aria-hidden="true">·</span>
          <span>AI Specialization Roadmap</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Education & Learning Journey
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
          The rigorous academic foundations and continuous self-driven curriculum powering my ascent as an aspiring AI Engineer.
        </p>
      </div>

      {/* Primary Academic Milestones */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-mono text-[#00A6FF] uppercase tracking-wider block mb-1">
            Formal & Practical Background
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Educational Background
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EDUCATION_HISTORY.map((edu, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-[#38BDF8]/20 hover:border-[#00A6FF]/40 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 border border-[#00A6FF]/40 flex items-center justify-center text-[#00A6FF]">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-[#38BDF8] px-3 py-1 rounded-md bg-[#050816] border border-[#38BDF8]/20">
                    {edu.year}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {edu.title}
                  </h3>
                  <p className="text-xs font-mono text-[#00A6FF] mt-1">
                    {edu.institution} · {edu.level}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {edu.description}
                </p>

                {/* Key Coursework */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-[#94A3B8] uppercase block">
                    Core Mathematical & Technical Subjects
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-mono">
                    {edu.keySubjects.map((sub, sIdx) => (
                      <span key={sIdx} className="text-slate-400">
                        {sub}{sIdx < edu.keySubjects.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-2 pt-2 border-t border-[#38BDF8]/15">
                  <span className="text-xs font-mono text-[#94A3B8] uppercase block">
                    Distinctions & Milestones
                  </span>
                  <div className="space-y-1.5">
                    {edu.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00A6FF] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#38BDF8]/15 flex items-center justify-between text-xs text-[#94A3B8]">
                <span>Status: <strong className="text-white">{edu.status}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FUTURE LEARNING GOALS IN AI & MACHINE LEARNING */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#00A6FF] uppercase tracking-wider block mb-1">
              Curriculum Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Future Learning Goals in AI & ML
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              Tracked strategic milestones towards advanced deep learning, research publications, and university degree completion.
            </p>
          </div>
          <span className="text-xs font-mono text-[#38BDF8] self-start sm:self-auto">
            Interactive Checkpoints
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEARNING_GOALS.map((goal, idx) => {
            const isChecked = !!completedGoals[idx];

            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-[#38BDF8]/15 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono text-[#00A6FF] uppercase">
                      {goal.area}
                    </span>
                    <button
                      onClick={() => toggleGoal(idx)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer border ${
                        isChecked
                          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                          : 'bg-[#050816] border-[#38BDF8]/20 text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span>{isChecked ? 'Tracked / Active' : 'Mark Active'}</span>
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {goal.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {goal.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#38BDF8]/15 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                    <span>Target Horizon: <span className="text-white">{goal.targetTimeline}</span></span>
                    <span className="text-[#38BDF8]">{goal.status}</span>
                  </div>

                  <div className="text-[11px] text-[#94A3B8] flex flex-wrap gap-1">
                    <span className="text-slate-400">Key References:</span>
                    {goal.resources.join(' · ')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ACTION BANNER */}
      <section className="p-8 rounded-2xl bg-[#0B1220] border border-[#38BDF8]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <h3 className="text-lg font-bold text-white">Interested in evaluating full coursework?</h3>
          <p className="text-xs text-[#94A3B8]">
            Muniba's full academic summary, verified test results, and programming assignments are available for academic review.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenResume}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] transition-all cursor-pointer shadow-sm"
          >
            Review Curriculum Vitae
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 text-xs font-medium rounded-xl bg-[#050816] border border-[#38BDF8]/25 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
          >
            Reach Out
          </button>
        </div>
      </section>
    </div>
  );
};
