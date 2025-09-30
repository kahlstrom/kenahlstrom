import { StarIcon } from '@radix-ui/react-icons';
import SkillBadge from '@/components/atoms/SkillBadge';

export default function SkillCategory({ category, skills }) {
  return (
    <div className="border-0">
      <h3 className="text-amber-900 font-mono font-bold mb-3 flex items-center gap-2 text-lg">
        <StarIcon className="text-amber-700" />
        {category}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {skills.map((skill, index) => (
          <div key={skill} className="bg-amber-100 text-gray-800 px-2 py-1 rounded text-sm font-mono text-center border border-amber-900/20 hover:bg-amber-200 transition-all cursor-pointer">
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}
