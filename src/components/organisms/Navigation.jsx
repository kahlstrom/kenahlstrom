"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalButton from '@/components/atoms/TerminalButton';

export default function Navigation({ sections, activeSection, onSectionChange, currentTime }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Format time as UTC
  const formatUTCTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      timeZone: 'UTC',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleSectionClick = (section) => {
    onSectionChange(section);
    setIsMenuOpen(false); // Close menu after selection
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-800 border-b border-gray-700 p-4 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex gap-1 overflow-x-auto">
            {Object.keys(sections).map((section) => (
              <TerminalButton
                key={section}
                onClick={() => onSectionChange(section)}
                isActive={activeSection === section}
              >
                {sections[section].title}
              </TerminalButton>
            ))}
          </div>

          {/* Mobile Hamburger Menu - Visible on mobile only */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1 p-2 hover:bg-slate-700 rounded transition-colors"
              aria-label="Toggle menu"
            >
              <motion.span 
                className="w-6 h-0.5 bg-green-400"
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="w-6 h-0.5 bg-green-400"
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span 
                className="w-6 h-0.5 bg-green-400"
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
          
          {/* UTC Clock */}
          <div className="text-amber-400 text-sm font-mono whitespace-nowrap flex-shrink-0">
            {formatUTCTime(currentTime)} UTC
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-700">
                {Object.keys(sections).map((section) => (
                  <button
                    key={section}
                    onClick={() => handleSectionClick(section)}
                    className={`
                      w-full text-left px-4 py-3 rounded font-mono text-sm transition-all
                      ${activeSection === section 
                        ? 'bg-green-400/20 text-green-400 border-l-4 border-green-400' 
                        : 'text-gray-400 hover:text-green-400 hover:bg-slate-700/50 border-l-4 border-transparent'
                      }
                    `}
                  >
                    {sections[section].title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
