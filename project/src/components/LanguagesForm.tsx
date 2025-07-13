import React from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { Language, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export function LanguagesForm() {
  const { state, dispatch } = useResume();
  const { languages } = state.data;

  const addLanguage = () => {
    const newLanguage: Language = {
      id: uuidv4(),
      name: '',
      proficiency: 'Conversational'
    };
    dispatch({
      type: 'UPDATE_LANGUAGES',
      payload: [...languages, newLanguage]
    });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    const updated = languages.map(lang =>
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    dispatch({ type: 'UPDATE_LANGUAGES', payload: updated });
  };

  const removeLanguage = (id: string) => {
    const filtered = languages.filter(lang => lang.id !== id);
    dispatch({ type: 'UPDATE_LANGUAGES', payload: filtered });
  };

  const proficiencyLevels = ['Native', 'Fluent', 'Conversational', 'Basic'] as const;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-600" />
          Languages
        </h2>
        <button
          onClick={addLanguage}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Language</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languages.map((language) => (
          <div key={language.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <input
                type="text"
                list={`languages-${language.id}`}
                value={language.name}
                onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tamil, English, Hindi..."
              />
              <datalist id={`languages-${language.id}`}>
                {DROPDOWN_OPTIONS.languages.map(lang => (
                  <option key={lang} value={lang} />
                ))}
              </datalist>
            </div>
            <div className="w-32">
              <select
                value={language.proficiency}
                onChange={(e) => updateLanguage(language.id, 'proficiency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {proficiencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
                
              </select>
            </div>
            <button
              onClick={() => removeLanguage(language.id)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {languages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Globe className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No languages added yet.</p>
          <p className="text-sm">Click "Add Language" to showcase your language skills.</p>
        </div>
      )}
    </div>
  );
}