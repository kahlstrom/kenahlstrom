import Postcard from '@/components/atoms/Postcard';
import SpotifyActivity from '@/components/molecules/SpotifyActivity';
import SteamActivity from '@/components/molecules/SteamActivity';
import AboutMe from '@/components/molecules/AboutMe';
import RecommendedReading from '@/components/molecules/RecommendedReading';

export default function PersonalSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Postcard delay={0.1} stampColor="amber">
        <AboutMe />
      </Postcard>

      <Postcard delay={0.2} stampColor="amber">
        <RecommendedReading />
      </Postcard>

      <Postcard delay={0.3} stampColor="green">
        <SpotifyActivity />
      </Postcard>

      <Postcard delay={0.4} stampColor="cyan">
        <SteamActivity />
      </Postcard>
    </div>
  );
}
