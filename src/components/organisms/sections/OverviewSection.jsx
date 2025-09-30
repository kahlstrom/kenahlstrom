import Postcard from '@/components/atoms/Postcard';
import ProfileHeader from '@/components/molecules/ProfileHeader';
import SubstackFeed from '@/components/molecules/SubstackFeed';
import XFeed from '@/components/molecules/XFeed';

export default function OverviewSection() {
  return (
    <div className="space-y-6">
      <Postcard delay={0.1} hasStamp={true}>
        <ProfileHeader />
      </Postcard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Postcard delay={0.3} stampColor="amber">
          <SubstackFeed />
        </Postcard>
        
        <Postcard delay={0.4} stampColor="green">
          <XFeed />
        </Postcard>
      </div>
    </div>
  );
}
