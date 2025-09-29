"use client";

import PortfolioLayout from '@/components/templates/PortfolioLayout';
import OverviewSection from '@/components/organisms/sections/OverviewSection';
import ProjectsSection from '@/components/organisms/sections/ProjectsSection';
import SkillsSection from '@/components/organisms/sections/SkillsSection';
import ExperienceSection from '@/components/organisms/sections/ExperienceSection';
import ContactSection from '@/components/organisms/sections/ContactSection';

const sectionContent = {
  mission: {
    title: "OVERVIEW",
    component: OverviewSection
  },
  projects: {
    title: "FEATURED PROJECTS",
    component: ProjectsSection
  },
  skills: {
    title: "TECHNICAL SKILLS",
    component: SkillsSection
  },
  experience: {
    title: "EXPERIENCE",
    component: ExperienceSection
  },
  contact: {
    title: "GET IN TOUCH",
    component: ContactSection
  }
};

export default function Home() {
  const renderSection = (activeSection) => {
    const SectionComponent = sectionContent[activeSection].component;
    return <SectionComponent />;
  };

  return (
    <PortfolioLayout sections={sectionContent}>
      {renderSection}
    </PortfolioLayout>
  );
}