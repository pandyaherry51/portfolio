import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      type="button"
      className={`p-2.5 rounded-xl border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
        isDark
          ? 'bg-slate-800/80 border-slate-700 text-amber-400 hover:bg-slate-800'
          : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-primary-600'
      } ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="w-5 h-5 transition-transform" /> : <Moon className="w-5 h-5 transition-transform" />}
    </motion.button>
  );
};

export default ThemeToggle;

