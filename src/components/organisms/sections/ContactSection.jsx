import { LinkedInLogoIcon, GitHubLogoIcon, ReaderIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolio';
import { generateResumePDF } from '@/utils/pdfGenerator';

export default function ContactSection() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-amber-400/30 rounded p-6 text-center">
        <h3 className="text-amber-400 font-mono font-bold mb-4">Ready to collaborate?</h3>
        <p className="text-gray-300 font-mono mb-6 leading-relaxed">
          I&apos;m available for consulting, team leadership, and architecture roles. 
          Whether you&apos;re looking to build something new or improve existing systems, 
          I&apos;d love to discuss how we can work together.
        </p>
        
        <div className="flex justify-center gap-4 flex-wrap">
          <Button
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-mono font-bold"
            onClick={() => window.open(personalInfo.links.linkedin, '_blank')}
          >
            <LinkedInLogoIcon className="mr-2" />
            LinkedIn
          </Button>
          
          <Button
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-mono font-bold"
            onClick={() => window.open(personalInfo.links.github, '_blank')}
          >
            <GitHubLogoIcon className="mr-2" />
            GitHub
          </Button>
          
          <Button
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-black font-mono font-bold"
            onClick={generateResumePDF}
          >
            <ReaderIcon className="mr-2" />
            Resume
          </Button>
        </div>
      </div>
    </div>
  );
}
