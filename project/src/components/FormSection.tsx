import React from 'react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { TechnicalSummaryForm } from './TechnicalSummaryForm';
import { CareerObjectiveForm } from './CareerObjectiveForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificationsForm } from './CertificationsForm';
import { LanguagesForm } from './LanguagesForm';
import { ProblemSolvingForm } from './ProblemSolvingForm';
import { AchievementsForm } from './AchievementsForm';
import { VolunteerWorkForm } from './VolunteerWorkForm';
import { SectionManager } from './SectionManager';
import { ThemeSelector } from './ThemeSelector';
import { useResume } from '../context/ResumeContext';

export function FormSection() {
  const { state } = useResume();
  const { sections } = state.data;

  const enabledSections = sections.filter(section => section.enabled).sort((a, b) => a.order - b.order);

  const sectionComponents = {
    technicalSummary: TechnicalSummaryForm,
    careerObjective: CareerObjectiveForm,
    experience: ExperienceForm,
    education: EducationForm,
    skills: SkillsForm,
    projects: ProjectsForm,
    certifications: CertificationsForm,
    languages: LanguagesForm,
    problemSolving: ProblemSolvingForm,
    achievements: AchievementsForm,
    volunteerWork: VolunteerWorkForm
  };

  return (
    <div className="space-y-8">
      <PersonalInfoForm />
      <SectionManager />
      <ThemeSelector />
      
      {enabledSections.map((section) => {
        const Component = sectionComponents[section.type];
        return Component ? <Component key={section.id} /> : null;
      })}
    </div>
  );
}