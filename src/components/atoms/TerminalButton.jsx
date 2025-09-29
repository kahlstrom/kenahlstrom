export default function TerminalButton({ 
  children, 
  onClick, 
  isActive = false, 
  className = "" 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-mono whitespace-nowrap transition-all ${
        isActive
          ? 'bg-amber-400 text-black'
          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
      } ${className}`}
    >
      {children}
    </button>
  );
}
