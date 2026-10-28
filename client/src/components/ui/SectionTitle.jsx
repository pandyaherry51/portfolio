import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, alignment = 'center' }) => {
  const isCenter = alignment === 'center';

  return (
    <div className={`mb-14 ${isCenter ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-primary-600 dark:text-primary-400 font-semibold tracking-wider uppercase text-xs sm:text-sm inline-block px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-200 dark:border-primary-800/60 mb-3">
          {subtitle}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
        <div
          className={`h-1.5 w-20 bg-gradient-to-r from-primary-600 to-indigo-500 rounded-full mt-4 ${
            isCenter ? 'mx-auto' : ''
          }`}
        />
      </motion.div>
    </div>
  );
};

export default SectionTitle;

