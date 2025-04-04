/* eslint-disable react/no-unescaped-entities */
      // @ts-nocheck

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "./icons";

interface LessonNavProps {
  grades: string[];
  units: { [grade: string]: string[] };
  lessons: { [unit: string]: string[] };
  onSelect: (grade: string, unit: string, lesson: string) => void;
  initialGrade?: string;
  initialUnit?: string;
  initialLesson?: string;
}

export function LessonNav({
  grades,
  units,
  lessons,
  onSelect,
  initialGrade,
  initialUnit,
  initialLesson,
}: LessonNavProps) {
  const [selectedGrade, setSelectedGrade] = useState(initialGrade || grades[0]);
  const [selectedUnit, setSelectedUnit] = useState(initialUnit || (units[selectedGrade] ? units[selectedGrade][0] : ''));
  const [selectedLesson, setSelectedLesson] = useState(initialLesson || (lessons[selectedUnit] ? lessons[selectedUnit][0] : ''));
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    const firstUnit = units[grade][0];
    setSelectedUnit(firstUnit);
    const firstLesson = lessons[firstUnit][0];
    setSelectedLesson(firstLesson);
    onSelect(grade, firstUnit, firstLesson);
    setOpenDropdown(null);
  };
  
  const handleUnitSelect = (unit: string) => {
    setSelectedUnit(unit);
    const firstLesson = lessons[unit][0];
    setSelectedLesson(firstLesson);
    onSelect(selectedGrade, unit, firstLesson);
    setOpenDropdown(null);
  };
  
  const handleLessonSelect = (lesson: string) => {
    setSelectedLesson(lesson);
    onSelect(selectedGrade, selectedUnit, lesson);
    setOpenDropdown(null);
  };
  
  const renderDropdown = (id: string, items: string[], selected: string, onItemSelect: (item: string) => void) => (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
        className="flex items-center justify-between gap-2 text-[#3B82F6] hover:text-[#1D4ED8] hover:bg-[#F1F5F9] px-4 py-2 rounded-md font-medium transition-all min-w-[120px] max-w-[180px]"
        aria-expanded={openDropdown === id}
        dir="rtl"
        title={selected}
      >
        <span className="truncate text-right">
          {selected}
        </span>
        <ChevronDownIcon 
          size={16} 
          className={cn(
            "transition-transform duration-200 flex-shrink-0",
            openDropdown === id && "rotate-180"
          )}
        />
      </button>
      {openDropdown === id && (
        <div 
          className="absolute top-full right-0 mt-1 bg-white border border-[#E5E9F0] rounded-lg shadow-lg z-10 w-64 max-h-64 overflow-y-auto"
          dir="rtl"
        >
          {items.map((item, index) => (
            <button
              key={index}
              className={cn(
                "block w-full text-right px-4 py-3 hover:bg-[#F3F4F6] transition-colors border-b border-[#F3F4F6] last:border-b-0",
                selected === item && "bg-[#EBF5FF] font-medium text-[#3B82F6]"
              )}
              onClick={() => onItemSelect(item)}
            >
              <div className="truncate text-right" title={item}>
                {item}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
  
  return (
    <div className="flex flex-wrap gap-4 p-4 border-b border-[#E5E9F0] bg-[#F8FAFC]" dir="rtl">
      {renderDropdown('grade', grades, selectedGrade, handleGradeSelect)}
      {renderDropdown('unit', units[selectedGrade] || [], selectedUnit, handleUnitSelect)}
      {renderDropdown('lesson', lessons[selectedUnit] || [], selectedLesson, handleLessonSelect)}
    </div>
  );
}
