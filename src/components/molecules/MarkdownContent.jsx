import ReactMarkdown from 'react-markdown';

/**
 * Styled markdown renderer matching the portfolio postcard aesthetic.
 */
export default function MarkdownContent({ content }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-mono font-bold text-amber-900 mb-3 mt-1">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-mono font-bold text-amber-900 mb-2 mt-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-mono font-bold text-amber-900 mb-2 mt-4">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-sm font-mono text-gray-700 mb-3 leading-relaxed">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-1 mb-3 text-sm font-mono text-gray-700">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-1 mb-3 text-sm font-mono text-gray-700">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-relaxed">{children}</li>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-800 underline hover:text-amber-950 transition-colors"
          >
            {children}
          </a>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-gray-900">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-gray-600">{children}</em>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-amber-400 pl-3 my-3 text-sm font-mono text-gray-600 italic">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="px-1 py-0.5 rounded bg-amber-100 text-amber-950 text-xs font-mono">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
