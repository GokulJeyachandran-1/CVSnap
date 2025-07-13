export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  profileImage?: string;
}

export interface TechnicalSummary {
  id: string;
  keySkills: string[];
  backendFocus: string[];
  devTools: string[];
  deployment: string[];
  customSkills: string[];
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  completionYear: string;
  percentage?: string;
  cgpa?: string;
  relevantCoursework: string[];
}

export interface Project {
  id: string;
  title: string;
  role: string;
  techStack: string[];
  githubLink?: string;
  liveUrl?: string;
  summary: string;
  problemSolved: string;
  keyImplementation: string;
  outcomes: string;
}

export interface Certification {
  id: string;
  title: string;
  platform: string;
  completionDate: string;
  certificateUrl?: string;
  description?: string;
}

export interface Skill {
  id: string;
  category: 'programming' | 'frameworks' | 'tools' | 'soft' | 'other';
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Conversational' | 'Basic';
}

export interface CareerObjective {
  id: string;
  roleFocus: string;
  vision: string;
  tone: 'Passionate' | 'Professional' | 'Creative';
  customObjective: string;
}

export interface ProblemSolving {
  id: string;
  problemFaced: string;
  toolsUsed: string[];
  solution: string;
  impact: string;
}

export interface Achievement {
  id: string;
  eventType: string;
  issuer: string;
  date: string;
  title: string;
  description: string;
}

export interface VolunteerWork {
  id: string;
  activityType: string;
  organization: string;
  startDate: string;
  endDate: string;
  current: boolean;
  contribution: string;
  impact: string;
}

export interface ResumeSection {
  id: string;
  type: 'technicalSummary' | 'experience' | 'education' | 'projects' | 'certifications' | 'skills' | 'languages' | 'careerObjective' | 'problemSolving' | 'achievements' | 'volunteerWork';
  title: string;
  enabled: boolean;
  order: number;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  sections: ResumeSection[];
  technicalSummary: TechnicalSummary[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  skills: Skill[];
  languages: Language[];
  careerObjective: CareerObjective[];
  problemSolving: ProblemSolving[];
  achievements: Achievement[];
  volunteerWork: VolunteerWork[];
}

export interface ResumeTheme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: 'modern' | 'classic' | 'minimal' | 'creative' | 'executive' | 'tech' | 'elegant' | 'contemporary';
}

// Dropdown options
export const DROPDOWN_OPTIONS = {
  keySkills: [
    'Java', 'Spring Boot', 'MySQL', 'REST APIs', 'Maven', 'Git', 'Logback', 'SLF4J',
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'PostgreSQL',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Jenkins', 'CI/CD'
  ],
  backendFocus: [
    'Microservices', 'Authentication/Authorization', 'DB Optimization', 'API Design',
    'System Architecture', 'Performance Tuning', 'Security Implementation', 'Data Modeling'
  ],
  devTools: [
    'VS Code', 'IntelliJ IDEA', 'Postman', 'GitHub', 'GitLab', 'Jira', 'Confluence',
    'Eclipse', 'Sublime Text', 'Vim', 'Docker Desktop', 'Insomnia'
  ],
  deployment: [
    'Docker', 'AWS Basics', 'CI/CD Pipelines', 'Kubernetes', 'Heroku', 'Netlify',
    'Vercel', 'Jenkins', 'GitHub Actions', 'Azure DevOps'
  ],
  jobTitles: [
    'Software Engineer', 'Backend Developer', 'Full Stack Developer', 'Frontend Developer',
    'DevOps Engineer', 'Data Analyst', 'Product Manager', 'QA Engineer', 'Intern'
  ],
  degrees: [
    'B.E. in Computer Science', 'B.Tech in Computer Science', 'B.Sc in Computer Science',
    'M.E. in Computer Science', 'M.Tech in Computer Science', 'MCA', 'BCA',
    'B.E. in Information Technology', 'B.Tech in Information Technology'
  ],
  coursework: [
    'Data Structures', 'DBMS', 'OOPs', 'Operating Systems', 'Computer Networks',
    'Software Engineering', 'Web Development', 'Machine Learning', 'Algorithms',
    'System Design', 'Database Design', 'Computer Graphics'
  ],
  projectRoles: [
    'Backend Developer', 'Frontend Developer', 'Full Stack Developer', 'Team Lead',
    'Solo Developer', 'Database Designer', 'API Developer', 'UI/UX Designer'
  ],
  techStack: [
    'Spring Boot', 'React', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'PostgreSQL',
    'Java', 'JavaScript', 'TypeScript', 'Python', 'HTML/CSS', 'Bootstrap', 'Tailwind CSS'
  ],
  platforms: [
    'Cognizant', 'Coursera', 'Udemy', 'edX', 'Pluralsight', 'LinkedIn Learning',
    'FreeCodeCamp', 'Codecademy', 'Khan Academy', 'MIT OpenCourseWare'
  ],
  programmingLanguages: [
    'Java', 'JavaScript', 'TypeScript', 'Python', 'C++', 'C#', 'Go', 'Rust',
    'PHP', 'Ruby', 'Swift', 'Kotlin', 'SQL'
  ],
  frameworks: [
    'Spring Boot', 'React', 'Angular', 'Vue.js', 'Express.js', 'Django', 'Flask',
    'Laravel', 'ASP.NET', 'Ruby on Rails'
  ],
  tools: [
    'Maven', 'Git', 'Logback', 'Docker', 'Kubernetes', 'Jenkins', 'Postman',
    'Jira', 'Confluence', 'Slack', 'Trello'
  ],
  softSkills: [
    'Communication', 'Problem Solving', 'Time Management', 'Leadership', 'Teamwork',
    'Critical Thinking', 'Adaptability', 'Creativity', 'Attention to Detail'
  ],
  languages: [
    'Tamil', 'English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese',
    'Korean', 'Arabic', 'Portuguese', 'Russian'
  ],
  roleFocus: [
    'Full-stack Developer', 'Backend Engineer', 'Frontend Developer', 'DevOps Engineer',
    'Software Architect', 'Data Engineer', 'Mobile Developer', 'Cloud Engineer'
  ],
  vision: [
    'Scalable System Builder', 'Healthcare Tech Innovator', 'Fintech Specialist',
    'E-commerce Expert', 'AI/ML Enthusiast', 'Open Source Contributor'
  ],
  problemTypes: [
    'Maven lifecycle error', 'DB deadlocks', 'Memory leaks', 'Performance bottlenecks',
    'API integration issues', 'Authentication failures', 'Deployment errors'
  ],
  debuggingTools: [
    'Logs', 'Breakpoints', 'Community threads', 'Stack Overflow', 'Profilers',
    'Monitoring tools', 'Unit tests', 'Integration tests'
  ],
  eventTypes: [
    'Hackathon', 'Coding Challenge', 'Certification', 'Competition', 'Conference',
    'Workshop', 'Scholarship', 'Award', 'Recognition'
  ],
  activityTypes: [
    'Teaching/Mentoring', 'Community Service', 'Environmental Initiative', 'Tech Talks',
    'Open Source Contribution', 'Event Organization', 'Fundraising', 'Social Work'
  ]
};