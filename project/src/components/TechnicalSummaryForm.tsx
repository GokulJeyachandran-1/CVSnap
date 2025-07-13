import React, { useState } from 'react';
import { Plus, Trash2, Code, X } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { TechnicalSummary, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}

function MultiSelectDropdown({ label, options, selectedValues, onChange, placeholder }: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(v => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const addCustomValue = () => {
    if (customValue.trim() && !selectedValues.includes(customValue.trim())) {
      onChange([...selectedValues, customValue.trim()]);
      setCustomValue('');
    }
  };

  const removeValue = (value: string) => {
    onChange(selectedValues.filter(v => v !== value));
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      
      {/* Selected values */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedValues.map((value) => (
            <span
              key={value}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {value}
              <button
                onClick={() => removeValue(value)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white"
        >
          {selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {/* Custom input */}
            <div className="p-2 border-b border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Add custom skill..."
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomValue()}
                />
                <button
                  onClick={addCustomValue}
                  className="px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Options */}
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function TechnicalSummaryForm() {
  const { state, dispatch } = useResume();
  const { technicalSummary } = state.data;

  const addTechnicalSummary = () => {
    const newSummary: TechnicalSummary = {
      id: uuidv4(),
      keySkills: [],
      backendFocus: [],
      devTools: [],
      deployment: [],
      customSkills: []
    };
    dispatch({
      type: 'UPDATE_TECHNICAL_SUMMARY',
      payload: [...technicalSummary, newSummary]
    });
  };

  const updateTechnicalSummary = (id: string, field: string, value: string[]) => {
    const updated = technicalSummary.map(summary =>
      summary.id === id ? { ...summary, [field]: value } : summary
    );
    dispatch({ type: 'UPDATE_TECHNICAL_SUMMARY', payload: updated });
  };

  const removeTechnicalSummary = (id: string) => {
    const filtered = technicalSummary.filter(summary => summary.id !== id);
    dispatch({ type: 'UPDATE_TECHNICAL_SUMMARY', payload: filtered });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Code className="h-5 w-5 mr-2 text-blue-600" />
          Technical Summary / Profile
        </h2>
        <button
          onClick={addTechnicalSummary}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Summary</span>
        </button>
      </div>

      <div className="space-y-6">
        {technicalSummary.map((summary, index) => (
          <div key={summary.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">Technical Summary {index + 1}</span>
              <button
                onClick={() => removeTechnicalSummary(summary.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MultiSelectDropdown
                label="Key Skills"
                options={DROPDOWN_OPTIONS.keySkills}
                selectedValues={summary.keySkills}
                onChange={(values) => updateTechnicalSummary(summary.id, 'keySkills', values)}
                placeholder="Select key technical skills"
              />

              <MultiSelectDropdown
                label="Backend Focus Areas"
                options={DROPDOWN_OPTIONS.backendFocus}
                selectedValues={summary.backendFocus}
                onChange={(values) => updateTechnicalSummary(summary.id, 'backendFocus', values)}
                placeholder="Select backend specializations"
              />

              <MultiSelectDropdown
                label="Development Tools"
                options={DROPDOWN_OPTIONS.devTools}
                selectedValues={summary.devTools}
                onChange={(values) => updateTechnicalSummary(summary.id, 'devTools', values)}
                placeholder="Select development tools"
              />

              <MultiSelectDropdown
                label="Deployment & DevOps"
                options={DROPDOWN_OPTIONS.deployment}
                selectedValues={summary.deployment}
                onChange={(values) => updateTechnicalSummary(summary.id, 'deployment', values)}
                placeholder="Select deployment technologies"
              />
            </div>
          </div>
        ))}

        {technicalSummary.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Code className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No technical summary added yet.</p>
            <p className="text-sm">Click "Add Summary" to showcase your technical expertise.</p>
          </div>
        )}
      </div>
    </div>
  );
}