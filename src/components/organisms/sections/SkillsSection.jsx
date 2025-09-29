import SkillCategory from '@/components/molecules/SkillCategory';
import { skillCategories } from '@/data/portfolio';

export default function SkillsSection() {
  return (
    <div className="space-y-6">
      {Object.entries(skillCategories).map(([category, skills]) => (
        <SkillCategory key={category} category={category} skills={skills} />
      ))}
    </div>
  );
}
