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
    <div className="w-full mb-3">
      <div 
        className={cn(
          "rounded-lg p-3 cursor-pointer flex items-center justify-between",
          isOpen ? "bg-[#3B82F6] text-white" : "bg-[#E6F0FA] text-[#1F2937]"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronDownIcon size={20} className={cn("transition-transform", isOpen && "transform rotate-180")} />
        <div className="flex flex-col items-end text-right">
          <span className="text-lg font-bold">{label}</span>
          <span className="text-base">{selected}</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="bg-white mt-1 rounded-lg border border-[#BFDBFE] overflow-hidden shadow-md">
          {options.map((option) => (
            <div 
              key={option}
              className={cn(
                "p-3 cursor-pointer text-right hover:bg-[#E6F0FA]",
                selected === option ? "bg-[#E6F0FA] font-medium" : ""
              )}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
