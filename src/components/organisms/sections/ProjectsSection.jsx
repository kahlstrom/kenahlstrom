import ProjectCard from '@/components/molecules/ProjectCard';
import { projects } from '@/data/portfolio';

export default function ProjectsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}
    </div>
  );
}
