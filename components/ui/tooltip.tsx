"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from "@/lib/utils";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  description?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-start';
  isRtl?: boolean;
  color?: 'blue' | 'gray';
  className?: string;
}

export const Tooltip = ({
  children,
  content,
  description,
  position = 'top',
  isRtl = false,
  color = 'gray',
  className
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let x = 0;
    let y = 0;
    
    switch (position) {
      case 'top':
        x = triggerRect.left + window.scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.top + window.scrollY - tooltipRect.height - 10;
        break;
      case 'bottom':
        x = triggerRect.left + window.scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        y = triggerRect.bottom + window.scrollY + 10;
        break;
      case 'bottom-start':
        x = isRtl 
            ? triggerRect.right + window.scrollX - tooltipRect.width 
            : triggerRect.left + window.scrollX;
        y = triggerRect.bottom + window.scrollY + 10;
        break;
      case 'left':
        x = triggerRect.left + window.scrollX - tooltipRect.width - 10;
        y = triggerRect.top + window.scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
      case 'right':
        x = triggerRect.right + window.scrollX + 10;
        y = triggerRect.top + window.scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        break;
    }
    
    // Prevent tooltip from going off-screen
    const rightOverflow = x + tooltipRect.width - window.innerWidth;
    if (rightOverflow > 0) x -= rightOverflow + 10;
    if (x < 10) x = 10;
    
    setCoords({ x, y });
  };

  useEffect(() => {
    if (isVisible) {
      requestAnimationFrame(updatePosition);
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isVisible]);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  const tooltipClasses = cn(
    "fixed px-3 py-2 rounded-md shadow-md z-50 max-w-xs transition-opacity duration-200",
    isRtl ? "text-right" : "text-left",
    isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
    color === 'blue' ? "bg-[#3B82F6] text-white" : "bg-gray-800 text-white",
    className
  );

  return (
    <div
      className="inline-block"
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isMounted && createPortal(
        <div
          ref={tooltipRef}
          className={tooltipClasses}
          style={{
            left: coords.x,
            top: coords.y
          }}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <div className="font-medium">{content}</div>
          {description && (
            <div className="text-xs mt-1 opacity-90">{description}</div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};
