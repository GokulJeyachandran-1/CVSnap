import React from 'react';
import { Plus, Trash2, GripVertical, Bug } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { ProblemSolving, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export function ProblemSolvingForm() {
  const { state, dispatch } = useResume();
  const { problemSolving } = state.data;

  const addProblemSolving = () => {
    const newProblem: ProblemSolving = {
      id: uuidv4(),
      problemFaced: '',
      toolsUsed: [],
      solution: '',
      impact: ''
    };
    dispatch({
      type: 'UPDATE_PROBLEM_SOLVING',
      payload: [...problemSolving, newProblem]
    });
  };

  const updateProblemSolving = (id: string, field: string, value: string | string[]) => {
    const updated = problemSolving.map(problem =>
      problem.id === id ? { ...problem, [field]: value } : problem
    );
    dispatch({ type: 'UPDATE_PROBLEM_SOLVING', payload: updated });
  };

  const removeProblemSolving = (id: string) => {
    const filtered = problemSolving.filter(problem => problem.id !== id);
    dispatch({ type: 'UPDATE_PROBLEM_SOLVING', payload: filtered });
  };

  const updateToolsUsed = (id: string, toolsString: string) => {
    const tools = toolsString.split(',').map(tool => tool.trim()).filter(tool => tool);
    updateProblemSolving(id, 'toolsUsed', tools);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Bug className="h-5 w-5 mr-2 text-blue-600" />
          Problem Solving Highlights
        </h2>
        <button
          onClick={addProblemSolving}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Problem</span>
        </button>
      </div>

      <div className="space-y-6">
        {problemSolving.map((problem, index) => (
          <div key={problem.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-700">Problem {index + 1}</span>
              </div>
              <button
                onClick={() => removeProblemSolving(problem.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Problem Faced</label>
                <input
                  type="text"
                  list={`problems-${problem.id}`}
                  value={problem.problemFaced}
                  onChange={(e) => updateProblemSolving(problem.id, 'problemFaced', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Maven lifecycle error"
                />
                <datalist id={`problems-${problem.id}`}>
                  {DROPDOWN_OPTIONS.problemTypes.map(problemType => (
                    <option key={problemType} value={problemType} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tools Used</label>
                <input
                  type="text"
                  list={`tools-${problem.id}`}
                  value={problem.toolsUsed.join(', ')}
                  onChange={(e) => updateToolsUsed(problem.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Logs, breakpoints, community threads (separate with commas)"
                />
                <datalist id={`tools-${problem.id}`}>
                  {DROPDOWN_OPTIONS.debuggingTools.map(tool => (
                    <option key={tool} value={tool} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Solution & Learning</label>
                <textarea
                  value={problem.solution}
                  onChange={(e) => updateProblemSolving(problem.id, 'solution', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of how the problem was resolved and what you learned..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                <textarea
                  value={problem.impact}
                  onChange={(e) => updateProblemSolving(problem.id, 'impact', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Time saved, complexity reduced, performance improved..."
                />
              </div>
            </div>
          </div>
        ))}

        {problemSolving.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bug className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No problem solving highlights added yet.</p>
            <p className="text-sm">Click "Add Problem" to showcase your debugging and problem-solving skills.</p>
          </div>
        )}
      </div>
    </div>
  );
}