import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelection } from '@/context/selection-context';
import { cn } from '@/lib/utils';

export const SelectionPopup: React.FC = () => {
  const { 
    selectedText, 
    setSelectedText, 
    selectionPosition, 
    setSelectionPosition,
    insertTextToInput 
  } = useSelection();
  
  const popupRef = useRef<HTMLDivElement>(null);

  // تعديل حدث النقر خارج النافذة المنبثقة لتجنب الاختفاء السريع
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // تأكد من أن النقر لم يكن على النص المحدد نفسه
      const selection = window.getSelection();
      
      // تجاهل النقر إذا كان على زر "اسأل" أو إذا كان ما زال هناك نص محدد
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target as Node) && 
        !(selection && !selection.isCollapsed)
      ) {
        // تأخير إزالة النافذة المنبثقة للتأكد من أنها لا تختفي عند النقر على النص المحدد
        setTimeout(() => {
          // تحقق مرة أخرى قبل الإزالة
          const newSelection = window.getSelection();
          if (!(newSelection && !newSelection.isCollapsed)) {
            setSelectionPosition(null);
            setSelectedText('');
          }
        }, 200);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setSelectionPosition, setSelectedText]);

  const handleAskClick = () => {
    // Format the text with a question prompt
    const formattedText = `أريد السؤال عن: "${selectedText.trim()}"`;
    
    // Insert text to the input field
    insertTextToInput(formattedText);
    
    // Clear selection state
    setSelectionPosition(null);
    setSelectedText('');
  };

  if (!selectionPosition || !selectedText) return null;

  return (
    <AnimatePresence>
      {selectionPosition && (
        <motion.div
          ref={popupRef}
          className="fixed z-[1000]" // زيادة قيمة z-index للتأكد من ظهورها فوق جميع العناصر
          style={{
            top: `${selectionPosition.y}px`,
            left: `${selectionPosition.x}px`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <div className={cn(
            "bg-white rounded-full shadow-md border border-[#3B82F6] px-4 py-2",
            "flex items-center gap-2 text-sm font-medium translate-x-[-50%] translate-y-[-120%]"
          )}>
            <button
              onClick={handleAskClick}
              className={cn(
                "flex items-center gap-2 text-[#3B82F6] hover:text-[#2563EB]",
                "transition-colors px-1"
              )}
              title="اسأل عن هذا النص"
            >
              <span className="font-medium">اسأل</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
