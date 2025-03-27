"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export const Tooltip = ({ 
  content, 
  children, 
  position = 'top',
  className
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    right: "left-full mr-2 top-1/2 transform -translate-y-1/2",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    left: "right-full ml-2 top-1/2 transform -translate-y-1/2"
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div 
          className={cn(
            "absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded whitespace-nowrap",
            positionClasses[position],
            className
          )}
          role="tooltip"
        >
          {content}
          <div 
            className={cn(
              "absolute w-2 h-2 bg-gray-800 transform rotate-45",
              position === 'top' && "bottom-0 left-1/2 -mb-1 -ml-1",
              position === 'right' && "left-0 top-1/2 -ml-1 -mt-1",
              position === 'bottom' && "top-0 left-1/2 -mt-1 -ml-1",
              position === 'left' && "right-0 top-1/2 -mr-1 -mt-1"
            )}
          />
        </div>
      )}
    </div>
  );
};
