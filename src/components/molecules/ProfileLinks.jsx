'use client';

import { useState } from 'react';
import { EnvelopeClosedIcon, GitHubLogoIcon, ReaderIcon } from '@radix-ui/react-icons';
import { personalInfo } from '@/data/portfolio';
import { generateResumePDF } from '@/utils/pdfGenerator';

function XLogoIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const linkClassName =
  'inline-flex items-center gap-1.5 text-sm font-mono text-gray-700 hover:text-amber-900 hover:underline transition-colors cursor-pointer';

/**
 * Reconstructs the contact email on the client to reduce bot scraping.
 * @returns {string} The full email address
 */
function getEmail() {
  const parts = ['public', 'aeonvox', 'com'];
  return `${parts[0]}@${parts[1]}.${parts[2]}`;
}

/**
 * ProfileLinks - X, GitHub, resume, and email below the profile header
 */
export default function ProfileLinks({ className = 'mt-4' }) {
  const [emailRevealed, setEmailRevealed] = useState(false);

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${className}`}>
      <a
        href={personalInfo.links.x}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <XLogoIcon className="size-4 text-gray-600" />
        @AtSynct
      </a>

      <a
        href={personalInfo.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        <GitHubLogoIcon className="size-4 text-gray-600" />
        kahlstrom
      </a>

      <button
        type="button"
        onClick={generateResumePDF}
        className={linkClassName}
      >
        <ReaderIcon className="size-4 text-gray-600" />
        Resume
      </button>

      {emailRevealed ? (
        <a href={`mailto:${getEmail()}`} className={linkClassName}>
          <EnvelopeClosedIcon className="size-4 text-gray-600" />
          {getEmail()}
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setEmailRevealed(true)}
          className={linkClassName}
          aria-label="Click to reveal email address"
        >
          <EnvelopeClosedIcon className="size-4 text-gray-600" />
          [click to view]
        </button>
      )}
    </div>
  );
}
