"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "./icons";

export function LessonNavigation() {
  // تعريف الأصناف
  const grades = ["الصف الأول", "الصف الثاني", "الصف الثالث", "الصف الرابع", "الصف الخامس", "الصف السادس"];
  const subjects = ["اللغة العربية", "الرياضيات", "العلوم", "الدراسات الإسلامية", "الاجتماعيات"];
  const units = ["الوحدة الأولى", "الوحدة الثانية", "الوحدة الثالثة", "الوحدة الرابعة"];
  const lessons = ["الدرس الأول: أُصَدِّقُ كِتابِي", "الدرس الثاني: حواس الإنسان", "الدرس الثالث: خيرنا لأهلنا"];
  
  // تعريف حالة البرنامج للاختيارات
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedUnit, setSelectedUnit] = useState(units[0]);
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);
  
  // حالة فتح وإغلاق القوائم المنسدلة
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // تعريف علامات التبويب للمحتوى
  const tabs = [
    { id: 'content', label: 'المحتوى' },
    { id: 'objectives', label: 'الأهداف التعليمية' },
    { id: 'questions', label: 'الأسئلة' },
    { id: 'evaluation', label: 'تقييمك' }
  ];
  
  // حالة علامة التبويب المحددة
  const [selectedTab, setSelectedTab] = useState('content');
  
  // دالة للتعامل مع فتح وإغلاق القوائم المنسدلة
  const handleDropdownToggle = (id: string) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* شريط التنقل */}
      <div className="border-b border-[#E6E6E6]">
        <nav className="flex justify-between px-6 py-3">
          {/* قائمة السنة الدراسية */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle('grade')}
              className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1D4ED8] font-medium"
            >
              {selectedGrade}
              <ChevronDownIcon 
                size={16} 
                className={cn(
                  "transition-transform", 
                  openDropdown === 'grade' && "transform rotate-180"
                )} 
              />
            </button>
            {openDropdown === 'grade' && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-[#E6E6E6] rounded-md shadow-md z-10 w-40">
                {grades.map(grade => (
                  <button
                    key={grade}
                    className={cn(
                      "block w-full text-right px-4 py-2 hover:bg-[#F3F4F6]",
                      selectedGrade === grade && "bg-[#E6F0FA] font-medium"
                    )}
                    onClick={() => {
                      setSelectedGrade(grade);
                      setOpenDropdown(null);
                    }}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* قائمة المادة */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle('subject')}
              className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1D4ED8] font-medium"
            >
              {selectedSubject}
              <ChevronDownIcon 
                size={16} 
                className={cn(
                  "transition-transform", 
                  openDropdown === 'subject' && "transform rotate-180"
                )} 
              />
            </button>
            {openDropdown === 'subject' && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-[#E6E6E6] rounded-md shadow-md z-10 w-40">
                {subjects.map(subject => (
                  <button
                    key={subject}
                    className={cn(
                      "block w-full text-right px-4 py-2 hover:bg-[#F3F4F6]",
                      selectedSubject === subject && "bg-[#E6F0FA] font-medium"
                    )}
                    onClick={() => {
                      setSelectedSubject(subject);
                      setOpenDropdown(null);
                    }}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* قائمة الوحدة */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle('unit')}
              className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1D4ED8] font-medium"
            >
              {selectedUnit}
              <ChevronDownIcon 
                size={16} 
                className={cn(
                  "transition-transform", 
                  openDropdown === 'unit' && "transform rotate-180"
                )} 
              />
            </button>
            {openDropdown === 'unit' && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-[#E6E6E6] rounded-md shadow-md z-10 w-40">
                {units.map(unit => (
                  <button
                    key={unit}
                    className={cn(
                      "block w-full text-right px-4 py-2 hover:bg-[#F3F4F6]",
                      selectedUnit === unit && "bg-[#E6F0FA] font-medium"
                    )}
                    onClick={() => {
                      setSelectedUnit(unit);
                      setOpenDropdown(null);
                    }}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* قائمة الدرس */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle('lesson')}
              className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1D4ED8] font-medium"
            >
              الدرس
              <ChevronDownIcon 
                size={16} 
                className={cn(
                  "transition-transform", 
                  openDropdown === 'lesson' && "transform rotate-180"
                )} 
              />
            </button>
            {openDropdown === 'lesson' && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-[#E6E6E6] rounded-md shadow-md z-10 w-64">
                {lessons.map(lesson => (
                  <button
                    key={lesson}
                    className={cn(
                      "block w-full text-right px-4 py-2 hover:bg-[#F3F4F6]",
                      selectedLesson === lesson && "bg-[#E6F0FA] font-medium"
                    )}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setOpenDropdown(null);
                    }}
                  >
                    {lesson}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
      
      {/* مسار الدرس */}
      <div className="px-6 py-4 border-b border-[#E6E6E6]">
        <h2 className="text-xl font-bold text-[#1E3A8A]">
          {selectedGrade} / {selectedSubject} / {selectedUnit} / {selectedLesson.split(": ")[1] || selectedLesson}
        </h2>
      </div>
      
      {/* علامات تبويب المحتوى */}
      <div className="border-b border-[#E6E6E6]">
        <div className="flex px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={cn(
                "py-3 px-4 font-medium relative",
                selectedTab === tab.id 
                  ? "text-[#3B82F6]" 
                  : "text-[#6B7280] hover:text-[#3B82F6]"
              )}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
              {selectedTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* منطقة المحتوى */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedTab === 'content' && (
          <div className="prose max-w-none text-right">
            <h3 className="text-lg font-bold mb-4">{selectedLesson}</h3>
            <p>محتوى الدرس سيظهر هنا، يمكن أن يحتوي على نصوص وصور وفيديوهات تفاعلية لمساعدة الطالب على فهم المادة التعليمية بشكل أفضل.</p>
            <p>يبدأ الدرس بتقديم للموضوع، ثم يتم شرح المفاهيم الأساسية بالتفصيل، ثم يتم تقديم أمثلة توضيحية، وأخيراً يتم تقديم ملخص للدرس.</p>
          </div>
        )}
        
        {selectedTab === 'objectives' && (
          <div className="prose max-w-none text-right">
            <p>بعد دراسة هذا الدرس، سيكون الطالب قادراً على:</p>
            <ul className="text-right list-disc pr-6">
              <li>فهم المفاهيم الأساسية للدرس</li>
              <li>تطبيق المهارات المتعلمة في مواقف حياتية</li>
              <li>تحليل المشكلات وإيجاد حلول مناسبة لها</li>
            </ul>
          </div>
        )}
        
        {selectedTab === 'questions' && (
          <div className="prose max-w-none text-right">
            <p>أسئلة تفاعلية للتأكد من فهم الدرس:</p>
            <ol className="text-right pr-6">
              <li>اختر الإجابة الصحيحة...</li>
              <li>أكمل الفراغات...</li>
              <li>صح أو خطأ...</li>
            </ol>
          </div>
        )}
        
        {selectedTab === 'evaluation' && (
          <div className="prose max-w-none text-right">
            <p>تقييم مستوى الطالب في هذا الدرس:</p>
            <div className="mt-4 p-4 bg-[#F3F4F6] rounded-md">
              <div className="flex justify-between mb-2">
                <span>ممتاز</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-[#3B82F6] h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
