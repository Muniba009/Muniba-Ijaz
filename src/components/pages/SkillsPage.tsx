import React, { useState } from 'react';
import { PageId, SkillItem } from '../../types';
import { Sliders, RotateCcw, Check, Sparkles, Code, Cpu, Network, Brain, HardDrive, Search, Terminal } from 'lucide-react';

interface SkillsPageProps {
  skills: SkillItem[];
  onUpdateSkills: (updated: SkillItem[]) => void;
  onResetSkills: () => void;
  onNavigate: (page: PageId) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({
  skills,
  onUpdateSkills,
  onResetSkills,
  onNavigate,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkillDetail, setActiveSkillDetail] = useState<string | null>(skills[0]?.id || null);
  const [saveToast, setSaveToast] = useState(false);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-[#00A6FF]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#38BDF8]" />;
      case 'Network':
        return <Network className="w-5 h-5 text-indigo-400" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-purple-400" />;
      case 'HardDrive':
        return <HardDrive className="w-5 h-5 text-cyan-400" />;
      case 'Search':
        return <Search className="w-5 h-5 text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-[#00A6FF]" />;
    }
  };

  const handlePercentageChange = (id: string, newVal: number) => {
    const updated = skills.map((s) => (s.id === id ? { ...s, percentageValue: newVal } : s));
    onUpdateSkills(updated);
  };

  const handleLevelChange = (id: string, newLevel: SkillItem['proficiencyLevel']) => {
    const updated = skills.map((s) => (s.id === id ? { ...s, proficiencyLevel: newLevel } : s));
    onUpdateSkills(updated);
  };

  const filteredSkills = skills.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  const selectedSkill = skills.find((s) => s.id === activeSkillDetail) || skills[0];

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header with Edit Mode Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00A6FF]">
            <span>Technical Competencies</span>
            <span aria-hidden="true">·</span>
            <span>Algorithmic & AI Capabilities</span>
            <span aria-hidden="true">·</span>
            <span>Editable Levels</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Technical Skills & Architecture
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            A comprehensive overview of foundational Python development, artificial intelligence principles, algorithmic problem solving, and computer hardware essentials.
          </p>
        </div>

        {/* Level Editor Toggle Bar */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setIsEditMode(!isEditMode);
              if (isEditMode) {
                setSaveToast(true);
                setTimeout(() => setSaveToast(false), 2000);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              isEditMode
                ? 'bg-[#00A6FF] text-[#050816] border-[#00A6FF] shadow-[0_0_20px_rgba(0,166,255,0.4)]'
                : 'bg-[#0B1220] text-white border-[#38BDF8]/30 hover:border-[#00A6FF]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isEditMode ? 'Done Editing' : 'Customize Skill Levels'}</span>
          </button>

          {isEditMode && (
            <button
              onClick={onResetSkills}
              className="p-2 text-xs text-[#94A3B8] hover:text-white bg-[#0B1220] border border-[#38BDF8]/20 rounded-xl transition-colors cursor-pointer"
              title="Reset default levels"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {saveToast && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-4 h-4" />
          <span>Skill levels updated and saved to your session!</span>
        </div>
      )}

      {/* Filter Tabs as Functional Interactive Buttons */}
      <div className="flex items-center gap-2 p-1.5 bg-[#0B1220] rounded-xl border border-[#38BDF8]/15 overflow-x-auto">
        {[
          { id: 'all', label: 'All 6 Competencies' },
          { id: 'programming', label: 'Python & Software' },
          { id: 'ai_ml', label: 'AI & Machine Learning' },
          { id: 'fundamentals', label: 'Systems & Problem Solving' },
          { id: 'research', label: 'Technology Research' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === tab.id
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Skills Progress & Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skill Cards with Animated Progress Bars */}
        <div className="lg:col-span-7 space-y-4">
          {filteredSkills.map((skill) => {
            const isSelected = activeSkillDetail === skill.id;

            return (
              <div
                key={skill.id}
                onClick={() => setActiveSkillDetail(skill.id)}
                className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0B1220] border-[#00A6FF] shadow-[0_0_25px_rgba(0,166,255,0.2)]'
                    : 'glass-card border-[#38BDF8]/15 hover:border-[#38BDF8]/35'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#050816] border border-[#38BDF8]/20 flex items-center justify-center">
                      {getSkillIcon(skill.iconName)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {skill.name}
                      </h3>
                      <span className="text-xs font-mono text-[#38BDF8]">
                        {skill.proficiencyLevel}
                      </span>
                    </div>
                  </div>

                  {/* Level indicator / Percentage */}
                  <div className="text-right">
                    <span className="text-base font-mono font-bold text-white tabular-nums">
                      {skill.percentageValue}%
                    </span>
                    <span className="block text-[10px] text-[#94A3B8] font-mono">Proficiency</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {skill.description}
                </p>

                {/* Animated Progress Bar */}
                <div className="w-full h-2 rounded-full bg-[#050816] border border-[#38BDF8]/10 overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#00A6FF] transition-all duration-700 ease-out shadow-[0_0_10px_#00A6FF]"
                    style={{ width: `${skill.percentageValue}%` }}
                  />
                </div>

                {/* Edit Controls if Mode is Active */}
                {isEditMode && (
                  <div
                    className="mt-4 pt-3 border-t border-[#38BDF8]/15 space-y-3 bg-[#050816]/70 p-3 rounded-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <label className="text-[#94A3B8] font-mono">Adjust Level ({skill.percentageValue}%):</label>
                      <input
                        type="range"
                        min={30}
                        max={100}
                        value={skill.percentageValue}
                        onChange={(e) => handlePercentageChange(skill.id, parseInt(e.target.value))}
                        className="w-48 accent-[#00A6FF] cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-[#94A3B8] font-mono">Tier:</span>
                      <div className="flex gap-1">
                        {(['Exploring', 'Proficient', 'Advanced', 'Core Focus'] as const).map((tier) => (
                          <button
                            key={tier}
                            onClick={() => handleLevelChange(skill.id, tier)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                              skill.proficiencyLevel === tier
                                ? 'bg-[#00A6FF] text-[#050816] font-bold'
                                : 'bg-[#0B1220] text-[#94A3B8] hover:text-white border border-[#38BDF8]/20'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Inspector for Selected Skill */}
        <div className="lg:col-span-5 sticky top-28">
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-[#38BDF8]/30 space-y-6">
            <div className="flex items-center justify-between border-b border-[#38BDF8]/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2563EB]/20 border border-[#00A6FF]/40 flex items-center justify-center">
                  {getSkillIcon(selectedSkill.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedSkill.name}
                  </h3>
                  <span className="text-xs text-[#00A6FF] font-mono">
                    Deep-Dive Focus Area
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#050816] border border-[#38BDF8]/20 text-white tabular-nums">
                {selectedSkill.percentageValue}% Mastery
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">
                Core Architectural Knowledge
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedSkill.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">
                Key Technical Concepts Mastered
              </h4>
              <div className="space-y-2">
                {selectedSkill.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#050816]/70 border border-[#38BDF8]/15 text-xs text-slate-200 flex items-center gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FF]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Application Link */}
            <div className="pt-4 border-t border-[#38BDF8]/15">
              <button
                onClick={() => {
                  onNavigate('projects');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,166,255,0.3)]"
              >
                <Terminal className="w-4 h-4" />
                <span>See Projects Applying This Skill</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
