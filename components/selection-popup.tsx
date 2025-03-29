"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelection } from '@/context/selection-context';

// Question mark icon component
const QuestionIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

// Copy icon component
const CopyIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

// Success check icon component
const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export function SelectionPopup() {
  const { 
    selectedText, 
    selectionPosition, 
    selectionActive, 
    insertTextToInput, 
    clearSelection 
  } = useSelection();
  
  const popupRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
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

  const handleAskAction = () => {
    // Insert selected text as a question and preserve message type
    insertTextToInput(`${selectedText}`, true);
    clearSelection();
  };
  
  const handleCopyAction = async () => {
    try {
      await navigator.clipboard.writeText(selectedText);
      setCopySuccess(true);
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
          {/* Switched positions: "نسخ" button moved to first position */}
          <button
            onClick={handleCopyAction}
            className="text-xs bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
            aria-label="نسخ النص المحدد"
          >
            {copySuccess ? (
              <>
                <CheckIcon className="mr-1" />
                تم النسخ
              </>
            ) : (
              <>
                <CopyIcon className="mr-1" />
                نسخ
              </>
            )}
          </button>
          
          {/* Moved "اسأل" button to second position */}
          <button
            onClick={handleAskAction}
            className="text-xs bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-4 py-1.5 rounded-md transition-colors flex items-center gap-1.5"
          >
            <QuestionIcon className="mr-1" />
            اسأل
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
