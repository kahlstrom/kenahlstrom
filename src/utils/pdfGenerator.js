import jsPDF from 'jspdf';
import { experiences, projects, skillCategories } from '@/data/portfolio';

export const generateResumePDF = () => {
  const doc = new jsPDF();
  let yPosition = 20;
  
  // Header
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('Kenneth Ahlstrom', 20, yPosition);
  yPosition += 10;
  
  doc.setFontSize(16);
  doc.setFont(undefined, 'normal');
  doc.text('Software Engineer | Product Manager | Team Leader', 20, yPosition);
  yPosition += 8;
  
  doc.setFontSize(12);
  doc.text('Highland, UT, USA', 20, yPosition);
  yPosition += 15;
  
  // Contact Info
  doc.setFontSize(10);
  doc.text('LinkedIn: linkedin.com/in/kenneth-ahlstrom-8284511a', 20, yPosition);
  yPosition += 5;
  doc.text('GitHub: github.com/kahlstrom/kenahlstrom', 20, yPosition);
  yPosition += 5;
  doc.text('Portfolio: kenahlstrom.dev', 20, yPosition);
  yPosition += 15;
  
  // Professional Experience
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Professional Experience', 20, yPosition);
  yPosition += 10;
  
  experiences.forEach((exp) => {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(exp.title, 20, yPosition);
    yPosition += 6;
    
    doc.setFont(undefined, 'normal');
    doc.text(`${exp.company} | ${exp.period}`, 20, yPosition);
    yPosition += 5;
    
    doc.setFontSize(10);
    const descriptionLines = doc.splitTextToSize(exp.description, 170);
    doc.text(descriptionLines, 20, yPosition);
    yPosition += descriptionLines.length * 4 + 2;
    
    exp.highlights.forEach((highlight) => {
      const bulletLines = doc.splitTextToSize(`• ${highlight}`, 165);
      doc.text(bulletLines, 25, yPosition);
      yPosition += bulletLines.length * 4;
    });
    yPosition += 5;
    
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
  });
  
  // Featured Projects
  if (yPosition > 200) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Featured Projects', 20, yPosition);
  yPosition += 10;
  
  projects.forEach((project) => {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`${project.title} (${project.type})`, 20, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const projectLines = doc.splitTextToSize(project.description, 170);
    doc.text(projectLines, 20, yPosition);
    yPosition += projectLines.length * 4 + 2;
    
    doc.text(`Technologies: ${project.technologies.join(', ')}`, 20, yPosition);
    yPosition += 8;
    
    if (yPosition > 270) {
      doc.addPage();
      yPosition = 20;
    }
  });
  
  // Technical Skills
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Technical Expertise', 20, yPosition);
  yPosition += 10;
  
  Object.entries(skillCategories).forEach(([category, skills]) => {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(category, 20, yPosition);
    yPosition += 6;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const skillsText = skills.join(', ');
    const skillLines = doc.splitTextToSize(skillsText, 170);
    doc.text(skillLines, 20, yPosition);
    yPosition += skillLines.length * 4 + 8;
  });
  
  // Save the PDF
  doc.save('Kenneth_Ahlstrom_Resume.pdf');
};
