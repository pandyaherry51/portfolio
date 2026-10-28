import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Layout,
  Palette,
  Server,
  Database,
  Terminal,
  Coffee,
  Smartphone,
  FileCode,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';

const allSkills = [
  // Frontend
  { name: 'React.js', category: 'Frontend', level: 'Advanced', icon: Code, tags: ['Components', 'Hooks', 'State'] },
  { name: 'JavaScript (ES6+)', category: 'Frontend', level: 'Advanced', icon: Code, tags: ['Async/Await', 'DOM', 'Promises'] },
  { name: 'HTML5', category: 'Frontend', level: 'Expert', icon: Layout, tags: ['Semantic HTML', 'Accessibility', 'SEO'] },
  { name: 'CSS3', category: 'Frontend', level: 'Expert', icon: Palette, tags: ['Flexbox', 'Grid', 'Animations'] },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced', icon: Sparkles, tags: ['Utility-First', 'Responsive Design'] },

  // Backend & Database
  { name: 'Node.js', category: 'Backend & DB', level: 'Advanced', icon: Server, tags: ['Runtime', 'Event Loop', 'npm'] },
  { name: 'Express.js', category: 'Backend & DB', level: 'Advanced', icon: Cpu, tags: ['REST API', 'Routing', 'Middleware'] },
  { name: 'MongoDB', category: 'Backend & DB', level: 'Intermediate', icon: Database, tags: ['NoSQL', 'Mongoose', 'Aggregation'] },
  { name: 'MySQL', category: 'Backend & DB', level: 'Intermediate', icon: Database, tags: ['Relational Schema', 'Joins', 'ACID'] },
  { name: 'SQL', category: 'Backend & DB', level: 'Intermediate', icon: Layers, tags: ['Queries', 'Indexing', 'Stored Procs'] },

  // Programming Languages & Core
  { name: 'Java', category: 'Languages & Core', level: 'Advanced', icon: Coffee, tags: ['OOP', 'Collections', 'Multithreading'] },
  { name: 'C', category: 'Languages & Core', level: 'Intermediate', icon: Terminal, tags: ['Pointers', 'Memory Management', 'Algorithms'] },

  // Tools & Workflow
  { name: 'Android Studio', category: 'Tools', level: 'Intermediate', icon: Smartphone, tags: ['Android SDK', 'Java XML', 'Emulator'] },
  { name: 'VS Code', category: 'Tools', level: 'Expert', icon: FileCode, tags: ['Extensions', 'Debugging', 'Linting'] },
];

const categories = ['All', 'Frontend', 'Backend & DB', 'Languages & Core', 'Tools'];

const Skills = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredSkills = activeTab === 'All'
    ? allSkills
    : allSkills.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="py-24 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Skills & Technologies"
          subtitle="Technical Arsenal"
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              type="button"
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === category
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary-500/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {skill.category}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                    {skill.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

