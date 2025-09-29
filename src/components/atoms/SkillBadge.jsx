import { motion } from 'framer-motion';

export default function SkillBadge({ skill, index = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      className={`bg-slate-700 text-gray-300 px-2 py-1 rounded text-sm font-mono text-center hover:bg-amber-400/20 hover:text-amber-300 transition-all cursor-pointer ${className}`}
    >
      {skill}
    </motion.div>
  );
}
