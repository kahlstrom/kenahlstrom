import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/organisms/Navigation';
import TerminalFooter from '@/components/organisms/TerminalFooter';

export default function PortfolioLayout({ sections, children }) {
  const [activeSection, setActiveSection] = useState('mission');
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const bootSequence = [
      "Initializing portfolio interface...",
      "Loading professional credentials...",
      "Connecting to project database...",
      "Authentication complete...",
      "System ready. Welcome to my digital workspace."
    ];

    const timeouts = [];
    
    bootSequence.forEach((line, index) => {
      const timeoutId = setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
      }, index * 800);
      timeouts.push(timeoutId);
    });

    // Cleanup function to clear all timeouts
    return () => {
      timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-mono flex flex-col">
      <Navigation 
        sections={sections} 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-6 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-amber-400 mb-6 font-mono">
              {sections[activeSection].title}
            </h1>
            {children(activeSection)}
          </motion.div>
        </AnimatePresence>
      </div>

      <TerminalFooter currentTime={currentTime} terminalLines={terminalLines} />
    </div>
  );
}
