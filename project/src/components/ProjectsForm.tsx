import React from 'react';
import { Plus, Trash2, GripVertical, FolderOpen, ExternalLink } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { Project, DROPDOWN_OPTIONS } from '../types/resume';
import { v4 as uuidv4 } from 'uuid';

export function ProjectsForm() {
  const { state, dispatch } = useResume();
  const { projects } = state.data;

  const addProject = () => {
    const newProject: Project = {
      id: uuidv4(),
      title: '',
      role: '',
      techStack: [],
      githubLink: '',
      liveUrl: '',
      summary: '',
      problemSolved: '',
      keyImplementation: '',
      outcomes: ''
    };
    dispatch({
      type: 'UPDATE_PROJECTS',
      payload: [...projects, newProject]
    });
  };

  const updateProject = (id: string, field: string, value: string | string[]) => {
    const updated = projects.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    );
    dispatch({ type: 'UPDATE_PROJECTS', payload: updated });
  };

  const removeProject = (id: string) => {
    const filtered = projects.filter(project => project.id !== id);
    dispatch({ type: 'UPDATE_PROJECTS', payload: filtered });
  };

  const updateTechStack = (id: string, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(id, 'techStack', technologies);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <FolderOpen className="h-5 w-5 mr-2 text-blue-600" />
          Projects
        </h2>
        <button
          onClick={addProject}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-700">Project {index + 1}</span>
              </div>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-600 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Hospital Management System"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Role</label>
                <input
                  type="text"
                  list={`project-roles-${project.id}`}
                  value={project.role}
                  onChange={(e) => updateProject(project.id, 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Backend Developer"
                />
                <datalist id={`project-roles-${project.id}`}>
                  {DROPDOWN_OPTIONS.projectRoles.map(role => (
                    <option key={role} value={role} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={project.githubLink}
                    onChange={(e) => updateProject(project.id, 'githubLink', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Live URL (Optional)</label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="url"
                    value={project.liveUrl}
                    onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
              <input
                type="text"
                list={`tech-stack-${project.id}`}
                value={project.techStack.join(', ')}
                onChange={(e) => updateTechStack(project.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Spring Boot, MySQL, React (separate with commas)"
              />
              <datalist id={`tech-stack-${project.id}`}>
                {DROPDOWN_OPTIONS.techStack.map(tech => (
                  <option key={tech} value={tech} />
                ))}
              </datalist>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Problem Solved</label>
                <textarea
                  value={project.problemSolved}
                  onChange={(e) => updateProject(project.id, 'problemSolved', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What problem did this project solve?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Implementation</label>
                <textarea
                  value={project.keyImplementation}
                  onChange={(e) => updateProject(project.id, 'keyImplementation', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Key technical implementations or features"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Summary</label>
                <textarea
                  value={project.summary}
                  onChange={(e) => updateProject(project.id, 'summary', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief overview of the project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outcomes & Impact</label>
                <textarea
                  value={project.outcomes}
                  onChange={(e) => updateProject(project.id, 'outcomes', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Results, metrics, or impact achieved"
                />
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No projects added yet.</p>
            <p className="text-sm">Click "Add Project" to showcase your work.</p>
          </div>
        )}
      </div>
    </div>
  );
}