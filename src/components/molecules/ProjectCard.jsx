import { motion } from 'framer-motion';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/atoms/StatusBadge';
import TechBadge from '@/components/atoms/TechBadge';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-slate-800/50 border border-gray-600 rounded p-4 hover:border-amber-400/50 transition-all duration-300 group"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-amber-300 font-mono font-bold">{project.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={project.status} />
            <span className="text-gray-400 text-xs font-mono">{project.type}</span>
          </div>
        </div>
        {project.link && (
          <Button
            size="sm"
            className="bg-transparent border border-amber-400/30 text-amber-400 hover:bg-amber-400/10"
            onClick={() => window.open(project.link, '_blank')}
          >
            <ExternalLinkIcon className="w-3 h-3" />
          </Button>
        )}
      </div>
      
      <p className="text-gray-300 text-sm mb-3 font-mono leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-1">
        {project.technologies.map((tech, idx) => (
          <TechBadge key={idx} tech={tech} />
        ))}
      </div>
    </motion.div>
  );
}
