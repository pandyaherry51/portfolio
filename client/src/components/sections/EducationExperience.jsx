import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { EDUCATION_EXPERIENCE } from '../../utils/constants';

const EducationExperience = () => {
  return (
    <section id="experience" className="py-24 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Education & Experience"
          subtitle="Academic & Technical Milestones"
        />

        <div className="relative border-l-2 border-primary-200 dark:border-primary-900/60 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {EDUCATION_EXPERIENCE.map((item, index) => {
            const isEducation = item.type === 'education';
            const Icon = isEducation ? GraduationCap : Briefcase;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Icon Node */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1 p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-primary-600 text-primary-600 dark:text-primary-400 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Card Container */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary-500/50 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 w-fit">
                      {isEducation ? 'Degree & Academics' : 'Technical Development'}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1">
                    {item.institution}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {item.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EducationExperience;

