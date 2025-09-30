import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/organisms/Navigation';
import TerminalFooter from '@/components/organisms/TerminalFooter';
import BackgroundMap from '@/components/atoms/BackgroundMap';
import FlightAnimation from '@/components/molecules/FlightAnimation';

export default function PortfolioLayout({ sections, children }) {
  const [activeSection, setActiveSection] = useState('mission');
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMap, setShowMap] = useState(false);

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
    <div className="min-h-screen bg-slate-900 text-gray-100 font-mono flex flex-col relative">
      {/* Background World Map */}
      <BackgroundMap />
      
      {/* Foreground Content - with relative positioning to appear above map */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation 
          sections={sections} 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          currentTime={currentTime}
        />

        {/* Main content */}
        <div className="max-w-7xl mx-auto p-6 flex-1 w-full pt-24 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Page Title with Map Toggle */}
              <div className={`flex items-center mb-6 ${showMap ? 'justify-end' : 'justify-between'}`}>
                {!showMap && (
                  <h1 className="text-2xl font-bold text-amber-400 font-mono">
                    {sections[activeSection].title}
                  </h1>
                )}
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="text-sm font-mono text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-dotted underline-offset-4"
                >
                  {showMap ? '← See Postcards' : 'See the Map →'}
                </button>
              </div>
              
              {/* Content - hidden when showing map */}
              <AnimatePresence mode="wait">
                {!showMap && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {children(activeSection)}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Flight Animation in Map View */}
              {showMap && <FlightAnimation />}
            </motion.div>
          </AnimatePresence>
        </div>

        <TerminalFooter />
      </div>
    </div>
  );
}
