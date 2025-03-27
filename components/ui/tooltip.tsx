"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: string;
  description?: string; // Added description for educational context
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  contentClassName?: string; // Added for custom styling of tooltip content
  isHighlighted?: boolean; // Added for highlighting important educational actions
  isRtl?: boolean; // Added better RTL support
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'default'; // Child-friendly color options
  width?: 'auto' | 'sm' | 'md' | 'lg'; // Added width control
}

export const Tooltip = ({ 
  content, 
  description,
  children, 
  position = 'top',
  className,
  contentClassName,
  isHighlighted = false,
  isRtl = false,
  color = 'default',
  width = 'auto'
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Child-friendly color palette - Enhanced with brighter colors
  const colorClasses = {
    default: "bg-gray-800 text-white",
    blue: "bg-[#60A5FA] text-white",
    green: "bg-[#34D399] text-white",
    yellow: "bg-[#FBBF24] text-gray-800",
    purple: "bg-[#A78BFA] text-white"
  };

  const widthClasses = {
    auto: "max-w-xs",
    sm: "w-48",
    md: "w-64",
    lg: "w-80"
  };

  const selectedColorClass = colorClasses[color];
  
  // Improved positioning with fixed offsets for better alignment
  const positionClasses = {
    top: "bottom-full mb-3",
    right: "left-full ml-3",
    bottom: "top-full mt-3",
    left: "right-full mr-3"
  };

  // Handle RTL-specific positioning and horizontal alignment separately
  const alignmentClasses = {
    top: isRtl ? "right-0" : "left-0",
    right: "top-0",
    bottom: isRtl ? "right-0" : "left-0",
    left: "top-0"
  };

  // Arrow positioning classes with fixed offsets
  const arrowPositionClasses = {
    top: {
      position: "bottom-0 -mb-1.5",
      alignment: isRtl ? "right-5" : "left-5"
    },
    right: {
      position: "left-0 -ml-1.5",
      alignment: "top-3"
    },
    bottom: {
      position: "top-0 -mt-1.5",
      alignment: isRtl ? "right-5" : "left-5"
    },
    left: {
      position: "right-0 -mr-1.5",
      alignment: "top-3"
    }
  };

  // Handle RTL swapping for left/right positions
  const adjustedPosition = isRtl && (position === 'left' || position === 'right') 
    ? (position === 'left' ? 'right' : 'left') 
    : position;

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
            "absolute z-50 px-4 py-3 text-base rounded-xl shadow-lg animate-fadeIn",
            selectedColorClass,
            positionClasses[adjustedPosition],
            alignmentClasses[adjustedPosition],
            widthClasses[width],
            isHighlighted && "ring-3 ring-yellow-300 ring-offset-2",
            isRtl && "text-right",
            contentClassName,
            className
          )}
          role="tooltip"
          dir={isRtl ? "rtl" : "ltr"}
          style={{
            animationDuration: '0.2s',
            animationFillMode: 'both'
          }}
        >
          <div className="font-medium">{content}</div>
          
          {description && (
            <div className={cn(
              "text-sm mt-1.5 font-normal", 
              color === 'yellow' ? "text-gray-700" : "text-white/90"
            )}>
              {description}
            </div>
          )}
          
          <div 
            className={cn(
              "absolute w-3 h-3 transform rotate-45",
              color === 'default' && "bg-gray-800",
              color === 'blue' && "bg-[#60A5FA]",
              color === 'green' && "bg-[#34D399]",
              color === 'yellow' && "bg-[#FBBF24]",
              color === 'purple' && "bg-[#A78BFA]",
              arrowPositionClasses[adjustedPosition].position,
              arrowPositionClasses[adjustedPosition].alignment
            )}
          />
        </div>
      )}
    </div>
  );
};
