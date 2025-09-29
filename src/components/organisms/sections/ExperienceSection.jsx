import ExperienceCard from '@/components/molecules/ExperienceCard';
import { experiences } from '@/data/portfolio';

export default function ExperienceSection() {
  return (
    <div className="space-y-4">
      {experiences.map((exp, index) => (
        <ExperienceCard key={index} experience={exp} index={index} />
      ))}
    </div>
  );
}
