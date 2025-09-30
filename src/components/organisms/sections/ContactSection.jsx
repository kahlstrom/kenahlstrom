import Postcard from '@/components/atoms/Postcard';
import { LinkedInLogoIcon, GitHubLogoIcon, ReaderIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolio';
import { generateResumePDF } from '@/utils/pdfGenerator';

export default function ContactSection() {
  return (
    <Postcard delay={0.2} stampColor="amber" className="text-center">
      <h3 className="text-amber-900 font-mono font-bold mb-4 text-xl">Ready to collaborate?</h3>
      <p className="text-gray-800 font-mono mb-6 leading-relaxed">
        I&apos;m available for consulting, team leadership, and architecture roles. 
        Whether you&apos;re looking to build something new or improve existing systems, 
        I&apos;d love to discuss how we can work together.
      </p>
      
      <div className="flex justify-center gap-4 flex-wrap">
        <Button
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-mono font-bold shadow-lg"
          onClick={() => window.open(personalInfo.links.linkedin, '_blank')}
        >
          <LinkedInLogoIcon className="mr-2" />
          LinkedIn
        </Button>
        
        <Button
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-mono font-bold shadow-lg"
          onClick={() => window.open(personalInfo.links.github, '_blank')}
        >
          <GitHubLogoIcon className="mr-2" />
          GitHub
        </Button>
        
        <Button
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-mono font-bold shadow-lg"
          onClick={generateResumePDF}
        >
          <ReaderIcon className="mr-2" />
          Resume
        </Button>
      </div>
    </Postcard>
  );
}
