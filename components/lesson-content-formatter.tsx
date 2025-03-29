import React, { useEffect } from 'react';
import { Lesson, Objective } from '@/types/navigation';
import { useSelection } from '@/context/selection-context';

// Icons for different types of objectives
const OBJECTIVE_ICONS: Record<string, string> = {
  'استماع': '👂',
  'تحدث': '🗣️',
  'قراءة': '📚',
  'كتابة': '✍️', 
  'قواعد': '📏',
  'مفردات': '📝',
  'listening': '👂',
  'speaking': '🗣️',
  'reading': '📚',
  'writing': '✍️',
  'grammar': '📏',
  'vocabulary': '📝',
  'default': '🔹'
};

interface LessonContentFormatterProps {
  lesson: Lesson | undefined;
  unitName?: string;
}

// Function to group objectives by skill area
const groupObjectivesBySkill = (objectives: Objective[]) => {
  const groups: Record<string, Objective[]> = {};
  
  objectives.forEach(objective => {
    // Try to extract skill area from the objective text
    // Assuming skill area might be at the start of the text followed by a colon
    let skillArea = 'عام'; // Default category
    
    for (const [key, _] of Object.entries(OBJECTIVE_ICONS)) {
      if (objective.text.toLowerCase().includes(key.toLowerCase()) ||
          objective.text.startsWith(`${key}:`) || 
          objective.text.startsWith(`${key} -`)) {
        skillArea = key;
        break;
      }
    }
    
    if (!groups[skillArea]) {
      groups[skillArea] = [];
    }
    
    groups[skillArea].push(objective);
  });
  
  return groups;
};

// Function to clean the objective text (remove category prefix if present)
const cleanObjectiveText = (text: string): string => {
  for (const key of Object.keys(OBJECTIVE_ICONS)) {
    if (text.toLowerCase().startsWith(`${key.toLowerCase()}:`)) {
      return text.substring(key.length + 1).trim();
    }
    if (text.toLowerCase().startsWith(`${key.toLowerCase()} -`)) {
      return text.substring(key.length + 2).trim();
    }
  }
  return text;
};

// Function to get icon for a skill
const getSkillIcon = (skillName: string): string => {
  const lowerCaseSkill = skillName.toLowerCase();
  
  for (const [key, icon] of Object.entries(OBJECTIVE_ICONS)) {
    if (lowerCaseSkill.includes(key.toLowerCase())) {
      return icon;
    }
  }
  
  return OBJECTIVE_ICONS.default;
};

// Function to format objective text with line breaks
const formatObjectiveText = (text: string): JSX.Element[] => {
  // Split by line breaks, periods, or bullet points
  const lines = text.split(/(?:\r?\n|<br\s*\/?>|(?<=\.)(?!\d)|\u2022|\•)/g);
  
  return lines
    .filter(line => line.trim().length > 0) // Remove empty lines
    .map((line, index) => {
      // Clean up the line and ensure it ends with appropriate punctuation
      let cleanedLine = line.trim();
      if (cleanedLine && !cleanedLine.match(/[.!?؟:;،]$/)) {
        cleanedLine += '.';
      }
      
      return (
        <div key={index} className="flex items-start gap-2 mb-2">
          <span className="text-[#3B82F6] mt-1">▪</span>
          <span>{cleanedLine}</span>
        </div>
      );
    });
};

export function LessonContentFormatter({ lesson, unitName }: LessonContentFormatterProps) {
  const { setSelectedText, setSelectionPosition } = useSelection();
  
  // Add event listener for text selection
  useEffect(() => {
    const handleSelection = (e: MouseEvent) => {
      const selection = window.getSelection();
      
      if (selection && !selection.isCollapsed && selection.toString().trim() !== '') {
        // Get selected text
        const text = selection.toString().trim();
        
        // Check if the selection is within this component
        const lessonContentElement = document.querySelector('.lesson-content');
        if (lessonContentElement) {
          const range = selection.getRangeAt(0);
          
          // Check if the selection is within the lesson content
          if (lessonContentElement.contains(range.commonAncestorContainer)) {
            setSelectedText(text);
            
            // Calculate position for popup
            const selectionRect = range.getBoundingClientRect();
            
            // Position the popup above the selection
            const x = selectionRect.x + (selectionRect.width / 2) - 30; // Center horizontally and offset
            const y = selectionRect.y - 10; // Position above selection
            
            setSelectionPosition({ x, y });
          }
        }
      }
    };
    
    document.addEventListener('mouseup', handleSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleSelection);
    };
  }, [setSelectedText, setSelectionPosition]);

  if (!lesson) return null;
  
  const { objectives } = lesson;
  
  // Group objectives by skill
  const groupedObjectives = groupObjectivesBySkill(objectives || []);
  
  return (
    <div className="lesson-content text-right direction-rtl overflow-x-hidden w-full">
      
      {objectives && objectives.length > 0 ? (
        <div className="mb-4 w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🧠</span>
            <h3 className="text-xl font-bold text-[#1E3A8A]">أهداف التعلم:</h3>
          </div>
          
          <div className="space-y-6 pr-2 max-w-full">
            {Object.entries(groupedObjectives).map(([skill, skillObjectives]) => (
              <div key={skill} className="bg-[#F0F9FF] p-4 rounded-md border-r-4 border-[#3B82F6] break-words overflow-x-hidden">
                <h4 className="font-bold text-[#1E40AF] mb-4 flex items-center gap-2">
                  <span>{getSkillIcon(skill)}</span>
                  <span>{skill}:</span>
                </h4>
                
                <div className="space-y-1 pr-2">
                  {skillObjectives.map((objective) => (
                    <div key={objective.id} className="mb-4">
                      {formatObjectiveText(cleanObjectiveText(objective.text))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full p-8 bg-[#F8FAFC] rounded-lg border border-dashed border-[#CBD5E1]">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-[#64748B] mt-3 font-medium">لا توجد أهداف تعليمية لهذا الدرس</p>
            <p className="text-[#94A3B8] mt-1 text-sm">سيتم إضافة الأهداف التعليمية قريباً</p>
          </div>
        </div>
      )}
    </div>
  );
}
