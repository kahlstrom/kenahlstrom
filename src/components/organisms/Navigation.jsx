import TerminalButton from '@/components/atoms/TerminalButton';

export default function Navigation({ sections, activeSection, onSectionChange, currentTime }) {
  // Format time as UTC
  const formatUTCTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      timeZone: 'UTC',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-800 border-b border-gray-700 p-4 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          {/* Navigation Buttons */}
          <div className="flex gap-1 overflow-x-auto">
            {Object.keys(sections).map((section) => (
              <TerminalButton
                key={section}
                onClick={() => onSectionChange(section)}
                isActive={activeSection === section}
              >
                {sections[section].title}
              </TerminalButton>
            ))}
          </div>
          
          {/* UTC Clock */}
          <div className="text-amber-400 text-sm font-mono whitespace-nowrap flex-shrink-0">
            {formatUTCTime(currentTime)} UTC
          </div>
        </div>
      </div>
    </nav>
  );
}
