import Postcard from '@/components/atoms/Postcard';
import ProjectCard from '@/components/molecules/ProjectCard';
import { projects } from '@/data/portfolio';

export default function ProjectsSection() {
  const stampColors = ['amber', 'green', 'cyan', 'amber'];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <Postcard key={index} delay={index * 0.15} stampColor={stampColors[index % stampColors.length]}>
          <ProjectCard project={project} index={0} />
        </Postcard>
      ))}
    </div>
  );
}
