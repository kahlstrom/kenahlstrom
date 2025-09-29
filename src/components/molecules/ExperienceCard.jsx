import { motion } from 'framer-motion';

export default function ExperienceCard({ experience, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-800/50 border border-gray-600 rounded p-4 hover:border-green-400/50 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-green-400 font-mono font-bold">{experience.title}</h3>
          <p className="text-amber-300 font-mono">{experience.company}</p>
          <p className="text-gray-400 text-sm font-mono">{experience.period}</p>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-3 font-mono leading-relaxed">
        {experience.description}
      </p>
      
      <div className="space-y-1">
        {experience.highlights.map((highlight, idx) => (
          <motion.div 
            key={idx} 
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <span className="text-green-400 font-mono text-xs mt-1">→</span>
            <p className="text-gray-300 text-sm font-mono">{highlight}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
