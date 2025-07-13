import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Briefcase } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { Experience, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export function ExperienceForm() {
  const { state, dispatch } = useResume();
  const { experience } = state.data;

  const addExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: ['']
    };
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: [...experience, newExperience]
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: updated });
  };

  const removeExperience = (id: string) => {
    const filtered = experience.filter(exp => exp.id !== id);
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: filtered });
  };

  const updateResponsibility = (id: string, index: number, value: string) => {
    const updated = experience.map(exp => {
      if (exp.id === id) {
        const newResponsibilities = [...exp.responsibilities];
        newResponsibilities[index] = value;
        return { ...exp, responsibilities: newResponsibilities };
      }
      return exp;
    });
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: updated });
  };

  const addResponsibility = (id: string) => {
    const updated = experience.map(exp =>
      exp.id === id ? { ...exp, responsibilities: [...exp.responsibilities, ''] } : exp
    );
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: updated });
  };

  const removeResponsibility = (id: string, index: number) => {
    const updated = experience.map(exp => {
      if (exp.id === id) {
        const newResponsibilities = exp.responsibilities.filter((_, i) => i !== index);
        return { ...exp, responsibilities: newResponsibilities };
      }
      return exp;
    });
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: updated });
  };

  const responsibilitySuggestions = [
    'Implemented RESTful APIs using Spring Boot and Java',
    'Developed microservices architecture for scalable applications',
    'Optimized database queries resulting in 40% performance improvement',
    'Collaborated with cross-functional teams to deliver features',
    'Mentored junior developers and conducted code reviews',
    'Integrated third-party APIs and payment gateways',
    'Designed and implemented authentication and authorization systems',
    'Created comprehensive unit and integration tests',
    'Deployed applications using Docker and CI/CD pipelines',
    'Participated in agile development processes and sprint planning'
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
          Work Experience
        </h2>
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-700">Experience {index + 1}</span>
              </div>
              <button
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  list={`job-titles-${exp.id}`}
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Software Engineer"
                />
                <datalist id={`job-titles-${exp.id}`}>
                  {DROPDOWN_OPTIONS.jobTitles.map(title => (
                    <option key={title} value={title} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tech Company Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`current-${exp.id}`} className="ml-2 text-sm text-gray-700 whitespace-nowrap">
                    Current
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities & Achievements</label>
              {exp.responsibilities.map((responsibility, respIndex) => (
                <div key={respIndex} className="flex items-start space-x-2 mb-2">
                  <span className="text-gray-400 mt-2">•</span>
                  <div className="flex-1">
                    <input
                      type="text"
                      list={`responsibilities-${exp.id}-${respIndex}`}
                      value={responsibility}
                      onChange={(e) => updateResponsibility(exp.id, respIndex, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your achievement or responsibility..."
                    />
                    <datalist id={`responsibilities-${exp.id}-${respIndex}`}>
                      {responsibilitySuggestions.map(suggestion => (
                        <option key={suggestion} value={suggestion} />
                      ))}
                    </datalist>
                  </div>
                  {exp.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeResponsibility(exp.id, respIndex)}
                      className="text-red-600 hover:text-red-700 p-1 mt-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addResponsibility(exp.id)}
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1 mt-2"
              >
                <Plus className="h-3 w-3" />
                <span>Add responsibility</span>
              </button>
            </div>
          </div>
        ))}

        {experience.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No work experience added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}