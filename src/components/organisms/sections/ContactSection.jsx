'use client';

import { useState } from 'react';
import Postcard from '@/components/atoms/Postcard';
import { LinkedInLogoIcon, GitHubLogoIcon, ReaderIcon, EnvelopeClosedIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolio';
import { generateResumePDF } from '@/utils/pdfGenerator';

export default function ContactSection() {
  const [emailRevealed, setEmailRevealed] = useState(false);
  
  // Obfuscated email - reconstructed on client side to avoid bot scraping
  const getEmail = () => {
    const parts = ['public', 'atsynct', 'com'];
    return `${parts[0]}@${parts[1]}.${parts[2]}`;
  };
  
  const handleEmailClick = () => {
    if (!emailRevealed) {
      setEmailRevealed(true);
    } else {
      window.open(`mailto:${getEmail()}`, '_blank');
    }
  };
  
  const availabilityItems = [
    { icon: '💼', text: 'Consulting engagements' },
    { icon: '🚀', text: 'Freelance projects' },
    { icon: '🤝', text: 'Co-founding & startup collaboration' },
    { icon: '🎙️', text: 'Interviews & speaking opportunities' },
    { icon: '⭐', text: 'Full-time roles (remote only)' }
  ];

  return (
    <Postcard delay={0.2} stampColor="amber" className="text-center">
      <h3 className="text-amber-900 font-mono font-bold mb-4 text-2xl">Get in Touch</h3>
      
      {/* Main introduction */}
      <p className="text-gray-800 font-mono mb-6 leading-relaxed">
        I&apos;m selectively available for the right new opportunities and collaborations.
      </p>
      
      {/* Availability list */}
      <div className="mb-6">
        <h4 className="text-amber-800 font-mono font-bold mb-3 text-lg">What I&apos;m Available For</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
          {availabilityItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-700 font-mono text-sm">
              <span className="text-lg">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Email contact */}
      <div className="mb-6 p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
        <div className="flex items-center justify-center gap-2 mb-2">
          <EnvelopeClosedIcon className="text-amber-700 w-5 h-5" />
          <h4 className="text-amber-900 font-mono font-bold text-lg">Contact Email</h4>
        </div>
        <button
          onClick={handleEmailClick}
          className="text-amber-900 hover:text-amber-950 font-mono font-bold text-lg underline cursor-pointer transition-colors"
          aria-label={emailRevealed ? "Open email client" : "Click to reveal email address"}
        >
          {emailRevealed ? getEmail() : 'public [at] atsynct [dot] com'}
        </button>
        {!emailRevealed && (
          <p className="text-amber-700 text-xs mt-2 font-mono">
            Click to reveal full email address
          </p>
        )}
      </div>
      
      {/* Disclaimer */}
      <p className="text-gray-600 font-mono text-sm italic mb-6 px-4">
        Due to volume, I may not be able to respond to all requests or offers, 
        but I will do my best to get back to you in a timely manner.
      </p>
      
      {/* Social links and resume */}
      <div className="flex justify-center gap-4 flex-wrap">
        <Button
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-mono font-bold shadow-lg"
          onClick={() => window.open(personalInfo.links.linkedin, '_blank')}
        >
          <LinkedInLogoIcon className="mr-2" />
          LinkedIn
        </Button>
        
        <Button
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-mono font-bold shadow-lg"
          onClick={() => window.open(personalInfo.links.github, '_blank')}
        >
          <GitHubLogoIcon className="mr-2" />
          GitHub
        </Button>
        
        <Button
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-mono font-bold shadow-lg"
          onClick={generateResumePDF}
        >
          <ReaderIcon className="mr-2" />
          Resume
        </Button>
      </div>
    </Postcard>
  );
}
