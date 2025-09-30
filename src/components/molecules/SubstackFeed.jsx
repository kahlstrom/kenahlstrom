"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

/**
 * SubstackFeed - Displays latest articles from Synct Stories Substack
 * Uses RSS feed to fetch latest 3 articles
 */
export default function SubstackFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch Substack RSS feed
    const fetchArticles = async () => {
      try {
        // Using RSS2JSON service to convert RSS to JSON
        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://synct.substack.com/feed`
        );
        const data = await response.json();
        
        if (data.status === 'ok') {
          // Get only the latest 3 articles
          setArticles(data.items.slice(0, 3));
        } else {
          setError('Failed to load articles');
        }
      } catch (err) {
        setError('Failed to load articles');
        console.error('Error fetching Substack feed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="border-0">
        <h3 className="text-amber-900 font-mono text-lg font-bold mb-3">LATEST WRITINGS</h3>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-amber-100 rounded p-3 animate-pulse h-20"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-0">
        <h3 className="text-amber-900 font-mono text-lg font-bold mb-3">LATEST WRITINGS</h3>
        <p className="text-gray-600 text-sm font-mono">Unable to load articles. Visit <a href="https://synct.substack.com/" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline">Synct Stories</a></p>
      </div>
    );
  }

  return (
    <div className="border-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-amber-900 font-mono text-lg font-bold">LATEST WRITINGS</h3>
        <a 
          href="https://synct.substack.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-mono text-amber-700 hover:text-amber-900 flex items-center gap-1"
        >
          View All <ExternalLinkIcon className="w-3 h-3" />
        </a>
      </div>
      
      <div className="space-y-3">
        {articles.map((article, index) => (
          <motion.a
            key={article.link}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="block bg-amber-100 rounded p-3 border border-amber-900/20 hover:bg-amber-200 hover:border-amber-900/40 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-mono font-bold text-gray-900 group-hover:text-amber-900 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs font-mono text-gray-600 mt-1">
                  {new Date(article.pubDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <ExternalLinkIcon className="w-4 h-4 text-amber-700 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>
        ))}
      </div>
      
      <p className="text-xs font-mono text-gray-600 mt-3 italic">
        From Synct Stories - AI era development & nomad life
      </p>
    </div>
  );
}
