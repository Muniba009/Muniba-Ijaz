import React, { useState } from 'react';
import { PageId, ProjectItem } from '../../types';
import { ExternalLink, Github, Play, Code, Edit3, X, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { AtmTerminalDemo } from '../demos/AtmTerminalDemo';
import { ChatbotDemo } from '../demos/ChatbotDemo';
import { InventoryDemo } from '../demos/InventoryDemo';
import { FutureAiDemo } from '../demos/FutureAiDemo';

interface ProjectsPageProps {
  projects: ProjectItem[];
  onOpenEditModal: () => void;
  onNavigate: (page: PageId) => void;
  activeDemoProject: ProjectItem | null;
  setActiveDemoProject: (proj: ProjectItem | null) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  onOpenEditModal,
  onNavigate,
  activeDemoProject,
  setActiveDemoProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'python', label: 'Python Systems' },
    { id: 'ai_ml', label: 'AI & NLP Prototypes' },
    { id: 'systems', label: 'Data & Logistics' },
    { id: 'future', label: 'Future AI Concepts' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const renderDemoComponent = (demoType?: string) => {
    switch (demoType) {
      case 'atm_terminal':
        return <AtmTerminalDemo />;
      case 'ai_chatbot':
        return <ChatbotDemo />;
      case 'inventory_dashboard':
        return <InventoryDemo />;
      case 'future_concept':
        return <FutureAiDemo />;
      default:
        return <AtmTerminalDemo />;
    }
  };

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header and URL Edit trigger */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00A6FF]">
            <span>Portfolio Showcase</span>
            <span aria-hidden="true">·</span>
            <span>Applied Engineering & AI</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Demos</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Projects & Prototypes
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Hands-on software systems engineered with Python, algorithmic logic, and artificial intelligence models. Every project features a live testable simulation.
          </p>
        </div>

        {/* Action to edit project URLs */}
        <button
          onClick={onOpenEditModal}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#0B1220] hover:bg-[#0B1220]/80 text-[#38BDF8] border border-[#38BDF8]/30 hover:border-[#00A6FF] transition-all cursor-pointer shrink-0 shadow-sm"
          title="Customize GitHub and Live Demo URLs"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Project Links</span>
        </button>
      </div>

      {/* Category Filter Controls */}
      <div className="flex items-center gap-2 p-1.5 bg-[#0B1220] rounded-xl border border-[#38BDF8]/15 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 border border-[#38BDF8]/15 hover:border-[#00A6FF]/40"
          >
            {/* Visual showcase container */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#050816]">
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#050816]/80 backdrop-blur-md border border-[#38BDF8]/20 text-[10px] font-mono text-[#00A6FF]">
                {project.status.toUpperCase()}
              </div>
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#050816]/80 backdrop-blur-md border border-[#38BDF8]/20 text-[10px] font-mono text-slate-300">
                {project.category}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-[#00A6FF] transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-[#38BDF8]">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Key feature bullets */}
                <div className="pt-2 space-y-1.5">
                  {project.keyFeatures.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00A6FF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies strip */}
              <div className="border-t border-[#38BDF8]/15 pt-4 space-y-4">
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#94A3B8] font-mono">
                  <span className="text-slate-400 font-sans font-medium">Stack:</span>
                  {project.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="text-slate-300">
                      {tech}{tIdx < project.technologies.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>

                {/* Interactive Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Live Demo Trigger */}
                  <button
                    onClick={() => setActiveDemoProject(project)}
                    className="py-2.5 px-3 rounded-xl bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,166,255,0.25)]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Live Interactive Demo</span>
                  </button>

                  {/* GitHub Button */}
                  <a
                    href={project.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#0B1220] hover:bg-white/10 text-white text-xs font-medium border border-[#38BDF8]/20 hover:border-[#00A6FF]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-[#00A6FF]" />
                    <span>Repository</span>
                    <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN / IN-APP INTERACTIVE DEMO MODAL */}
      {activeDemoProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-3xl bg-[#0B1220] border border-[#00A6FF]/40 rounded-2xl shadow-[0_20px_60px_rgba(0,166,255,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#38BDF8]/20 bg-[#050816]">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-[#00A6FF] shadow-[0_0_8px_#00A6FF]" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Live Simulation · {activeDemoProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDemoProject(null)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close demo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Active Simulator Component */}
            <div className="p-6 overflow-y-auto">
              {renderDemoComponent(activeDemoProject.demoType)}
            </div>

            {/* Modal Footer info */}
            <div className="px-6 py-3 border-t border-[#38BDF8]/15 bg-[#050816] flex items-center justify-between text-xs text-[#94A3B8]">
              <span>In-browser interactive sandbox by Muniba Ijaz</span>
              <button
                onClick={() => setActiveDemoProject(null)}
                className="text-white hover:text-[#00A6FF] cursor-pointer"
              >
                Exit Simulator
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
