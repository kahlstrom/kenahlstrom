'use client';

import { motion } from 'framer-motion';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { recommendedBooks } from '@/data/recommendedReading';

/**
 * RecommendedReading - Curated book list for the Personal section.
 */
export default function RecommendedReading() {
  return (
    <div className="border-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-amber-900 font-mono text-lg font-bold">RECOMMENDED READING</h3>
        <span className="text-xs font-mono text-amber-700">{recommendedBooks.length} books</span>
      </div>

      <div className="space-y-3">
        {recommendedBooks.map((book, index) => (
          <motion.a
            key={book.title}
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="block bg-amber-100 rounded p-3 border border-amber-900/20 hover:bg-amber-200 hover:border-amber-900/40 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              {book.thumbnail ? (
                <img
                  src={book.thumbnail}
                  alt={`${book.title} cover`}
                  width={48}
                  height={72}
                  className="w-12 h-[4.5rem] rounded object-cover flex-shrink-0 shadow-sm"
                  loading="lazy"
                />
              ) : (
                <div className="w-12 h-[4.5rem] rounded bg-amber-200 flex-shrink-0" />
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-sm font-mono font-bold text-gray-900 group-hover:text-amber-900 transition-colors">
                      {book.title}
                    </h4>
                    <p className="text-xs font-mono text-gray-600 mt-0.5">{book.author}</p>
                  </div>
                  <ExternalLinkIcon className="w-4 h-4 text-amber-700 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs font-mono text-gray-600 mt-2 leading-relaxed">
                  {book.description}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <p className="text-xs font-mono text-gray-600 mt-3 italic">
        Books I recommend to friends and colleagues
      </p>
    </div>
  );
}
