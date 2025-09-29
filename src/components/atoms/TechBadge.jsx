export default function TechBadge({ tech, className = "" }) {
  return (
    <span className={`px-2 py-1 bg-slate-700 text-gray-300 text-xs font-mono rounded ${className}`}>
      {tech}
    </span>
  );
}
