export type PageId = 'home' | 'about' | 'skills' | 'projects' | 'education' | 'contact';

export interface SkillItem {
  id: string;
  name: string;
  category: 'ai_ml' | 'programming' | 'fundamentals' | 'research';
  proficiencyLevel: 'Exploring' | 'Proficient' | 'Advanced' | 'Core Focus';
  percentageValue: number; // Editable by user
  description: string;
  highlights: string[];
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  detailedOverview: string;
  category: 'python' | 'ai_ml' | 'systems' | 'future';
  technologies: string[];
  imageUrl: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  hasInteractiveDemo: boolean;
  demoType?: 'atm_terminal' | 'ai_chatbot' | 'inventory_dashboard' | 'future_concept';
  keyFeatures: string[];
  status: 'Completed' | 'In Development' | 'Research Concept';
}

export interface EducationMilestone {
  year: string;
  title: string;
  institution: string;
  level: string;
  status: string;
  description: string;
  keySubjects: string[];
  achievements: string[];
}

export interface LearningGoal {
  title: string;
  area: string;
  description: string;
  targetTimeline: string;
  status: 'Completed' | 'In Progress' | 'Upcoming Target';
  resources: string[];
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  iconName: string;
  isEditable?: boolean;
}
