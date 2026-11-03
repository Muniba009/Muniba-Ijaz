import React, { useState } from 'react';
import { PageId } from '../../types';
import { PERSONAL_INFO, INTERESTS_DATA } from '../../data/portfolioData';
import { Brain, Cpu, Terminal, Zap, BookOpen, Target, Compass, Award, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenResume: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenResume }) => {
  const [selectedInterest, setSelectedInterest] = useState<number>(0);

  const journeyMilestones = [
    {
      period: 'Phase 1 · Foundation',
      title: 'Intermediate Studies & Quantitative Roots',
      description: 'Immersed in advanced mathematics, physics, and computer fundamentals during Intermediate education. Established deep discipline in analytical reasoning, logic gates, and differential calculus.',
      tags: ['Calculus', 'Physics Mechanics', 'Computer Fundamentals', 'Intermediate Education'],
    },
    {
      period: 'Phase 2 · The Spark',
      title: 'First Python Systems & Scripting',
      description: 'Discovered Python as an expressive medium for logical architectures. Built data modeling scripts, state machines, and terminal automation tools like the Python ATM simulation.',
      tags: ['Python 3.x', 'OOP Design', 'File Systems', 'Data Serialization'],
    },
    {
      period: 'Phase 3 · Deep Dive',
      title: 'Exploring Machine Intelligence & NLP',
      description: 'Dived into the mechanics of Artificial Intelligence—studying search graphs, heuristics, natural language tokenization, and neural synapse representations through chatbot prototyping.',
      tags: ['Artificial Intelligence', 'Intent Classification', 'Search Algorithms', 'NLP'],
    },
    {
      period: 'Phase 4 · Current Frontier',
      title: 'Towards Industrial AI Engineering',
      description: 'Actively researching convolutional neural networks (CNNs), reinforcement learning reward matrices, and modern deep learning frameworks. Preparing for formal undergraduate AI specialization.',
      tags: ['Deep Learning', 'PyTorch Concepts', 'Computer Vision', 'Career Trajectory'],
    },
  ];

  const getInterestIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#00A6FF]" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-[#38BDF8]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      default:
        return <Brain className="w-5 h-5 text-[#00A6FF]" />;
    }
  };

  return (
    <div className="pt-24 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="space-y-3 text-left">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00A6FF]">
          <span>Biography</span>
          <span aria-hidden="true">·</span>
          <span>Analytical Foundation</span>
          <span aria-hidden="true">·</span>
          <span>Intermediate</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          About Muniba Ijaz
        </h1>
        <p className="text-base text-[#94A3B8] max-w-2xl leading-relaxed">
          Aspiring AI Engineer bridging academic mathematics, structured Python engineering, and modern neural architectures.
        </p>
      </div>

      {/* Split Section: Bio & Core Ambition */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Personal Introduction & Background
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {PERSONAL_INFO.longBio}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              My approach to technology is anchored in first principles: before deploying a library, I strive to understand the underlying mathematics, memory consumption, and algorithmic complexities that dictate system reliability.
            </p>
          </div>

          <div className="pt-4 border-t border-[#38BDF8]/15 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#94A3B8]">
              <span className="text-slate-400 block font-mono text-[10px] uppercase">Formal Education Level</span>
              <span className="text-white font-bold">{PERSONAL_INFO.educationLevel} Education Completed</span>
            </div>
            <button
              onClick={onOpenResume}
              className="text-xs font-semibold text-[#00A6FF] hover:text-[#38BDF8] flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Educational Record</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ambition & Career Goals Card */}
        <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-[#0B1220] to-[#050816] border border-[#00A6FF]/30 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 border border-[#00A6FF]/40 flex items-center justify-center text-[#00A6FF]">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#00A6FF] uppercase tracking-wider block">
              The Definitive Career Goal
            </span>
            <h3 className="text-xl font-bold text-white leading-snug">
              {PERSONAL_INFO.careerGoal}
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              To design, train, and deploy robust AI models capable of solving critical real-world challenges—from medical diagnostics to autonomous orchestration.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#38BDF8]/15 space-y-2 relative z-10">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Award className="w-4 h-4 text-[#38BDF8] shrink-0" />
              <span>Target: Professional AI Engineer & Machine Learning Researcher</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Compass className="w-4 h-4 text-[#00A6FF] shrink-0" />
              <span>Focus: Deep Neural Networks, Python Systems, Computer Vision</span>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE TIMELINE: My Journey into AI */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-mono text-[#00A6FF] uppercase tracking-wider block mb-1">
            Chronological Evolution
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Journey into Artificial Intelligence
          </h2>
        </div>

        <div className="relative border-l border-[#38BDF8]/20 pl-6 sm:pl-8 ml-3 sm:ml-4 space-y-10">
          {journeyMilestones.map((milestone, idx) => (
            <div key={idx} className="relative group">
              {/* Chronological node marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#050816] border-2 border-[#00A6FF] shadow-[0_0_10px_#00A6FF] group-hover:scale-125 transition-transform" />

              <div className="glass-card p-5 sm:p-6 rounded-2xl space-y-3 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs font-mono text-[#00A6FF] font-semibold">{milestone.period}</span>
                  <span className="text-[11px] text-[#94A3B8]">Stage 0{idx + 1} of 04</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                  {milestone.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {milestone.description}
                </p>

                {/* Tags without pill badges */}
                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-[#94A3B8] font-mono">
                  {milestone.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-slate-400">
                      {tag}{tIdx < milestone.tags.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE CARDS: Core Interests */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-mono text-[#00A6FF] uppercase tracking-wider block mb-1">
            Curiosities & Passions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Key Fields of Interest
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1">
            Click on any interest card to explore specific technical domains and research questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {INTERESTS_DATA.map((interest, idx) => {
            const isSelected = selectedInterest === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedInterest(idx)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 border ${
                  isSelected
                    ? 'bg-[#0B1220] border-[#00A6FF] shadow-[0_0_30px_rgba(0,166,255,0.25)]'
                    : 'glass-card border-[#38BDF8]/15 hover:border-[#38BDF8]/40'
                }`}
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#050816] border border-[#38BDF8]/25 flex items-center justify-center">
                    {getInterestIcon(interest.icon)}
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {interest.title}
                  </h3>
                  <p className="text-xs text-[#38BDF8] font-mono">
                    {interest.tagline}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {interest.description}
                  </p>
                </div>

                {/* Sub-aspects */}
                <div className="pt-3 border-t border-[#38BDF8]/10 text-[11px] text-[#94A3B8]">
                  {interest.keyAspects.join(' · ')}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
