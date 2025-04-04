      // @ts-nocheck

"use client";

import { useState } from "react";
import { SelectionBar } from "./selection-bar";
import { LessonContent } from "./lesson-content";

export function LessonSection() {
  // Define grades, units, and lessons
  const grades = ["الصف الأول", "الصف الثاني", "الصف الثالث"];
  
  const unitsByGrade = {
    "الصف الأول": ["الوحدة الأولى", "الوحدة الثانية", "الوحدة الثالثة"],
    "الصف الثاني": ["الوحدة الأولى", "الوحدة الثانية", "الوحدة الثالثة", "الوحدة الرابعة"],
    "الصف الثالث": ["الوحدة الأولى", "الوحدة الثانية", "الوحدة الثالثة", "الوحدة الرابعة", "الوحدة الخامسة"],
  };
  
  const lessonsByUnit = {
    "الوحدة الأولى": ["الدرس الأول", "الدرس الثاني", "الدرس الثالث"],
    "الوحدة الثانية": ["الدرس الأول", "الدرس الثاني", "الدرس الثالث", "الدرس الرابع"],
    "الوحدة الثالثة": ["الدرس الأول", "الدرس الثاني", "الدرس الثالث"],
    "الوحدة الرابعة": ["الدرس الأول", "الدرس الثاني", "الدرس الثالث"],
    "الوحدة الخامسة": ["الدرس الأول", "الدرس الثاني"]
  };
  
  // State for selections
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedUnit, setSelectedUnit] = useState(unitsByGrade[selectedGrade][0]);
  const [selectedLesson, setSelectedLesson] = useState(lessonsByUnit[unitsByGrade[selectedGrade][0]][0]);
  
  // Update unit when grade changes
  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    setSelectedUnit(unitsByGrade[grade][0]);
    setSelectedLesson(lessonsByUnit[unitsByGrade[grade][0]][0]);
  };
  
  // Update lesson when unit changes
  const handleUnitSelect = (unit: string) => {
    setSelectedUnit(unit);
    setSelectedLesson(lessonsByUnit[unit][0]);
  };
  
  return (
    <div className="h-full w-full p-5 overflow-y-auto overflow-x-hidden">
      <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6 text-right">
        اختر الصف والوحدة والدرس
      </h2>
      
      <div className="space-y-4 max-w-full">
        <SelectionBar
          label="الصف"
          options={grades}
          selected={selectedGrade}
          onSelect={handleGradeSelect}
          description="اختر المستوى الدراسي المناسب للمرحلة الابتدائية"
        />
        
        <SelectionBar
          label="الوحدة"
          options={unitsByGrade[selectedGrade]}
          selected={selectedUnit}
          onSelect={handleUnitSelect}
          description="اختر الوحدة التعليمية التي ترغب في دراستها"
        />
        
        <SelectionBar
          label="الدرس"
          options={lessonsByUnit[selectedUnit]}
          selected={selectedLesson}
          onSelect={setSelectedLesson}
          description="اختر الدرس المحدد الذي تريد استعراضه"
        />
        
        <div className="mt-6 w-full">
          <LessonContent
            grade={selectedGrade}
            unit={selectedUnit}
            lesson={selectedLesson}
          />
        </div>
      </div>
    </div>
  );
}
