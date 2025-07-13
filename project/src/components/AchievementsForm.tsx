import React from 'react';
import { Plus, Trash2, GripVertical, Trophy } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { Achievement, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export function AchievementsForm() {
  const { state, dispatch } = useResume();
  const { achievements } = state.data;

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: uuidv4(),
      eventType: '',
      issuer: '',
      date: '',
      title: '',
      description: ''
    };
    dispatch({
      type: 'UPDATE_ACHIEVEMENTS',
      payload: [...achievements, newAchievement]
    });
  };

  const updateAchievement = (id: string, field: string, value: string) => {
    const updated = achievements.map(achievement =>
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    );
    dispatch({ type: 'UPDATE_ACHIEVEMENTS', payload: updated });
  };

  const removeAchievement = (id: string) => {
    const filtered = achievements.filter(achievement => achievement.id !== id);
    dispatch({ type: 'UPDATE_ACHIEVEMENTS', payload: filtered });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-blue-600" />
          Achievements & Recognitions
        </h2>
        <button
          onClick={addAchievement}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      <div className="space-y-6">
        {achievements.map((achievement, index) => (
          <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-700">Achievement {index + 1}</span>
              </div>
              <button
                onClick={() => removeAchievement(achievement.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <input
                  type="text"
                  list={`event-types-${achievement.id}`}
                  value={achievement.eventType}
                  onChange={(e) => updateAchievement(achievement.id, 'eventType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Hackathon"
                />
                <datalist id={`event-types-${achievement.id}`}>
                  {DROPDOWN_OPTIONS.eventTypes.map(eventType => (
                    <option key={eventType} value={eventType} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issuer/Organization</label>
                <input
                  type="text"
                  value={achievement.issuer}
                  onChange={(e) => updateAchievement(achievement.id, 'issuer', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Institute/Organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="month"
                  value={achievement.date}
                  onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Award Title</label>
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="First Place, Best Innovation Award"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={achievement.description}
                onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the achievement and its significance..."
              />
            </div>
          </div>
        ))}

        {achievements.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No achievements added yet.</p>
            <p className="text-sm">Click "Add Achievement" to showcase your accomplishments.</p>
          </div>
        )}
      </div>
    </div>
  );
}