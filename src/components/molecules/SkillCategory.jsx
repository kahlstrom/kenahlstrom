import { StarIcon } from '@radix-ui/react-icons';
import SkillBadge from '@/components/atoms/SkillBadge';

export default function SkillCategory({ category, skills }) {
  return (
    <div className="bg-slate-800/50 border border-gray-600 rounded p-4">
      <h3 className="text-amber-400 font-mono font-bold mb-3 flex items-center gap-2">
        <StarIcon className="text-amber-400" />
        {category}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {skills.map((skill, index) => (
          <SkillBadge key={skill} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}
