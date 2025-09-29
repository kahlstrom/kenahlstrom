import { motion } from 'framer-motion';

export default function TerminalFooter({ currentTime, terminalLines }) {
  return (
    <div className="mt-auto">
      {/* Terminal-style footer */}
      <div className="bg-black border-t border-gray-700 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-400 text-sm">kenneth@nomad-terminal:~$</span>
          </div>
          <div className="text-amber-400 text-sm">
            {currentTime.toLocaleTimeString()} UTC
          </div>
        </div>
      </div>
      
      {/* Boot sequence terminal */}
      <div className="bg-black p-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-1">
            {terminalLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 text-sm"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-700 p-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm font-mono">
            © 2024 Kenneth Ahlstrom | Software Engineer | Product Manager | Team Leader
          </p>
        </div>
      </footer>
    </div>
  );
}
