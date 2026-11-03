/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, SkillItem, ProjectItem } from './types';
import { INITIAL_SKILLS, INITIAL_PROJECTS } from './data/portfolioData';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { NeuralCanvas } from './components/common/NeuralCanvas';
import { ResumeModal } from './components/common/ResumeModal';
import { CommandPalette } from './components/common/CommandPalette';
import { EditLinksModal } from './components/common/EditLinksModal';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { SkillsPage } from './components/pages/SkillsPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { EducationPage } from './components/pages/EducationPage';
import { ContactPage } from './components/pages/ContactPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { ArrowUp, Sparkles, Command } from 'lucide-react';

export default function App() {
  // Page state with hash synchronization
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [is404, setIs404] = useState(false);

  // Editable skills & projects with localStorage persistence
  const [skills, setSkills] = useState<SkillItem[]>(() => {
    try {
      const saved = localStorage.getItem('muniba_skills_v1');
      return saved ? JSON.parse(saved) : INITIAL_SKILLS;
    } catch {
      return INITIAL_SKILLS;
    }
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    try {
      const saved = localStorage.getItem('muniba_projects_v1');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  // Modal states
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isEditLinksOpen, setIsEditLinksOpen] = useState(false);
  const [activeDemoProject, setActiveDemoProject] = useState<ProjectItem | null>(null);

  // Background 3D neural animation toggle
  const [enable3dBackground, setEnable3dBackground] = useState(true);

  // Scroll to top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync route with URL hash on mount & hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash || hash === 'home') {
        setCurrentPage('home');
        setIs404(false);
      } else if (['about', 'skills', 'projects', 'education', 'contact'].includes(hash)) {
        setCurrentPage(hash as PageId);
        setIs404(false);
      } else if (hash.startsWith('demo-')) {
        setCurrentPage('projects');
        setIs404(false);
        const demoKey = hash.replace('demo-', '');
        const match = projects.find((p) => p.demoType === demoKey || p.id.includes(demoKey));
        if (match) setActiveDemoProject(match);
      } else {
        setIs404(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [projects]);

  // Handle scroll detection
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    setIs404(false);
    window.location.hash = `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateSkills = (updated: SkillItem[]) => {
    setSkills(updated);
    try {
      localStorage.setItem('muniba_skills_v1', JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
  };

  const handleResetSkills = () => {
    setSkills(INITIAL_SKILLS);
    try {
      localStorage.removeItem('muniba_skills_v1');
    } catch {
      // noop
    }
  };

  const handleSaveProjects = (updated: ProjectItem[]) => {
    setProjects(updated);
    try {
      localStorage.setItem('muniba_projects_v1', JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
  };

  const handleResetProjects = () => {
    setProjects(INITIAL_PROJECTS);
    try {
      localStorage.removeItem('muniba_projects_v1');
    } catch {
      // noop
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col relative selection:bg-[#00A6FF]/30 selection:text-[#38BDF8]">
      {/* 3D Neural Network Three.js Background */}
      {enable3dBackground && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <NeuralCanvas interactive={true} />
        </div>
      )}

      {/* Cybernetic grid overlay */}
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0 opacity-40" />

      {/* Top Header */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommand={() => setIsCommandOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {is404 ? (
          <NotFoundPage onNavigate={navigateTo} />
        ) : (
          <>
            {currentPage === 'home' && (
              <HomePage
                onNavigate={navigateTo}
                onOpenResume={() => setIsResumeOpen(true)}
                featuredProjects={projects}
                onOpenProjectDemo={(proj) => setActiveDemoProject(proj)}
              />
            )}
            {currentPage === 'about' && (
              <AboutPage
                onNavigate={navigateTo}
                onOpenResume={() => setIsResumeOpen(true)}
              />
            )}
            {currentPage === 'skills' && (
              <SkillsPage
                skills={skills}
                onUpdateSkills={handleUpdateSkills}
                onResetSkills={handleResetSkills}
                onNavigate={navigateTo}
              />
            )}
            {currentPage === 'projects' && (
              <ProjectsPage
                projects={projects}
                onOpenEditModal={() => setIsEditLinksOpen(true)}
                onNavigate={navigateTo}
                activeDemoProject={activeDemoProject}
                setActiveDemoProject={setActiveDemoProject}
              />
            )}
            {currentPage === 'education' && (
              <EducationPage
                onNavigate={navigateTo}
                onOpenResume={() => setIsResumeOpen(true)}
              />
            )}
            {currentPage === 'contact' && (
              <ContactPage onNavigate={navigateTo} />
            )}
          </>
        )}
      </main>

      {/* Global Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={navigateTo}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenDemo={(demoId) => {
          const match = projects.find((p) => p.demoType === demoId);
          if (match) setActiveDemoProject(match);
        }}
      />

      <EditLinksModal
        isOpen={isEditLinksOpen}
        onClose={() => setIsEditLinksOpen(false)}
        projects={projects}
        onSaveProjects={handleSaveProjects}
        onResetDefaults={handleResetProjects}
      />

      {/* Floating Utilities */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Toggle 3D Synapses */}
        <button
          onClick={() => setEnable3dBackground(!enable3dBackground)}
          className={`p-2.5 rounded-xl border backdrop-blur-md transition-all cursor-pointer shadow-lg ${
            enable3dBackground
              ? 'bg-[#0B1220]/80 border-[#00A6FF]/40 text-[#00A6FF]'
              : 'bg-[#0B1220]/60 border-slate-700 text-slate-500'
          }`}
          title={enable3dBackground ? 'Disable 3D Synapse background' : 'Enable 3D Synapse background'}
          aria-label="Toggle 3D Background"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Back to top button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2.5 rounded-xl bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,166,255,0.4)] animate-in fade-in"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenResume={() => setIsResumeOpen(true)}
      />
    </div>
  );
}
