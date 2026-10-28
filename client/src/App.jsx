import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import EducationExperience from './components/sections/EducationExperience';
import Contact from './components/sections/Contact';

const MainContent = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary-500 selection:text-white">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#0f172a' : '#ffffff',
            color: theme === 'dark' ? '#f8fafc' : '#0f172a',
            border: theme === 'dark' ? '1px solid #1e293b' : '1px solid #e2e8f0',
            borderRadius: '16px',
            fontSize: '14px',
            padding: '12px 18px',
          },
        }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <EducationExperience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

export default App;

