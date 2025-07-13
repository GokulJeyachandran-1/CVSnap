import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar, ExternalLink } from 'lucide-react';

export function ResumePreview() {
  const { state } = useResume();
  const { data, theme } = state;
  const { personalInfo, sections } = data;

  const enabledSections = sections.filter(section => section.enabled).sort((a, b) => a.order - b.order);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatYear = (yearString: string) => {
    return yearString || '';
  };

  // Layout-specific styling
  const getLayoutStyles = () => {
    const baseStyles = {
      fontFamily: theme.fontFamily,
      color: '#1f2937'
    };

    switch (theme.layout) {
      case 'classic':
        return {
          ...baseStyles,
          backgroundColor: '#ffffff',
          borderLeft: `4px solid ${theme.primaryColor}`
        };
      case 'creative':
        return {
          ...baseStyles,
          backgroundColor: '#fafafa',
          background: `linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)`
        };
      case 'minimal':
        return {
          ...baseStyles,
          backgroundColor: '#ffffff',
          borderTop: `2px solid ${theme.primaryColor}`
        };
      case 'executive':
        return {
          ...baseStyles,
          backgroundColor: '#ffffff',
          boxShadow: 'inset 0 0 0 1px #e5e7eb'
        };
      case 'tech':
        return {
          ...baseStyles,
          backgroundColor: '#fafafa',
          fontFamily: '"SF Mono", Monaco, "Cascadia Code", monospace'
        };
      case 'elegant':
        return {
          ...baseStyles,
          backgroundColor: '#fffef7',
          borderBottom: `3px solid ${theme.primaryColor}`
        };
      case 'contemporary':
        return {
          ...baseStyles,
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          overflow: 'hidden'
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: '#ffffff'
        };
    }
  };

  const getSectionHeaderStyle = () => {
    const baseStyle = {
      color: theme.primaryColor,
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '12px',
      paddingBottom: '4px'
    };

    switch (theme.layout) {
      case 'classic':
        return {
          ...baseStyle,
          borderBottom: `2px solid ${theme.primaryColor}`,
          textTransform: 'uppercase' as const,
          letterSpacing: '1px',
          fontSize: '14px'
        };
      case 'creative':
        return {
          ...baseStyle,
          background: `linear-gradient(90deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '18px',
          fontWeight: '700'
        };
      case 'minimal':
        return {
          ...baseStyle,
          borderBottom: `1px solid ${theme.secondaryColor}`,
          fontSize: '15px',
          fontWeight: '500'
        };
      case 'executive':
        return {
          ...baseStyle,
          backgroundColor: theme.primaryColor,
          color: 'white',
          padding: '8px 16px',
          margin: '0 -16px 12px -16px',
          fontSize: '15px'
        };
      case 'tech':
        return {
          ...baseStyle,
          borderLeft: `4px solid ${theme.primaryColor}`,
          paddingLeft: '12px',
          fontSize: '14px',
          fontFamily: 'inherit'
        };
      case 'elegant':
        return {
          ...baseStyle,
          borderBottom: `2px dotted ${theme.primaryColor}`,
          fontSize: '17px',
          fontStyle: 'italic'
        };
      case 'contemporary':
        return {
          ...baseStyle,
          borderBottom: `3px solid ${theme.primaryColor}`,
          borderRadius: '2px',
          fontSize: '16px'
        };
      default:
        return {
          ...baseStyle,
          borderBottom: `2px solid ${theme.primaryColor}`
        };
    }
  };

  const sectionComponents = {
    careerObjective: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Career Objective</h2>
        {data.careerObjective.map((objective) => (
          <div key={objective.id} className="mb-3">
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#374151', textAlign: 'justify' }}>
              {objective.customObjective}
            </p>
          </div>
        ))}
      </section>
    ),

    technicalSummary: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Technical Summary</h2>
        {data.technicalSummary.map((summary) => (
          <div key={summary.id} className="mb-4">
            {summary.keySkills.length > 0 && (
              <div className="mb-2">
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#1f2937' }}>Key Skills: </span>
                <span style={{ fontSize: '13px', color: '#374151' }}>{summary.keySkills.join(', ')}</span>
              </div>
            )}
            {summary.backendFocus.length > 0 && (
              <div className="mb-2">
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#1f2937' }}>Backend Focus: </span>
                <span style={{ fontSize: '13px', color: '#374151' }}>{summary.backendFocus.join(', ')}</span>
              </div>
            )}
            {summary.devTools.length > 0 && (
              <div className="mb-2">
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#1f2937' }}>Dev Tools: </span>
                <span style={{ fontSize: '13px', color: '#374151' }}>{summary.devTools.join(', ')}</span>
              </div>
            )}
            {summary.deployment.length > 0 && (
              <div className="mb-2">
                <span style={{ fontWeight: '600', fontSize: '13px', color: '#1f2937' }}>Deployment: </span>
                <span style={{ fontSize: '13px', color: '#374151' }}>{summary.deployment.join(', ')}</span>
              </div>
            )}
          </div>
        ))}
      </section>
    ),

    experience: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Work Experience</h2>
        {data.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>{exp.jobTitle}</h3>
                <p style={{ fontSize: '13px', color: '#374151' }}>{exp.company} • {exp.location}</p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#6b7280' }}>
                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
              </div>
            </div>
            <ul style={{ listStyleType: 'disc', paddingLeft: '16px', fontSize: '13px', color: '#374151', lineHeight: '1.5' }}>
              {exp.responsibilities.filter(resp => resp.trim()).map((resp, index) => (
                <li key={index} style={{ marginBottom: '2px' }}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    ),

    education: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Education</h2>
        {data.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>{edu.degree}</h3>
                <p style={{ fontSize: '13px', color: '#374151' }}>{edu.institution} • {edu.location}</p>
                {(edu.percentage || edu.cgpa) && (
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>
                    {edu.percentage && `Percentage: ${edu.percentage}`}
                    {edu.percentage && edu.cgpa && ' • '}
                    {edu.cgpa && `CGPA: ${edu.cgpa}`}
                  </p>
                )}
                {edu.relevantCoursework.length > 0 && (
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>
                    <span style={{ fontWeight: '600' }}>Relevant Coursework: </span>
                    {edu.relevantCoursework.join(', ')}
                  </p>
                )}
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#6b7280' }}>
                {formatYear(edu.completionYear)}
              </div>
            </div>
          </div>
        ))}
      </section>
    ),

    projects: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Projects</h2>
        {data.projects.map((project) => (
          <div key={project.id} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>{project.title}</h3>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>{project.role}</p>
                {(project.githubLink || project.liveUrl) && (
                  <div className="flex space-x-3 mt-1">
                    {project.githubLink && (
                      <span style={{ color: theme.primaryColor, fontSize: '11px' }}>
                        GitHub: {project.githubLink}
                      </span>
                    )}
                    {project.liveUrl && (
                      <span style={{ color: theme.primaryColor, fontSize: '11px' }}>
                        Live: {project.liveUrl}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            {project.summary && (
              <p style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>{project.summary}</p>
            )}
            {project.problemSolved && (
              <p style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Problem: </span>{project.problemSolved}
              </p>
            )}
            {project.keyImplementation && (
              <p style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Implementation: </span>{project.keyImplementation}
              </p>
            )}
            {project.outcomes && (
              <p style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Outcomes: </span>{project.outcomes}
              </p>
            )}
            {project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {project.techStack.map((tech, index) => (
                  <span 
                    key={index} 
                    style={{ 
                      fontSize: '10px', 
                      padding: '2px 6px', 
                      backgroundColor: '#f3f4f6', 
                      borderRadius: '12px', 
                      color: '#374151' 
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    ),

    skills: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Skills</h2>
        {['programming', 'frameworks', 'tools', 'soft', 'other'].map(category => {
          const categorySkills = data.skills.filter(skill => skill.category === category);
          if (categorySkills.length === 0) return null;
          
          const categoryLabels = {
            programming: 'Programming Languages',
            frameworks: 'Frameworks & Libraries',
            tools: 'Tools & Technologies',
            soft: 'Soft Skills',
            other: 'Other Skills'
          };

          return (
            <div key={category} className="mb-3">
              <span style={{ fontWeight: '600', fontSize: '13px', color: '#1f2937' }}>
                {categoryLabels[category as keyof typeof categoryLabels]}: 
              </span>
              <span style={{ fontSize: '13px', color: '#374151' }}>
                {categorySkills.map(skill => `${skill.name} (${skill.level})`).join(', ')}
              </span>
            </div>
          );
        })}
      </section>
    ),

    certifications: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Certifications & Courses</h2>
        {data.certifications.map((cert) => (
          <div key={cert.id} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>{cert.title}</h3>
                <p style={{ fontSize: '13px', color: '#374151' }}>{cert.platform}</p>
                {cert.description && (
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{cert.description}</p>
                )}
                {cert.certificateUrl && (
                  <span style={{ color: theme.primaryColor, fontSize: '11px' }}>
                    Certificate: {cert.certificateUrl}
                  </span>
                )}
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#6b7280' }}>
                {formatDate(cert.completionDate)}
              </div>
            </div>
          </div>
        ))}
      </section>
    ),

    languages: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Languages</h2>
        <div className="grid grid-cols-2 gap-2">
          {data.languages.map((language) => (
            <div key={language.id} className="flex justify-between items-center">
              <span style={{ fontSize: '13px', color: '#374151' }}>{language.name}</span>
              <span 
                style={{ 
                  fontSize: '10px', 
                  padding: '2px 6px', 
                  borderRadius: '12px', 
                  backgroundColor: '#f3f4f6',
                  color: theme.primaryColor 
                }}
              >
                {language.proficiency}
              </span>
            </div>
          ))}
        </div>
      </section>
    ),

    problemSolving: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Problem Solving Highlights</h2>
        {data.problemSolving.map((problem) => (
          <div key={problem.id} className="mb-4">
            <h3 style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937', marginBottom: '4px' }}>
              {problem.problemFaced}
            </h3>
            <p style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>
              <span style={{ fontWeight: '600' }}>Tools Used: </span>{problem.toolsUsed.join(', ')}
            </p>
            <p style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>
              <span style={{ fontWeight: '600' }}>Solution: </span>{problem.solution}
            </p>
            <p style={{ fontSize: '13px', color: '#374151' }}>
              <span style={{ fontWeight: '600' }}>Impact: </span>{problem.impact}
            </p>
          </div>
        ))}
      </section>
    ),

    achievements: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Achievements & Recognitions</h2>
        {data.achievements.map((achievement) => (
          <div key={achievement.id} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>{achievement.title}</h3>
                <p style={{ fontSize: '13px', color: '#374151' }}>{achievement.eventType} • {achievement.issuer}</p>
                {achievement.description && (
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{achievement.description}</p>
                )}
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#6b7280' }}>
                {formatDate(achievement.date)}
              </div>
            </div>
          </div>
        ))}
      </section>
    ),

    volunteerWork: () => (
      <section className="mb-6">
        <h2 style={getSectionHeaderStyle()}>Volunteer Work & Extracurricular</h2>
        {data.volunteerWork.map((work) => (
          <div key={work.id} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '14px', color: '#1f2937' }}>{work.activityType}</h3>
                <p style={{ fontSize: '13px', color: '#374151' }}>{work.organization}</p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '12px', color: '#6b7280' }}>
                {formatDate(work.startDate)} - {work.current ? 'Present' : formatDate(work.endDate)}
              </div>
            </div>
            {work.contribution && (
              <p style={{ fontSize: '13px', color: '#374151', marginBottom: '4px' }}>
                <span style={{ fontWeight: '600' }}>Contribution: </span>{work.contribution}
              </p>
            )}
            {work.impact && (
              <p style={{ fontSize: '13px', color: '#374151' }}>
                <span style={{ fontWeight: '600' }}>Impact: </span>{work.impact}
              </p>
            )}
          </div>
        ))}
      </section>
    )
  };

  return (
    <div 
      id="resume-preview" 
      className="bg-white shadow-lg max-w-4xl mx-auto print:shadow-none print:max-w-none" 
      style={getLayoutStyles()}
    >
      <div className="p-6 print:p-4">
        {/* Header */}
        <header className="mb-4 flex items-start space-x-4 avoid-break">
          {/* Profile Image */}
          {personalInfo.profileImage && (
            <div className="flex-shrink-0">
              <img
                src={personalInfo.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 print:w-12 print:h-12"
                style={{ borderColor: theme.primaryColor }}
              />
            </div>
          )}
          
          {/* Header Content */}
          <div className="flex-1">
            <h1 
              className="font-bold mb-2 print:mb-1" 
              style={{ 
                color: theme.primaryColor,
                fontSize: '24px',
                lineHeight: '1.2'
              }}
            >
              {personalInfo.fullName || 'Your Name'}
            </h1>
            
            <div className="flex flex-wrap gap-2 print:gap-1" style={{ fontSize: '11px', color: theme.secondaryColor }}>
            {personalInfo.email && (
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3 print:h-2 print:w-2" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3 print:h-2 print:w-2" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 print:h-2 print:w-2" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center space-x-1">
                <Globe className="h-3 w-3 print:h-2 print:w-2" />
                <span style={{ color: theme.primaryColor }}>
                  {personalInfo.website}
                </span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center space-x-1">
                <Linkedin className="h-3 w-3 print:h-2 print:w-2" />
                <span style={{ color: theme.primaryColor }}>
                  LinkedIn
                </span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center space-x-1">
                <Github className="h-3 w-3 print:h-2 print:w-2" />
                <span style={{ color: theme.primaryColor }}>
                  GitHub
                </span>
              </div>
            )}
            </div>
          </div>
        </header>

        {/* Dynamic Sections */}
        {enabledSections.map((section) => {
          const Component = sectionComponents[section.type];
          const hasData = {
            careerObjective: data.careerObjective.length > 0 && data.careerObjective.some(obj => obj.customObjective.trim()),
            technicalSummary: data.technicalSummary.length > 0,
            experience: data.experience.length > 0,
            education: data.education.length > 0,
            skills: data.skills.length > 0,
            projects: data.projects.length > 0,
            certifications: data.certifications.length > 0,
            languages: data.languages.length > 0,
            problemSolving: data.problemSolving.length > 0,
            achievements: data.achievements.length > 0,
            volunteerWork: data.volunteerWork.length > 0
          }[section.type];

          return hasData && Component ? (
            <div key={section.id} className="avoid-break">
              <Component />
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
}