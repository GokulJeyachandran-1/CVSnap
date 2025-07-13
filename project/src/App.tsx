import React, { useEffect } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { Header } from './components/Header';
import { FormSection } from './components/FormSection';
import { ResumePreview } from './components/ResumePreview';
import { loadFromLocalStorage } from './utils/exportUtils';

function AppContent() {
  const { state, dispatch } = useResume();

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      dispatch({ type: 'LOAD_RESUME', payload: savedData });
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className={`grid gap-8 ${state.isPreviewMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {/* Form Section - Hidden in preview mode on mobile */}
          <div className={`${state.isPreviewMode ? 'hidden' : 'block'} lg:block`}>
            <FormSection />
          </div>
          
          {/* Preview Section */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
                <div className="hidden lg:block text-sm text-gray-500">
                  Updates automatically as you type
                </div>
              </div>
              
              <div className="overflow-auto max-h-[80vh] border border-gray-200 rounded-lg">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Preview Toggle */}
      <div className="fixed bottom-4 right-4 lg:hidden">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_PREVIEW_MODE' })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-colors"
        >
          {state.isPreviewMode ? 'Edit' : 'Preview'}
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ResumeProvider>
      <AppContent />
    </ResumeProvider>
  );
}

export default App;