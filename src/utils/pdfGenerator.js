import jsPDF from 'jspdf';
import { experiences, projects, skillCategories } from '@/data/portfolio';

export const generateResumePDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = 0;
  
  // Color palette (RGB values)
  const colors = {
    primary: [217, 119, 6], // Amber-600
    secondary: [249, 115, 22], // Orange-600
    accent: [14, 165, 233], // Sky-500
    dark: [31, 41, 55], // Gray-800
    light: [249, 250, 251], // Gray-50
    text: [55, 65, 81], // Gray-700
    lightText: [107, 114, 128] // Gray-500
  };
  
  /**
   * Helper function to draw a colored header banner
   */
  const drawHeaderBanner = () => {
    // Gradient-like effect with rectangles
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // Add decorative accent line
    doc.setFillColor(...colors.secondary);
    doc.rect(0, 48, pageWidth, 2, 'F');
    
    // Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.text('KENNETH AHLSTROM', pageWidth / 2, 20, { align: 'center' });
    
    // Title
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Software Engineer | Consultant | Problem Solver', pageWidth / 2, 30, { align: 'center' });
    
    // Contact info in header
    doc.setFontSize(9);
    const contactY = 40;
    const contactInfo = [
      'Highland, UT',
      'linkedin.com/in/kenneth-ahlstrom-8284511a',
      'kenahlstrom.dev'
    ];
    doc.text(contactInfo.join('  •  '), pageWidth / 2, contactY, { align: 'center' });
    
    yPosition = 58;
  };
  
  /**
   * Helper function to draw section header with colored background
   */
  const drawSectionHeader = (title, y) => {
    // Background bar
    doc.setFillColor(...colors.dark);
    doc.rect(margin, y - 6, pageWidth - (margin * 2), 10, 'F');
    
    // Accent line on left
    doc.setFillColor(...colors.primary);
    doc.rect(margin, y - 6, 3, 10, 'F');
    
    // Section title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(title.toUpperCase(), margin + 6, y + 1);
    
    // Reset text color
    doc.setTextColor(...colors.text);
    
    return y + 10;
  };
  
  /**
   * Helper function to draw a horizontal separator
   */
  const drawSeparator = (y) => {
    doc.setDrawColor(...colors.lightText);
    doc.setLineWidth(0.3);
    doc.line(margin + 5, y, pageWidth - margin - 5, y);
    return y + 3;
  };
  
  /**
   * Helper function to check if we need a new page
   */
  const checkPageBreak = (requiredSpace) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };
  
  /**
   * Helper function to draw skill badges in a grid
   */
  const drawSkillBadges = (skills, startY) => {
    let currentY = startY;
    let currentX = margin + 5;
    const badgeHeight = 7;
    const badgePadding = 2;
    const maxWidth = pageWidth - (margin * 2) - 10;
    
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    
    skills.forEach((skill, index) => {
      const textWidth = doc.getTextWidth(skill);
      const badgeWidth = textWidth + (badgePadding * 2);
      
      // Check if we need to wrap to next line
      if (currentX + badgeWidth > margin + maxWidth && currentX > margin + 5) {
        currentX = margin + 5;
        currentY += badgeHeight + 2;
      }
      
      // Draw badge background
      doc.setFillColor(...colors.light);
      doc.setDrawColor(...colors.primary);
      doc.setLineWidth(0.3);
      doc.roundedRect(currentX, currentY, badgeWidth, badgeHeight, 1, 1, 'FD');
      
      // Draw skill text
      doc.setTextColor(...colors.dark);
      doc.text(skill, currentX + badgePadding, currentY + 5);
      
      currentX += badgeWidth + 3;
    });
    
    return currentY + badgeHeight + 3;
  };
  
  // ==================== START BUILDING PDF ====================
  
  // Draw header banner
  drawHeaderBanner();
  
  // ==================== PROFESSIONAL EXPERIENCE ====================
  yPosition += 5;
  yPosition = drawSectionHeader('Professional Experience', yPosition);
  yPosition += 5;
  
  experiences.forEach((exp, index) => {
    checkPageBreak(40);
    
    // Job title
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.dark);
    doc.text(exp.title, margin + 5, yPosition);
    yPosition += 6;
    
    // Company and period
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...colors.accent);
    doc.text(exp.company, margin + 5, yPosition);
    
    // Period aligned to right
    doc.setTextColor(...colors.lightText);
    const periodWidth = doc.getTextWidth(exp.period);
    doc.text(exp.period, pageWidth - margin - 5 - periodWidth, yPosition);
    yPosition += 6;
    
    // Description
    doc.setFontSize(9);
    doc.setTextColor(...colors.text);
    doc.setFont(undefined, 'italic');
    const descriptionLines = doc.splitTextToSize(exp.description, pageWidth - (margin * 2) - 15);
    doc.text(descriptionLines, margin + 5, yPosition);
    yPosition += descriptionLines.length * 4;
    
    // Highlights
    doc.setFont(undefined, 'normal');
    yPosition += 2;
    exp.highlights.forEach((highlight) => {
      checkPageBreak(10);
      
      // Bullet point
      doc.setFillColor(...colors.primary);
      doc.circle(margin + 8, yPosition - 1.5, 0.8, 'F');
      
      const bulletLines = doc.splitTextToSize(highlight, pageWidth - (margin * 2) - 20);
      doc.text(bulletLines, margin + 12, yPosition);
      yPosition += bulletLines.length * 4;
    });
    
    // Separator between experiences
    if (index < experiences.length - 1) {
      yPosition += 2;
      yPosition = drawSeparator(yPosition);
      yPosition += 3;
    } else {
      yPosition += 5;
    }
  });
  
  // ==================== FEATURED PROJECTS ====================
  checkPageBreak(50);
  yPosition = drawSectionHeader('Featured Projects', yPosition);
  yPosition += 5;
  
  projects.forEach((project, index) => {
    checkPageBreak(30);
    
    // Project title
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.dark);
    doc.text(project.title, margin + 5, yPosition);
    yPosition += 5;
    
    // Project type on separate line
    doc.setFontSize(8);
    doc.setFont(undefined, 'italic');
    doc.setTextColor(...colors.lightText);
    doc.text(project.type, margin + 5, yPosition);
    yPosition += 5;
    
    // Description
    doc.setFontSize(9);
    doc.setTextColor(...colors.text);
    const projectLines = doc.splitTextToSize(project.description, pageWidth - (margin * 2) - 15);
    doc.text(projectLines, margin + 5, yPosition);
    yPosition += projectLines.length * 4 + 2;
    
    // Technologies with icon
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.lightText);
    doc.text('Tech Stack:', margin + 5, yPosition);
    doc.setFont(undefined, 'normal');
    const techText = ' ' + project.technologies.join(' • ');
    const techWidth = doc.getTextWidth('Tech Stack:');
    doc.text(techText, margin + 5 + techWidth, yPosition);
    yPosition += 8;
    
    // Separator between projects
    if (index < projects.length - 1) {
      yPosition = drawSeparator(yPosition);
      yPosition += 2;
    }
  });
  
  // ==================== TECHNICAL EXPERTISE ====================
  checkPageBreak(60);
  yPosition += 5;
  yPosition = drawSectionHeader('Technical Expertise', yPosition);
  yPosition += 8;
  
  Object.entries(skillCategories).forEach(([category, skills]) => {
    checkPageBreak(30);
    
    // Category name
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.dark);
    doc.text(category, margin + 5, yPosition);
    yPosition += 6;
    
    // Draw skill badges
    yPosition = drawSkillBadges(skills, yPosition);
    yPosition += 6;
  });
  
  // ==================== FOOTER ====================
  const addFooter = (pageNum) => {
    doc.setFontSize(8);
    doc.setTextColor(...colors.lightText);
    doc.setFont(undefined, 'normal');
    
    // Footer line
    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(0.5);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    
    // Footer text
    doc.text('Kenneth Ahlstrom - Software Engineer', margin, pageHeight - 7);
    doc.text(`Page ${pageNum}`, pageWidth - margin - 10, pageHeight - 7);
  };
  
  // Add footers to all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter(i);
  }
  
  // Save the PDF
  doc.save('Kenneth_Ahlstrom_Resume.pdf');
};
