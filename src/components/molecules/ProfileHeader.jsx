import Image from 'next/image';
import { GlobeIcon } from '@radix-ui/react-icons';
import { personalInfo } from '@/data/portfolio';

export default function ProfileHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-2 border-amber-400 p-1">
          <div className="w-full h-full rounded-full overflow-hidden">
            <Image
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-amber-900 font-mono">{personalInfo.name.toUpperCase()}</h2>
        <p className="text-green-900 font-mono font-semibold">{personalInfo.title}</p>
        <p className="text-gray-700 text-sm font-mono flex items-center gap-2 mt-1">
          <GlobeIcon className="text-amber-700" />
          {personalInfo.location} | {personalInfo.status}
        </p>
      </div>
    </div>
  );
}
