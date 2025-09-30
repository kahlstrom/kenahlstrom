import Postcard from '@/components/atoms/Postcard';
import SkillCategory from '@/components/molecules/SkillCategory';
import { skillCategories } from '@/data/portfolio';

export default function SkillsSection() {
  const stampColors = ['amber', 'cyan'];
  
  return (
    <div className="space-y-6">
      {Object.entries(skillCategories).map(([category, skills], index) => (
        <Postcard key={category} delay={index * 0.2} stampColor={stampColors[index % stampColors.length]}>
          <SkillCategory category={category} skills={skills} />
        </Postcard>
      ))}
    </div>
  );
}
