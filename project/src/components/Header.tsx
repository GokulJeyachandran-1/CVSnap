import React from 'react';
import { FileText, Download, Save, Eye, EyeOff, Mail } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { exportToPDF, saveToLocalStorage, shareViaEmail } from '../utils/exportUtils';

export function Header() {
  const { state, dispatch } = useResume();

  const handleExportPDF = () => {
    exportToPDF(state.data, state.theme);
  };

  const handleSave = () => {
    saveToLocalStorage(state.data);
  };

  const handleShareEmail = () => {
    shareViaEmail(state.data);
  };

  const togglePreview = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CVSnap</h1>
            <p className="text-sm text-gray-600">Let’s create more than a resume. Let’s build your <b>Brand!</b></p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePreview}
            className="hidden md:flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {state.isPreviewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span>{state.isPreviewMode ? 'Edit Mode' : 'Preview Mode'}</span>
          </button>
          
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Save</span>
          </button>

          <button
            onClick={handleShareEmail}
            className="flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
          >
            <Mail className="h-4 w-4" />
            <span>Share</span>
          </button>
          
          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}