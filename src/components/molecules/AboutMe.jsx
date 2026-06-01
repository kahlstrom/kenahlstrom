import { aboutMeContent } from '@/data/aboutMe';
import MarkdownContent from '@/components/molecules/MarkdownContent';

/**
 * AboutMe - Editable markdown bio card for the Personal section.
 */
export default function AboutMe() {
  return (
    <div className="border-0">
      <h3 className="text-amber-900 font-mono text-lg font-bold mb-3">ABOUT ME</h3>
      <MarkdownContent content={aboutMeContent} />
    </div>
  );
}
