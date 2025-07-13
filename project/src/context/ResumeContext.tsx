import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ResumeData, ResumeSection, ResumeTheme } from '../types/resume';

// Helper function to normalize resume data and ensure all arrays are properly initialized
function normalizeResumeData(data: Partial<ResumeData>): ResumeData {
  const normalized: ResumeData = {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      ...data.personalInfo
    },
    sections: data.sections || [
      { id: '1', type: 'careerObjective', title: 'Career Objective', enabled: true, order: 1 },
      { id: '2', type: 'technicalSummary', title: 'Technical Summary', enabled: true, order: 2 },
      { id: '3', type: 'experience', title: 'Work Experience', enabled: true, order: 3 },
      { id: '4', type: 'education', title: 'Education', enabled: true, order: 4 },
      { id: '5', type: 'projects', title: 'Projects', enabled: true, order: 5 },
      { id: '6', type: 'skills', title: 'Skills', enabled: true, order: 6 },
      { id: '7', type: 'certifications', title: 'Certifications & Courses', enabled: false, order: 7 },
      { id: '8', type: 'languages', title: 'Languages', enabled: false, order: 8 },
      { id: '9', type: 'problemSolving', title: 'Problem Solving Highlights', enabled: false, order: 9 },
      { id: '10', type: 'achievements', title: 'Achievements & Recognitions', enabled: false, order: 10 },
      { id: '11', type: 'volunteerWork', title: 'Volunteer Work', enabled: false, order: 11 }
    ],
    technicalSummary: (data.technicalSummary || []).map(item => ({
      ...item,
      keySkills: item.keySkills || [],
      backendFocus: item.backendFocus || [],
      devTools: item.devTools || [],
      deployment: item.deployment || []
    })),
    experience: (data.experience || []).map(exp => ({
      ...exp,
      responsibilities: exp.responsibilities || []
    })),
    education: (data.education || []).map(edu => ({
      ...edu,
      relevantCoursework: edu.relevantCoursework || []
    })),
    projects: (data.projects || []).map(project => ({
      ...project,
      techStack: project.techStack || []
    })),
    certifications: data.certifications || [],
    skills: (data.skills || []).map(skill => ({
      ...skill,
      items: skill.items || []
    })),
    languages: data.languages || [],
    careerObjective: data.careerObjective || [],
    problemSolving: (data.problemSolving || []).map(problem => ({
      ...problem,
      toolsUsed: problem.toolsUsed || []
    })),
    achievements: data.achievements || [],
    volunteerWork: data.volunteerWork || []
  };

  return normalized;
}

interface ResumeState {
  data: ResumeData;
  theme: ResumeTheme;
  isPreviewMode: boolean;
}

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<ResumeData['personalInfo']> }
  | { type: 'UPDATE_TECHNICAL_SUMMARY'; payload: ResumeData['technicalSummary'] }
  | { type: 'UPDATE_EXPERIENCE'; payload: ResumeData['experience'] }
  | { type: 'UPDATE_EDUCATION'; payload: ResumeData['education'] }
  | { type: 'UPDATE_PROJECTS'; payload: ResumeData['projects'] }
  | { type: 'UPDATE_CERTIFICATIONS'; payload: ResumeData['certifications'] }
  | { type: 'UPDATE_SKILLS'; payload: ResumeData['skills'] }
  | { type: 'UPDATE_LANGUAGES'; payload: ResumeData['languages'] }
  | { type: 'UPDATE_CAREER_OBJECTIVE'; payload: ResumeData['careerObjective'] }
  | { type: 'UPDATE_PROBLEM_SOLVING'; payload: ResumeData['problemSolving'] }
  | { type: 'UPDATE_ACHIEVEMENTS'; payload: ResumeData['achievements'] }
  | { type: 'UPDATE_VOLUNTEER_WORK'; payload: ResumeData['volunteerWork'] }
  | { type: 'UPDATE_SECTIONS'; payload: ResumeSection[] }
  | { type: 'SET_THEME'; payload: ResumeTheme }
  | { type: 'TOGGLE_PREVIEW_MODE' }
  | { type: 'LOAD_RESUME'; payload: ResumeData };

const initialState: ResumeState = {
  data: {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      profileImage: ''
    },
    sections: [
      { id: '1', type: 'careerObjective', title: 'Career Objective', enabled: true, order: 1 },
      { id: '2', type: 'technicalSummary', title: 'Technical Summary', enabled: true, order: 2 },
      { id: '3', type: 'experience', title: 'Work Experience', enabled: true, order: 3 },
      { id: '4', type: 'education', title: 'Education', enabled: true, order: 4 },
      { id: '5', type: 'projects', title: 'Projects', enabled: true, order: 5 },
      { id: '6', type: 'skills', title: 'Skills', enabled: true, order: 6 },
      { id: '7', type: 'certifications', title: 'Certifications & Courses', enabled: false, order: 7 },
      { id: '8', type: 'languages', title: 'Languages', enabled: false, order: 8 },
      { id: '9', type: 'problemSolving', title: 'Problem Solving Highlights', enabled: false, order: 9 },
      { id: '10', type: 'achievements', title: 'Achievements & Recognitions', enabled: false, order: 10 },
      { id: '11', type: 'volunteerWork', title: 'Volunteer Work', enabled: false, order: 11 }
    ],
    technicalSummary: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    skills: [],
    languages: [],
    careerObjective: [],
    problemSolving: [],
    achievements: [],
    volunteerWork: []
  },
  theme: {
    id: 'modern-blue',
    name: 'Modern Blue',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    fontFamily: 'Inter',
    layout: 'modern'
  },
  isPreviewMode: false
};

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        data: {
          ...state.data,
          personalInfo: { ...state.data.personalInfo, ...action.payload }
        }
      };
    case 'UPDATE_TECHNICAL_SUMMARY':
      return {
        ...state,
        data: { ...state.data, technicalSummary: action.payload }
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        data: { ...state.data, experience: action.payload }
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        data: { ...state.data, education: action.payload }
      };
    case 'UPDATE_PROJECTS':
      return {
        ...state,
        data: { ...state.data, projects: action.payload }
      };
    case 'UPDATE_CERTIFICATIONS':
      return {
        ...state,
        data: { ...state.data, certifications: action.payload }
      };
    case 'UPDATE_SKILLS':
      return {
        ...state,
        data: { ...state.data, skills: action.payload }
      };
    case 'UPDATE_LANGUAGES':
      return {
        ...state,
        data: { ...state.data, languages: action.payload }
      };
    case 'UPDATE_CAREER_OBJECTIVE':
      return {
        ...state,
        data: { ...state.data, careerObjective: action.payload }
      };
    case 'UPDATE_PROBLEM_SOLVING':
      return {
        ...state,
        data: { ...state.data, problemSolving: action.payload }
      };
    case 'UPDATE_ACHIEVEMENTS':
      return {
        ...state,
        data: { ...state.data, achievements: action.payload }
      };
    case 'UPDATE_VOLUNTEER_WORK':
      return {
        ...state,
        data: { ...state.data, volunteerWork: action.payload }
      };
    case 'UPDATE_SECTIONS':
      return {
        ...state,
        data: { ...state.data, sections: action.payload }
      };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_PREVIEW_MODE':
      return { ...state, isPreviewMode: !state.isPreviewMode };
    case 'LOAD_RESUME':
      return { ...state, data: action.payload };
      return { ...state, data: normalizeResumeData(action.payload) };
    default:
      return state;
  }
}

const ResumeContext = createContext<{
  state: ResumeState;
  dispatch: React.Dispatch<ResumeAction>;
} | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}