import React, { useState, useEffect } from 'react';
import { PageId, ProjectItem } from '../../types';
import { ArrowRight, Code, Cpu, Sparkles, Terminal, ChevronRight, Download, Brain, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenResume: () => void;
  featuredProjects: ProjectItem[];
  onOpenProjectDemo: (project: ProjectItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenResume,
  featuredProjects,
  onOpenProjectDemo,
}) => {
  // Animated typing text effect for professional interests
  const [typedInterestIndex, setTypedInterestIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const interestsList = [
    'Artificial Intelligence & Deep Learning',
    'Python Programming & System Architecture',
    'Neural Network Topologies & Reasoning',
    'Computer Science & Algorithmic Problem Solving',
    'Next-Gen Intelligent Automation',
  ];

  useEffect(() => {
    const currentTarget = interestsList[typedInterestIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < currentTarget.length) {
      timer = setTimeout(() => {
        setDisplayedText(currentTarget.slice(0, displayedText.length + 1));
      }, 55);
    } else if (!isDeleting && displayedText.length === currentTarget.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2200);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(currentTarget.slice(0, displayedText.length - 1));
      }, 30);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setTypedInterestIndex((prev) => (prev + 1) % interestsList.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typedInterestIndex]);

  return (
    <div className="relative pt-24 pb-20 space-y-24">
      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Clean unboxed kicker without pill box */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#00A6FF]">
              <span>Autonomous Systems</span>
              <span aria-hidden="true">·</span>
              <span>Python & AI Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Available for Roles</span>
            </div>

            {/* Large Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#38BDF8] to-[#00A6FF]">Muniba Ijaz</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-medium text-[#38BDF8] font-mono">
              Aspiring AI Engineer | Python Developer | Tech Enthusiast.
            </p>

            {/* Animated Typing Text */}
            <div className="h-8 flex items-center">
              <span className="text-sm sm:text-base text-slate-300 font-mono flex items-center">
                <span className="text-[#00A6FF] mr-2">&gt;</span>
                <span>{displayedText}</span>
                <span className="w-2 h-5 bg-[#00A6FF] ml-1 animate-pulse" />
              </span>
            </div>

            {/* Professional Introduction */}
            <p className="text-base text-[#94A3B8] leading-relaxed max-w-2xl">
              {PERSONAL_INFO.bio}
            </p>

            {/* Two Main CTAs + Secondary Resume Action */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => {
                  onNavigate('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 text-sm font-semibold text-[#050816] bg-[#00A6FF] hover:bg-[#38BDF8] rounded-xl transition-all duration-200 flex items-center gap-2 shadow-[0_0_25px_rgba(0,166,255,0.4)] cursor-pointer hover:shadow-[0_0_35px_rgba(0,166,255,0.6)]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#0B1220] hover:bg-[#0B1220]/80 border border-[#38BDF8]/30 hover:border-[#00A6FF] rounded-xl transition-all duration-200 cursor-pointer"
              >
                Contact Me
              </button>

              <button
                onClick={onOpenResume}
                className="px-4 py-3 text-sm font-medium text-[#94A3B8] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#00A6FF]" />
                <span>Download CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Profile Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-md w-full">
              {/* Outer neon ambient glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#2563EB] to-[#00A6FF] rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition duration-500" />
              
              {/* Glass frame container */}
              <div className="relative rounded-2xl overflow-hidden border border-[#38BDF8]/30 bg-[#0B1220] shadow-2xl">
                <img
                  src={PERSONAL_INFO.portraitImage}
                  alt="Muniba Ijaz - Aspiring AI Engineer"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover object-center aspect-square transform group-hover:scale-102 transition duration-500"
                />
                
                {/* Subtle bottom gradient overlay for legibility */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#050816] via-[#050816]/70 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Muniba Ijaz</h3>
                      <p className="text-xs text-[#38BDF8] font-mono">Aspiring AI Engineer</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-[#94A3B8] block">Education</span>
                      <span className="text-xs font-semibold text-white font-mono">{PERSONAL_INFO.educationLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Stat Strip: full-width row below hero split (Section 2.B) */}
        <div className="mt-14 pt-8 border-t border-[#38BDF8]/15 grid grid-cols-2 md:grid-cols-4 gap-4">
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#0B1220]/60 border border-[#38BDF8]/15 hover:border-[#00A6FF]/40 transition-colors">
              <span className="text-xs text-[#94A3B8] block font-mono">{stat.label}</span>
              <p className="text-lg sm:text-xl font-bold text-white mt-1 tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORK PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#00A6FF] uppercase tracking-wider block mb-1">
              Engineering Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Systems & AI Prototypes
            </h2>
          </div>
          <button
            onClick={() => {
              onNavigate('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-xs font-medium text-[#00A6FF] hover:text-[#38BDF8] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View all 4 projects</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
            >
              {/* Image banner */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#050816]">
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#050816]/80 backdrop-blur-md border border-[#38BDF8]/20 text-[10px] font-mono text-[#38BDF8]">
                  {proj.category.toUpperCase()}
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00A6FF] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1.5 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Tech tags without pill styling */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#94A3B8] font-mono border-t border-[#38BDF8]/10 pt-3">
                  {proj.technologies.slice(0, 3).map((tech, tIdx) => (
                    <span key={tIdx} className="text-slate-300">
                      {tech}{tIdx < 2 ? ' ·' : ''}
                    </span>
                  ))}
                </div>

                {/* Interactive Action button */}
                <button
                  onClick={() => onOpenProjectDemo(proj)}
                  className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-[#0B1220] hover:bg-[#2563EB] text-white transition-colors border border-[#38BDF8]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#00A6FF] group-hover:text-white" />
                  <span>Launch Interactive Simulator</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE IDENTITY & CAREER AMBITION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#0B1220] via-[#0B1220]/90 to-[#050816] border border-[#38BDF8]/25 p-8 sm:p-10 overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#00A6FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00A6FF]">
              <Brain className="w-4 h-4" />
              <span>Career Ambition & Long-Term Vision</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Committed to becoming a professional AI Engineer shaping the next era of intelligent computation.
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Every system in this portfolio reflects deliberate hands-on practice—from terminal state engines to convolutional pipelines. Backed by solid analytical foundations from Intermediate studies, I am continuously building toward industrial AI excellence.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,166,255,0.3)]"
              >
                Read My Story & Journey
              </button>
              <button
                onClick={() => {
                  onNavigate('skills');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 text-xs font-medium rounded-lg bg-[#050816] border border-[#38BDF8]/25 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                Explore Technical Skills
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
