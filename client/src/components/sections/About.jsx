import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, GraduationCap, MapPin, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { PERSONAL_INFO } from '../../utils/constants';

const About = () => {
  const highlights = [
    {
      title: 'Full Stack Development',
      description: 'Designing end-to-end architectures from responsive React frontends to robust Express/MongoDB REST APIs.',
      icon: Code2,
    },
    {
      title: 'Strong Core Fundamentals',
      description: 'Solid command of Data Structures, Algorithms, Object-Oriented Programming in Java & C, and SQL databases.',
      icon: GraduationCap,
    },
    {
      title: 'Modern Tooling & Workflow',
      description: 'Proficient in Git version control, Android Studio, VS Code, Postman, and automated build pipelines.',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="About Me" subtitle="Get To Know Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio & Information Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
              <p>
                Hello! I'm <strong className="text-slate-900 dark:text-white font-semibold">{PERSONAL_INFO.name}</strong>, a driven Full Stack Developer and Computer Science student. I enjoy turning complex software challenges into clean, accessible, and high-performance digital products.
              </p>
              <p>
                My journey in technology spans both web ecosystems and core software engineering. Whether designing dynamic Single Page Applications in React with Tailwind CSS, modeling relational databases with MySQL, building RESTful microservices with Node.js & Express, or developing native Android applications in Java, I strive for clean architecture and maintainability.
              </p>
              <p>
                I thrive in collaborative, fast-paced development environments and am constantly exploring modern web standards, API security best practices, and innovative technologies.
              </p>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Role</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Full Stack Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Education</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Computer Science Student</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Location</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{PERSONAL_INFO.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Opportunities</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Open to Roles</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm shadow-md transition-all hover:-translate-y-0.5"
              >
                Connect on LinkedIn
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all"
              >
                Send Message
              </a>
            </div>
          </motion.div>

          {/* Highlights Cards Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm hover:border-primary-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

