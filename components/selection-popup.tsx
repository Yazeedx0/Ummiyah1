"use client";

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelection } from '@/context/selection-context';

export function SelectionPopup() {
  const { 
    selectedText, 
    selectionPosition, 
    selectionActive, 
    insertTextToInput, 
    clearSelection 
  } = useSelection();
  
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Handle click outside to keep selection visible
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't clear if clicking on the popup itself
      if (popupRef.current && popupRef.current.contains(event.target as Node)) {
        return;
      }
      
      // Only clear selection if clicking on non-text elements
      const clickedElement = event.target as HTMLElement;
      const isClickingTextContainer = 
        clickedElement.classList.contains('lesson-content') ||
        clickedElement.closest('.lesson-content') !== null;
      
      // Keep selection if clicking on the content container
      if (!isClickingTextContainer) {
        clearSelection();
      }
    };
    
    // Only add listener if selection is active
    if (selectionActive) {
      document.addEventListener('mousedown', handleClickOutside);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [selectionActive, clearSelection]);
  
  if (!selectionActive || !selectedText || !selectionPosition) {
    return null;
  }

  const handleAction = (actionType: string) => {
    if (actionType === 'clear') {
      clearSelection();
    } else {
      // Insert prompt with selected text
      insertTextToInput(`${actionType} "${selectedText}"`);
      clearSelection();
    }
  };

  return (
    <AnimatePresence>
      {selectionActive && selectedText && selectionPosition && (
        <motion.div
          ref={popupRef}
          className="fixed z-50 flex flex-wrap gap-1 p-2 bg-white rounded-lg shadow-lg border-2 border-[#D8B4FE] transform -translate-x-1/2"
          style={{ 
            top: `${selectionPosition.y - 10}px`,
            left: `${selectionPosition.x}px`,
            maxWidth: '320px'
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <button
            onClick={() => handleAction('اشرح')}
            className="text-xs bg-[#3B82F6] hover:bg-[#2563EB] text-white px-3 py-1.5 rounded-md transition-colors"
          >
            اشرح
          </button>
          
          <button
            onClick={() => handleAction('لخص')}
            className="text-xs bg-[#10B981] hover:bg-[#059669] text-white px-3 py-1.5 rounded-md transition-colors"
          >
            لخص
          </button>
          
          <button
            onClick={() => handleAction('ترجم')}
            className="text-xs bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-3 py-1.5 rounded-md transition-colors"
          >
            ترجم
          </button>
          
          <button
            onClick={() => {
              insertTextToInput(selectedText);
              clearSelection();
            }}
            className="text-xs bg-[#F59E0B] hover:bg-[#D97706] text-white px-3 py-1.5 rounded-md transition-colors"
          >
            اقتبس
          </button>
          
          <button
            onClick={() => handleAction('clear')}
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1.5 rounded-md transition-colors"
            aria-label="إلغاء التحديد"
          >
            
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
