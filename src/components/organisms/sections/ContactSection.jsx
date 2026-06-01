'use client';

import Postcard from '@/components/atoms/Postcard';
import ProfileLinks from '@/components/molecules/ProfileLinks';

export default function ContactSection() {
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
      
      {/* Contact links */}
      <div className="mb-6 p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
        <ProfileLinks className="justify-center" />
      </div>
      
      {/* Disclaimer */}
      <p className="text-gray-600 font-mono text-sm italic px-4">
        Due to volume, I may not be able to respond to all requests or offers, 
        but I will do my best to get back to you in a timely manner.
      </p>
    </Postcard>
  );
}
