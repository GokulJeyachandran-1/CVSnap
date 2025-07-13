import React from 'react';
import { Palette } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { ResumeTheme } from '../types/resume';

const themes: ResumeTheme[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    layout: 'modern'
  },
  {
    id: 'classic-black',
    name: 'Classic Black',
    primaryColor: '#1f2937',
    secondaryColor: '#6b7280',
    fontFamily: 'Georgia, "Times New Roman", serif',
    layout: 'classic'
  },
  {
    id: 'creative-purple',
    name: 'Creative Purple',
    primaryColor: '#7c3aed',
    secondaryColor: '#a78bfa',
    fontFamily: '"Playfair Display", Georgia, serif',
    layout: 'creative'
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Gray',
    primaryColor: '#374151',
    secondaryColor: '#9ca3af',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    layout: 'minimal'
  },
  {
    id: 'executive-navy',
    name: 'Executive Navy',
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    fontFamily: '"Segoe UI", Tahoma, Geneva, sans-serif',
    layout: 'executive'
  },
  {
    id: 'tech-green',
    name: 'Tech Green',
    primaryColor: '#059669',
    secondaryColor: '#10b981',
    fontFamily: '"SF Mono", Monaco, "Cascadia Code", monospace',
    layout: 'tech'
  },
  {
    id: 'elegant-burgundy',
    name: 'Elegant Burgundy',
    primaryColor: '#991b1b',
    secondaryColor: '#dc2626',
    fontFamily: '"Crimson Text", Georgia, serif',
    layout: 'elegant'
  },
  {
    id: 'contemporary-teal',
    name: 'Contemporary Teal',
    primaryColor: '#0f766e',
    secondaryColor: '#14b8a6',
    fontFamily: '"Inter", system-ui, sans-serif',
    layout: 'contemporary'
  }
];

export function ThemeSelector() {
  const { state, dispatch } = useResume();

  const selectTheme = (theme: ResumeTheme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const getLayoutDescription = (layout: string) => {
    const descriptions = {
      modern: 'Clean lines, bold headers',
      classic: 'Traditional, professional',
      creative: 'Artistic, unique styling',
      minimal: 'Simple, space-efficient',
      executive: 'Corporate, authoritative',
      tech: 'Code-friendly, modern',
      elegant: 'Sophisticated, refined',
      contemporary: 'Trendy, balanced'
    };
    return descriptions[layout as keyof typeof descriptions] || layout;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Palette className="h-5 w-5 mr-2 text-blue-600" />
        Resume Themes
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => selectTheme(theme)}
            className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
              state.theme.id === theme.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: theme.primaryColor }}
              />
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: theme.secondaryColor }}
              />
              <div className="text-sm font-medium text-gray-900">{theme.name}</div>
            </div>
            <div className="text-xs text-gray-600 mb-2 capitalize">
              {getLayoutDescription(theme.layout)}
            </div>
            <div className="text-xs text-gray-500" style={{ fontFamily: theme.fontFamily }}>
              Sample text in {theme.fontFamily.split(',')[0].replace(/"/g, '')}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Current:</strong> {state.theme.name} • {getLayoutDescription(state.theme.layout)}
        </p>
      </div>
    </div>
  );
}