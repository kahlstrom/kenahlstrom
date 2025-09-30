"use client";

import { useEffect, useRef } from 'react';

/**
 * XFeed - Displays X (Twitter) timeline for @AtSynct
 * Uses official X embed widget
 */
export default function XFeed() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    
    // Only add script if it hasn't been added already
    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      document.body.appendChild(script);
    }

    // Reload widgets if script already exists
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load(containerRef.current);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="border-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-green-900 font-mono text-lg font-bold">RECENT UPDATES</h3>
        <a 
          href="https://x.com/AtSynct" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-mono text-green-700 hover:text-green-900"
        >
          @AtSynct
        </a>
      </div>
      
      <div ref={containerRef} className="bg-amber-50 rounded border border-amber-900/20 overflow-hidden" style={{ maxHeight: '400px' }}>
        <a 
          className="twitter-timeline" 
          data-height="400"
          data-theme="light"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit="3"
          href="https://twitter.com/AtSynct?ref_src=twsrc%5Etfw"
        >
          Loading posts from @AtSynct...
        </a>
      </div>
      
      <p className="text-xs font-mono text-gray-600 mt-3 italic">
        Latest thoughts and updates from the road
      </p>
    </div>
  );
}
