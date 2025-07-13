import React from 'react';
import { Plus, Trash2, Zap } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { Skill, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export function SkillsForm() {
  const { state, dispatch } = useResume();
  const { skills } = state.data;

  const addSkill = () => {
    const newSkill: Skill = {
      id: uuidv4(),
      category: 'programming',
      name: '',
      level: 'Intermediate'
    };
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: [...skills, newSkill]
    });
  };

  const updateSkill = (id: string, field: string, value: string) => {
    const updated = skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    dispatch({ type: 'UPDATE_SKILLS', payload: updated });
  };

  const removeSkill = (id: string) => {
    const filtered = skills.filter(skill => skill.id !== id);
    dispatch({ type: 'UPDATE_SKILLS', payload: filtered });
  };

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;
  const skillCategories = [
    { value: 'programming', label: 'Programming Languages', options: DROPDOWN_OPTIONS.programmingLanguages },
    { value: 'frameworks', label: 'Frameworks & Libraries', options: DROPDOWN_OPTIONS.frameworks },
    { value: 'tools', label: 'Tools & Technologies', options: DROPDOWN_OPTIONS.tools },
    { value: 'soft', label: 'Soft Skills', options: DROPDOWN_OPTIONS.softSkills },
    { value: 'other', label: 'Other Skills', options: [] }
  ] as const;

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getOptionsForCategory = (category: string) => {
    const categoryData = skillCategories.find(cat => cat.value === category);
    return categoryData?.options || [];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-blue-600" />
          Skills
        </h2>
        <button
          onClick={addSkill}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="space-y-6">
        {skillCategories.map((category) => {
          const categorySkills = getSkillsByCategory(category.value);
          
          return (
            <div key={category.value} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{category.label}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <input
                        type="text"
                        list={`skills-${category.value}-${skill.id}`}
                        value={skill.name}
                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Enter ${category.label.toLowerCase()}...`}
                      />
                      <datalist id={`skills-${category.value}-${skill.id}`}>
                        {getOptionsForCategory(category.value).map(option => (
                          <option key={option} value={option} />
                        ))}
                      </datalist>
                    </div>
                    <div className="w-32">
                      <select
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {skillLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {categorySkills.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  <p className="text-sm">No {category.label.toLowerCase()} added yet.</p>
                </div>
              )}

              <button
                onClick={() => {
                  const newSkill: Skill = {
                    id: uuidv4(),
                    category: category.value as any,
                    name: '',
                    level: 'Intermediate'
                  };
                  dispatch({
                    type: 'UPDATE_SKILLS',
                    payload: [...skills, newSkill]
                  });
                }}
                className="mt-3 text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                <Plus className="h-3 w-3" />
                <span>Add {category.label.slice(0, -1)}</span>
              </button>
            </div>
          );
        })}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Zap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No skills added yet.</p>
          <p className="text-sm">Click "Add Skill" to showcase your abilities.</p>
        </div>
      )}
    </div>
  );
}