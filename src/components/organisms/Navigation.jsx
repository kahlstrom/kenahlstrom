import TerminalButton from '@/components/atoms/TerminalButton';

export default function Navigation({ sections, activeSection, onSectionChange }) {
  return (
    <div className="bg-slate-800 border-b border-gray-700 p-4">
      <div className="max-w-7xl mx-auto">
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
      </div>
    </div>
  );
}
