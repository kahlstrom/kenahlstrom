"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  GitHubLogoIcon, 
  LinkedInLogoIcon, 
  ExternalLinkIcon,
  ReaderIcon,
  RocketIcon,
  PersonIcon,
  CodeIcon,
  LightningBoltIcon
} from '@radix-ui/react-icons';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const skillCategories = {
  "Current Stack": [
    "JavaScript", "TypeScript", "ReactJS", "NodeJS", "GraphQL", 
    "Hasura", "PostgreSQL", "NextJS", "GatsbyJS", "Material-UI", 
    "Styled-Components", "Jest", "ESLint", "Prettier", "AWS", "GCP"
  ],
  "Additional Expertise": [
    "Python", "ElasticSearch", "MongoDB", "MySQL", 
    "jQuery", "PHP", "Team Leadership", "Agile/Scrum"
  ]
};

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "Adobe, Lehi, UT",
    period: "September 2021 - May 2025",
    description: "Design, architect, and build productivity applications under the Workfront brand. Maintain and improve legacy Workfront applications written in Java and Javascript.",
    highlights: [
      "Lead developer in creating the Boards product for Workfront (similar to Trello)",
      "Earned the company millions of dollars through saved renewed contracts",
      "Acquired new contracts where customers specifically mentioned Boards as the reason for their business",
      "Architect modern productivity applications under enterprise-grade requirements"
    ]
  },
  {
    title: "Team Lead / Architect",
    company: "AeonVox LLC (self-employed)",
    period: "July 2019 - September 2021",
    description: "Architect and build web applications for clients. Lead disparate and changing teams as clients, arrangements, and projects change.",
    highlights: [
      "Delivery of multiple projects using various technologies",
      "Team leadership for various clients",
      "Open-source contributions",
      "Technology stack adaptation"
    ]
  },
  {
    title: "Director of Engineering and Product Management",
    company: "Deseret Digital Media",
    period: "October 2010 - April 2019",
    description: "Designed, architected, and built web applications from concept to completion. Led and mentored teams through complex application projects.",
    highlights: [
      "Built internal application unifying corporate sales and delivery processes",
      "Achieved audit compliance and improved sales efficiency",
      "Coordinated across multiple departments and distributed teams",
      "Maintained performant, agile, and transparent project teams"
    ]
  },
  {
    title: "Product Manager / Web Developer",
    company: "Niki Media Group",
    period: "October 2007 - February 2008",
    description: "Managed entire portfolio of web application projects for company client base. Led development of eCommerce and presentation websites.",
    highlights: [
      "Managed multiple projects on tight timelines",
      "Direct client interface and communication",
      "Custom PHP framework utilization"
    ]
  }
];

const generateResumePDF = () => {
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

const projects = [
  {
    title: "AtSynct",
    description: "A comprehensive SaaS platform that I built and currently sell, providing innovative solutions for business automation and workflow management.",
    technologies: ["SaaS", "Business Automation", "Workflow Management"],
    link: "https://atsynct.com",
    type: "SaaS Platform"
  },
  {
    title: "EFQM Corporate Site",
    description: "Corporate website development for the European Foundation for Quality Management.",
    technologies: ["React", "Node.js", "Corporate Web"],
    link: "https://efqm.org",
    type: "Corporate Website"
  },
  {
    title: "CrossBorder Solutions",
    description: "Cross-border business solutions platform with complex integrations and international compliance features.",
    technologies: ["JavaScript", "API Integration", "International Compliance"],
    link: "https://crossborder.ai",
    type: "Business Platform"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-32 h-32 rounded-full mx-auto mb-6 shadow-xl overflow-hidden border-4 border-white">
                <Image
                  src="/ProfileImage.png"
                  alt="Kenneth Ahlstrom"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl mb-6">
              Kenneth Ahlstrom
            </h1>
            
            <p className="text-xl text-gray-600 mb-4">
              Software Engineer | Product Manager | Team Leader
            </p>
            
            <p className="text-lg text-gray-500 mb-8">
              Highland, UT, USA
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center gap-4 mb-12"
            >
              <Button 
                variant="default" 
                size="lg" 
                className="gap-2"
                onClick={() => window.open('https://github.com/kahlstrom/', '_blank')}
              >
                <GitHubLogoIcon />
                GitHub
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2"
                onClick={() => window.open('https://www.linkedin.com/in/kenneth-ahlstrom-8284511a/', '_blank')}
              >
                <LinkedInLogoIcon />
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2"
                onClick={generateResumePDF}
              >
                <ReaderIcon />
                Resume
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            >
              {[
                { icon: <CodeIcon />, label: "Architecture" },
                { icon: <PersonIcon />, label: "Leadership" },
                { icon: <RocketIcon />, label: "Project Mgmt" },
                { icon: <LightningBoltIcon />, label: "Agile/Scrum" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 text-blue-600">
                    {item.icon}
                  </div>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-gray-900"
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                        <Badge variant="outline" className="mb-3">{project.type}</Badge>
                      </div>
                      {project.link && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-2"
                          onClick={() => window.open(project.link, '_blank')}
                        >
                          <ExternalLinkIcon />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl font-bold text-center mb-16 text-gray-900"
            >
              Technical Expertise
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(skillCategories).map(([category, skills]) => (
                <motion.div key={category} variants={fadeInUp}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <Badge variant="secondary" className="hover:bg-blue-100 transition-colors">
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-6xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-16 text-gray-900"
          >
            Professional Experience
          </motion.h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-1">{exp.title}</CardTitle>
                        <CardDescription className="text-lg font-medium text-blue-600">
                          {exp.company}
                        </CardDescription>
                        <p className="text-sm text-gray-500 mt-1">{exp.period}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-600">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Let&rsquo;s Work Together
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Ready to bring your next project to life? I&rsquo;m available for consulting, 
              team leadership, and architecture roles.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="gap-2"
                onClick={() => window.open('https://www.linkedin.com/in/kenneth-ahlstrom-8284511a/', '_blank')}
              >
                <LinkedInLogoIcon />
                Get In Touch
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                className="gap-2"
                onClick={generateResumePDF}
              >
                <ReaderIcon />
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-gray-900">
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">© 2024 Kenneth Ahlstrom. All rights reserved.</p>
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => window.open('https://github.com/kahlstrom/kenahlstrom', '_blank')}
              >
                <GitHubLogoIcon />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => window.open('https://www.linkedin.com/in/kenneth-ahlstrom-8284511a/', '_blank')}
              >
                <LinkedInLogoIcon />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
