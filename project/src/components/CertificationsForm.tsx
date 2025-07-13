import React from 'react';
import { Plus, Trash2, GripVertical, Award, ExternalLink } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { Certification, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export function CertificationsForm() {
  const { state, dispatch } = useResume();
  const { certifications } = state.data;

  const addCertification = () => {
    const newCertification: Certification = {
      id: uuidv4(),
      title: '',
      platform: '',
      completionDate: '',
      certificateUrl: '',
      description: ''
    };
    dispatch({
      type: 'UPDATE_CERTIFICATIONS',
      payload: [...certifications, newCertification]
    });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    const updated = certifications.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    dispatch({ type: 'UPDATE_CERTIFICATIONS', payload: updated });
  };

  const removeCertification = (id: string) => {
    const filtered = certifications.filter(cert => cert.id !== id);
    dispatch({ type: 'UPDATE_CERTIFICATIONS', payload: filtered });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Award className="h-5 w-5 mr-2 text-blue-600" />
          Certifications & Courses
        </h2>
        <button
          onClick={addCertification}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>

      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-700">Certification {index + 1}</span>
              </div>
              <button
                onClick={() => removeCertification(cert.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course/Certification Title</label>
                <input
                  type="text"
                  value={cert.title}
                  onChange={(e) => updateCertification(cert.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digital Nurture 4.0 – Java Full Stack"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform/Issuer</label>
                <input
                  type="text"
                  list={`platforms-${cert.id}`}
                  value={cert.platform}
                  onChange={(e) => updateCertification(cert.id, 'platform', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Cognizant"
                />
                <datalist id={`platforms-${cert.id}`}>
                  {DROPDOWN_OPTIONS.platforms.map(platform => (
                    <option key={platform} value={platform} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
                <input
                  type="month"
                  value={cert.completionDate}
                  onChange={(e) => updateCertification(cert.id, 'completionDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate URL</label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={cert.certificateUrl}
                    onChange={(e) => updateCertification(cert.id, 'certificateUrl', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://certificate-url.com"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                value={cert.description}
                onChange={(e) => updateCertification(cert.id, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of what you learned or achieved..."
              />
            </div>
          </div>
        ))}

        {certifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No certifications added yet.</p>
            <p className="text-sm">Click "Add Certification" to showcase your learning achievements.</p>
          </div>
        )}
      </div>
    </div>
  );
}