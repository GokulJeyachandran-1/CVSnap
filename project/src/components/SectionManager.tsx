import React from 'react';
import { Settings, Eye, EyeOff } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-center space-x-3">
        <div {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
        {children}
      </div>
    </div>
  );
}

export function SectionManager() {
  const { state, dispatch } = useResume();
  const { sections } = state.data;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toggleSection = (id: string) => {
    const updated = sections.map(section =>
      section.id === id ? { ...section, enabled: !section.enabled } : section
    );
    dispatch({ type: 'UPDATE_SECTIONS', payload: updated });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(section => section.id === active.id);
      const newIndex = sections.findIndex(section => section.id === over.id);
      
      const reorderedSections = arrayMove(sections, oldIndex, newIndex).map((section, index) => ({
        ...section,
        order: index + 1
      }));
      
      dispatch({ type: 'UPDATE_SECTIONS', payload: reorderedSections });
    }
  };

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Settings className="h-5 w-5 mr-2 text-blue-600" />
        Section Settings
      </h2>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedSections.map(section => section.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {sortedSections.map((section) => (
              <SortableItem key={section.id} id={section.id}>
                <div className="flex items-center justify-between flex-1 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="font-medium text-gray-700">{section.title}</span>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                      section.enabled
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {section.enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    <span className="text-sm">{section.enabled ? 'Enabled' : 'Disabled'}</span>
                  </button>
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Tip:</strong> Drag sections using the grip handle to reorder them in your resume. Toggle sections on/off to customize what appears in your final resume.
        </p>
      </div>
    </div>
  );
}