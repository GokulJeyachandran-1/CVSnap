import React from 'react';
import { Plus, Trash2, GripVertical, Heart } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { VolunteerWork, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export function VolunteerWorkForm() {
  const { state, dispatch } = useResume();
  const { volunteerWork } = state.data;

  const addVolunteerWork = () => {
    const newWork: VolunteerWork = {
      id: uuidv4(),
      activityType: '',
      organization: '',
      startDate: '',
      endDate: '',
      current: false,
      contribution: '',
      impact: ''
    };
    dispatch({
      type: 'UPDATE_VOLUNTEER_WORK',
      payload: [...volunteerWork, newWork]
    });
  };

  const updateVolunteerWork = (id: string, field: string, value: string | boolean) => {
    const updated = volunteerWork.map(work =>
      work.id === id ? { ...work, [field]: value } : work
    );
    dispatch({ type: 'UPDATE_VOLUNTEER_WORK', payload: updated });
  };

  const removeVolunteerWork = (id: string) => {
    const filtered = volunteerWork.filter(work => work.id !== id);
    dispatch({ type: 'UPDATE_VOLUNTEER_WORK', payload: filtered });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-blue-600" />
          Volunteer Work & Extracurricular
        </h2>
        <button
          onClick={addVolunteerWork}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Activity</span>
        </button>
      </div>

      <div className="space-y-6">
        {volunteerWork.map((work, index) => (
          <div key={work.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-700">Activity {index + 1}</span>
              </div>
              <button
                onClick={() => removeVolunteerWork(work.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                <input
                  type="text"
                  list={`activity-types-${work.id}`}
                  value={work.activityType}
                  onChange={(e) => updateVolunteerWork(work.id, 'activityType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Teaching/Mentoring"
                />
                <datalist id={`activity-types-${work.id}`}>
                  {DROPDOWN_OPTIONS.activityTypes.map(activityType => (
                    <option key={activityType} value={activityType} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                <input
                  type="text"
                  value={work.organization}
                  onChange={(e) => updateVolunteerWork(work.id, 'organization', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="NGO, School, Community Center"
                />
              </div>

              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="month"
                    value={work.startDate}
                    onChange={(e) => updateVolunteerWork(work.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="month"
                    value={work.endDate}
                    onChange={(e) => updateVolunteerWork(work.id, 'endDate', e.target.value)}
                    disabled={work.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`current-${work.id}`}
                    checked={work.current}
                    onChange={(e) => updateVolunteerWork(work.id, 'current', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={`current-${work.id}`} className="ml-2 text-sm text-gray-700 whitespace-nowrap">
                    Ongoing
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contribution</label>
                <textarea
                  value={work.contribution}
                  onChange={(e) => updateVolunteerWork(work.id, 'contribution', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your role and contributions..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                <textarea
                  value={work.impact}
                  onChange={(e) => updateVolunteerWork(work.id, 'impact', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Impact on community, people helped, outcomes achieved..."
                />
              </div>
            </div>
          </div>
        ))}

        {volunteerWork.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No volunteer work added yet.</p>
            <p className="text-sm">Click "Add Activity" to showcase your community involvement.</p>
          </div>
        )}
      </div>
    </div>
  );
}