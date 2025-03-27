"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "./icons";

interface SelectionBarProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

export function SelectionBar({ label, options, selected, onSelect }: SelectionBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-4">
      <div 
        className={cn(
          "rounded-lg p-3.5 cursor-pointer flex items-center justify-between border-2 transition-all",
          isOpen 
            ? "bg-[#3B82F6] text-white border-[#2563EB] shadow-md" 
            : "bg-[#E6F0FA] text-[#1F2937] border-[#BFDBFE] hover:bg-[#EFF6FF]"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        role="button"
        aria-haspopup="listbox"
      >
        <ChevronDownIcon 
          size={22} 
          className={cn(
            "transition-transform duration-200", 
            isOpen && "transform rotate-180"
          )} 
        />
        <div className="flex flex-col items-end text-right">
          <span className="text-lg font-bold">{label}</span>
          <span className="text-base mt-0.5">{selected}</span>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="bg-white mt-1 rounded-lg border-2 border-[#BFDBFE] overflow-hidden shadow-md"
          role="listbox"
        >
          {options.map((option) => (
            <div 
              key={option}
              className={cn(
                "p-3.5 cursor-pointer text-right hover:bg-[#E6F0FA] transition-colors",
                selected === option 
                  ? "bg-[#EBF5FF] font-medium border-r-4 border-[#3B82F6]" 
                  : ""
              )}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={selected === option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
