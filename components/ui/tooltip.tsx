      // @ts-nocheck

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';


interface TooltipProps {
  children: React.ReactNode;
  content: string;
  description?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  color?: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
  width?: 'sm' | 'md' | 'lg';
  isRtl?: boolean;
  isHighlighted?: boolean;
  delay?: number;
  showOnFocus?: boolean;
}

export function Tooltip({
  children,
  content,
  description,
  position = 'top',
  color = 'blue',
  width = 'sm',
  isRtl = false,
  isHighlighted = false,
  delay = 300,
  showOnFocus = true,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0,
    left: 0,
    placement: position
  });
  
  const childRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible && childRef.current) {
      const updatePosition = () => {
        if (!childRef.current || !tooltipRef.current) return;
        
        const childRect = childRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        
        const spacing = 8;
        let calculatedPosition = position;
        let top = 0;
        let left = 0;
        
        switch (position) {
          case 'top':
            top = childRect.top - tooltipRect.height - spacing;
            left = childRect.left + (childRect.width - tooltipRect.width) / 2;
            break;
          case 'bottom':
            top = childRect.bottom + spacing;
            left = childRect.left + (childRect.width - tooltipRect.width) / 2;
            break;
          case 'left':
            top = childRect.top + (childRect.height - tooltipRect.height) / 2;
            left = childRect.left - tooltipRect.width - spacing;
            break;
          case 'right':
            top = childRect.top + (childRect.height - tooltipRect.height) / 2;
            left = childRect.right + spacing;
            break;
        }
        
        const viewport = {
          top: 8,
          left: 8,
          bottom: window.innerHeight - 8,
          right: window.innerWidth - 8
        };
        
        if (top < viewport.top) {
          if (position === 'top') {
            top = childRect.bottom + spacing;
            calculatedPosition = 'bottom';
          } else {
            top = viewport.top;
          }
        }
        
        if (top + tooltipRect.height > viewport.bottom) {
          if (position === 'bottom') {
            top = childRect.top - tooltipRect.height - spacing;
            calculatedPosition = 'top';
          } else {
            top = viewport.bottom - tooltipRect.height;
          }
        }
        
        if (left < viewport.left) {
          if (position === 'left') {
            left = childRect.right + spacing;
            calculatedPosition = 'right';
          } else {
            left = viewport.left;
          }
        }
        
        if (left + tooltipRect.width > viewport.right) {
          if (position === 'right') {
            left = childRect.left - tooltipRect.width - spacing;
            calculatedPosition = 'left';
          } else {
            left = viewport.right - tooltipRect.width;
          }
        }
        
        if (isRtl) {
          if (calculatedPosition === 'left') {
            calculatedPosition = 'right';
            left = childRect.right + spacing;
          } else if (calculatedPosition === 'right') {
            calculatedPosition = 'left';
            left = childRect.left - tooltipRect.width - spacing;
          }
        }
        
        setTooltipPosition({
          top,
          left,
          placement: calculatedPosition
        });
      };
      
      updatePosition();
      
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [isVisible, position, isRtl]);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const getColorClasses = () => {
    const baseClasses = 'shadow-lg';
    
    switch (color) {
      case 'blue':
        return cn(
          baseClasses,
          'bg-[#EBF8FF] border-[#BFDBFE] text-[#1E40AF]',
          isHighlighted && 'ring-2 ring-[#3B82F6] ring-opacity-50'
        );
      case 'green':
        return cn(
          baseClasses,
          'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]',
          isHighlighted && 'ring-2 ring-[#10B981] ring-opacity-50'
        );
      case 'yellow':
        return cn(
          baseClasses,
          'bg-[#FFFBEB] border-[#FEF3C7] text-[#92400E]',
          isHighlighted && 'ring-2 ring-[#F59E0B] ring-opacity-50'
        );
      case 'purple':
        return cn(
          baseClasses,
          'bg-[#F5F3FF] border-[#DDD6FE] text-[#5B21B6]',
          isHighlighted && 'ring-2 ring-[#7C3AED] ring-opacity-50'
        );
      case 'red':
        return cn(
          baseClasses,
          'bg-[#FEF2F2] border-[#FECACA] text-[#B91C1C]',
          isHighlighted && 'ring-2 ring-[#EF4444] ring-opacity-50'
        );
      default:
        return cn(
          baseClasses,
          'bg-[#EBF8FF] border-[#BFDBFE] text-[#1E40AF]',
          isHighlighted && 'ring-2 ring-[#3B82F6] ring-opacity-50'
        );
    }
  };

  const getWidthClasses = () => {
    switch (width) {
      case 'sm': return 'min-w-[12rem] max-w-[16rem]';
      case 'md': return 'min-w-[16rem] max-w-[20rem]';
      case 'lg': return 'min-w-[20rem] max-w-[24rem]';
      default: return 'min-w-[12rem] max-w-[16rem]';
    }
  };

  const getAnimationForPosition = (placement: string) => {
    switch (placement) {
      case 'top': return {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 10 }
      };
      case 'bottom': return {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
      };
      case 'left': return {
        initial: { opacity: 0, x: 10 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 10 }
      };
      case 'right': return {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -10 }
      };
      default: return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };
    }
  };

  const renderTooltip = () => {
    if (!isMounted || !isVisible) return null;
    
    const animation = getAnimationForPosition(tooltipPosition.placement);
    
    
    return createPortal(
      <AnimatePresence>
        <motion.div
          ref={tooltipRef}
          className={cn(
            'fixed p-3 border rounded-lg z-[1000]',
            getColorClasses(),
            getWidthClasses()
          )}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`
          }}
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={{ duration: 0.2 }}
        >
          <div className={cn(
            "flex flex-col gap-1", 
            isRtl && "items-end text-right"
          )}>
            <p className="font-medium text-sm break-words">{content}</p>
            {description && (
              <p className="text-xs opacity-80 break-words whitespace-normal overflow-hidden">
                {description}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );
  };

  if (!isMounted) return <>{children}</>;

  return (
    <div 
      ref={childRef}
      className="inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showOnFocus ? showTooltip : undefined}
      onBlur={showOnFocus ? hideTooltip : undefined}
    >
      {children}
      {renderTooltip()}
    </div>
  );
}
