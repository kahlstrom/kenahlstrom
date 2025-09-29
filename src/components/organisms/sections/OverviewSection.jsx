import ProfileHeader from '@/components/molecules/ProfileHeader';
import InfoPanel from '@/components/molecules/InfoPanel';
import TravelMap from '@/components/molecules/TravelMap';
import { professionalFocus, personalInterests } from '@/data/portfolio';

export default function OverviewSection() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoPanel
          title="PROFESSIONAL FOCUS"
          items={professionalFocus}
          borderColor="border-amber-400/30"
          titleColor="text-amber-400"
        />
        
        <InfoPanel
          title="PERSONAL INTERESTS"
          items={personalInterests}
          borderColor="border-green-400/30"
          titleColor="text-green-400"
        />
      </div>

      {/* Travel Map */}
      <TravelMap />
    </div>
  );
}
