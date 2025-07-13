import React from 'react';
import { Plus, Trash2, Target, Sparkles } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { CareerObjective, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export function CareerObjectiveForm() {
  const { state, dispatch } = useResume();
  const { careerObjective } = state.data;

  const addObjective = () => {
    const newObjective: CareerObjective = {
      id: uuidv4(),
      roleFocus: '',
      vision: '',
      tone: 'Professional',
      customObjective: ''
    };
    dispatch({
      type: 'UPDATE_CAREER_OBJECTIVE',
      payload: [...careerObjective, newObjective]
    });
  };

  const updateObjective = (id: string, field: string, value: string) => {
    const updated = careerObjective.map(obj =>
      obj.id === id ? { ...obj, [field]: value } : obj
    );
    dispatch({ type: 'UPDATE_CAREER_OBJECTIVE', payload: updated });
  };

  const removeObjective = (id: string) => {
    const filtered = careerObjective.filter(obj => obj.id !== id);
    dispatch({ type: 'UPDATE_CAREER_OBJECTIVE', payload: filtered });
  };

  const generateObjective = (objective: CareerObjective) => {
    const templates = {
      Passionate: `Passionate ${objective.roleFocus} with a vision to become a ${objective.vision}, eager to contribute innovative solutions and drive technological advancement in dynamic environments.`,
      Professional: `Results-driven ${objective.roleFocus} seeking to leverage technical expertise as a ${objective.vision} to deliver scalable solutions and contribute to organizational growth.`,
      Creative: `Creative and innovative ${objective.roleFocus} aspiring to be a ${objective.vision}, focused on developing cutting-edge solutions that solve real-world problems.`
    };

    const generated = templates[objective.tone] || templates.Professional;
    updateObjective(objective.id, 'customObjective', generated);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Target className="h-5 w-5 mr-2 text-blue-600" />
          Career Objective
        </h2>
        <button
          onClick={addObjective}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Objective</span>
        </button>
      </div>

      <div className="space-y-6">
        {careerObjective.map((objective, index) => (
          <div key={objective.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">Career Objective {index + 1}</span>
              <button
                onClick={() => removeObjective(objective.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role Focus</label>
                <select
                  value={objective.roleFocus}
                  onChange={(e) => updateObjective(objective.id, 'roleFocus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select role focus</option>
                  {DROPDOWN_OPTIONS.roleFocus.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
                <select
                  value={objective.vision}
                  onChange={(e) => updateObjective(objective.id, 'vision', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select vision</option>
                  {DROPDOWN_OPTIONS.vision.map(vision => (
                    <option key={vision} value={vision}>{vision}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <select
                  value={objective.tone}
                  onChange={(e) => updateObjective(objective.id, 'tone', e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Passionate">Passionate</option>
                  <option value="Professional">Professional</option>
                  <option value="Creative">Creative</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Custom Objective</label>
                {/* <button
                  onClick={() => generateObjective(objective)}
                  disabled={!objective.roleFocus || !objective.vision}
                  className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Generate</span>
                </button> */}
              </div>
              <textarea
                value={objective.customObjective}
                onChange={(e) => updateObjective(objective.id, 'customObjective', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write your career objective based on your goals and expectations..."
              />
            </div>

            {/* {!objective.roleFocus || !objective.vision ? (
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-700">
                  💡 Select a role focus and vision to enable AI-powered objective generation.
                </p>
              </div>
            ) : null} */}
          </div>
        ))}

        {careerObjective.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No career objective added yet.</p>
            <p className="text-sm">Click "Add Objective" to define your career goals.</p>
          </div>
        )}
        
      </div>
    </div>
  );
}