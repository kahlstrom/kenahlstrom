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
      className="border-0"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-amber-900 font-mono font-bold text-lg">{project.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={project.status} />
            <span className="text-gray-700 text-xs font-mono">{project.type}</span>
          </div>
        </div>
        {project.link && (
          <Button
            size="sm"
            className="bg-amber-100 border border-amber-900/30 text-amber-900 hover:bg-amber-200"
            onClick={() => window.open(project.link, '_blank')}
          >
            <ExternalLinkIcon className="w-3 h-3" />
          </Button>
        )}
      </div>
      
      <p className="text-gray-800 text-sm mb-3 font-mono leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-1">
        {project.technologies.map((tech, idx) => (
          <span key={idx} className="px-2 py-1 bg-amber-100 text-amber-900 text-xs font-mono rounded border border-amber-900/20">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
