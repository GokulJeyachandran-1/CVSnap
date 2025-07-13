import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, GraduationCap, X } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { Education, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export function EducationForm() {
  const { state, dispatch } = useResume();
  const { education } = state.data;

  const addEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      degree: '',
      institution: '',
      location: '',
      completionYear: '',
      percentage: '',
      cgpa: '',
      relevantCoursework: []
    };
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: [...education, newEducation]
    });
  };

  const updateEducation = (id: string, field: string, value: string | string[]) => {
    const updated = education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    dispatch({ type: 'UPDATE_EDUCATION', payload: updated });
  };

  const removeEducation = (id: string) => {
    const filtered = education.filter(edu => edu.id !== id);
    dispatch({ type: 'UPDATE_EDUCATION', payload: filtered });
  };

  const addCoursework = (id: string, course: string) => {
    const edu = education.find(e => e.id === id);
    if (edu && course.trim() && !edu.relevantCoursework.includes(course.trim())) {
      const updated = [...edu.relevantCoursework, course.trim()];
      updateEducation(id, 'relevantCoursework', updated);
    }
  };

  const removeCoursework = (id: string, course: string) => {
    const edu = education.find(e => e.id === id);
    if (edu) {
      const updated = edu.relevantCoursework.filter(c => c !== course);
      updateEducation(id, 'relevantCoursework', updated);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
          Education
        </h2>
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-700">Education {index + 1}</span>
              </div>
              <button
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input
                  type="text"
                  list={`degrees-${edu.id}`}
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bachelor of Science in Computer Science"
                />
                <datalist id={`degrees-${edu.id}`}>
                  {DROPDOWN_OPTIONS.degrees.map(degree => (
                    <option key={degree} value={degree} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="University of California, Berkeley"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Berkeley, CA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Year</label>
                <input
                  type="number"
                  value={edu.completionYear}
                  onChange={(e) => updateEducation(edu.id, 'completionYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2024"
                  min="1950"
                  max="2030"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                  <input
                    type="text"
                    value={edu.percentage}
                    onChange={(e) => updateEducation(edu.id, 'percentage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="85%"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
                  <input
                    type="text"
                    value={edu.cgpa}
                    onChange={(e) => updateEducation(edu.id, 'cgpa', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8.5/10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Coursework</label>
              
              {/* Selected coursework */}
              {edu.relevantCoursework.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {edu.relevantCoursework.map((course) => (
                    <span
                      key={course}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {course}
                      <button
                        onClick={() => removeCoursework(edu.id, course)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Add coursework */}
              <div className="flex flex-wrap gap-2">
                {DROPDOWN_OPTIONS.coursework
                  .filter(course => !edu.relevantCoursework.includes(course))
                  .map(course => (
                    <button
                      key={course}
                      onClick={() => addCoursework(edu.id, course)}
                      className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                    >
                      + {course}
                    </button>
                  ))}
              </div>

              {/* Custom coursework input */}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Add custom coursework..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addCoursework(edu.id, e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        {education.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No education added yet.</p>
            <p className="text-sm">Click "Add Education" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}