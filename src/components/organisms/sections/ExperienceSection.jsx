import Postcard from '@/components/atoms/Postcard';
import ExperienceCard from '@/components/molecules/ExperienceCard';
import { experiences } from '@/data/portfolio';

export default function ExperienceSection() {
  const stampColors = ['green', 'amber', 'cyan', 'green'];
  
  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <Postcard key={index} delay={index * 0.15} stampColor={stampColors[index % stampColors.length]}>
          <ExperienceCard experience={exp} index={0} />
        </Postcard>
      ))}
    </div>
  );
}
