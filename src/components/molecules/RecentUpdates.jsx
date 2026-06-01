"use client";

import { motion } from 'framer-motion';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

const currentProjects = [
  {
    key: 'clan-roster',
    title: 'Clan Roster',
    description: 'Find, join, create, and manage your gaming clan',
    href: 'https://clanroster.com',
  },
  {
    key: 'extra-rep',
    title: 'Extra Rep',
    description: "Train with elite athletes who've been there",
    href: 'https://extrarep.com',
  },
  {
    key: 'send-a-dollar',
    title: 'Send a Dollar to Me',
    description: 'Spend a dollar and get a do-follow backlink',
    href: 'https://sendadollarto.me',
  },
];

/**
 * RecentUpdates - Current projects card on the landing page overview
 */
export default function RecentUpdates() {
  return (
    <div className="border-0">
      <h3 className="text-green-900 font-mono text-lg font-bold mb-3">CURRENT PROJECTS</h3>

      <div className="space-y-3">
        {currentProjects.map((project, index) => (
          <motion.a
            key={project.key}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="block rounded p-3 border border-green-900/20 hover:border-green-900/40 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-mono font-bold text-gray-900 group-hover:text-green-900 transition-colors flex items-center gap-1.5">
                  <img
                    src={`${project.href}/favicon.ico`}
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4 flex-shrink-0 rounded-sm"
                    loading="lazy"
                  />
                  {project.title}
                </h4>
                <p className="text-xs font-mono text-gray-600 mt-1">
                  {project.description}
                </p>
              </div>
              <ExternalLinkIcon className="w-4 h-4 text-green-700 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>
        ))}
      </div>

      <p className="text-xs font-mono text-gray-600 mt-3 italic">
        Projects I&apos;m actively building
      </p>
    </div>
  );
}
