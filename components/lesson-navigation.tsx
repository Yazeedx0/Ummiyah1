"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, BookOpenIcon, TargetIcon, QuestionMarkIcon, ChartIcon } from "./icons";

export function LessonNavigation() {

  const grades = ["الصف الأول", "الصف الثاني", "الصف الثالث", "الصف الرابع", "الصف الخامس", "الصف السادس"];
  const subjects = ["اللغة العربية", "الرياضيات", "العلوم", "الدراسات الإسلامية", "الاجتماعيات"];
  const units = ["الوحدة الأولى", "الوحدة الثانية", "الوحدة الثالثة", "الوحدة الرابعة"];
  const lessons = ["الدرس الأول: أُصَدِّقُ كِتابِي", "الدرس الثاني: حواس الإنسان", "الدرس الثالث: خيرنا لأهلنا"];
  

  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedUnit, setSelectedUnit] = useState(units[0]);
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);
  
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  

  const tabs = [
    { id: 'content', label: 'المحتوى', icon: BookOpenIcon },
    { id: 'objectives', label: 'الأهداف التعليمية', icon: TargetIcon },
    { id: 'questions', label: 'الأسئلة', icon: QuestionMarkIcon },
    { id: 'evaluation', label: 'تقييمك', icon: ChartIcon }
  ];
  

  const [selectedTab, setSelectedTab] = useState('content');
  

  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  
  const handleDropdownToggle = (id: string) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(id);
    }
  };
  

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdown && dropdownRefs.current[openDropdown] && 
          !dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);
  
  return (
    <div className="h-full flex flex-col">
      {/* شريط التنقل */}
      <div className="border-b border-[#E5E9F0] bg-[#F8FAFC]">
        <nav className="flex justify-between px-6 py-4">
          {/* قائمة السنة الدراسية */}
          <div className="relative" ref={el => dropdownRefs.current['grade'] = el}>
            <button
              onClick={() => handleDropdownToggle('grade')}
              className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1D4ED8] font-medium transition-colors"
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
              <div className="absolute top-full right-0 mt-2 bg-white border border-[#E5E9F0] rounded-lg shadow-lg z-10 w-48 overflow-hidden">
                {grades.map(grade => (
                  <button
                    key={grade}
                    className={cn(
                      "block w-full text-right px-4 py-3 hover:bg-[#F3F4F6] transition-colors",
                      selectedGrade === grade && "bg-[#EBF5FF] font-medium text-[#3B82F6]"
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
          <div className="relative" ref={el => dropdownRefs.current['subject'] = el}>
            <button
              onClick={() => handleDropdownToggle('subject')}
              className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1D4ED8] font-medium transition-colors"
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
              <div className="absolute top-full right-0 mt-2 bg-white border border-[#E5E9F0] rounded-lg shadow-lg z-10 w-48 overflow-hidden">
                {subjects.map(subject => (
                  <button
                    key={subject}
                    className={cn(
                      "block w-full text-right px-4 py-3 hover:bg-[#F3F4F6] transition-colors",
                      selectedSubject === subject && "bg-[#EBF5FF] font-medium text-[#3B82F6]"
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
          <div className="relative" ref={el => dropdownRefs.current['unit'] = el}>
            <button
              onClick={() => handleDropdownToggle('unit')}
              className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1D4ED8] font-medium transition-colors"
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
              <div className="absolute top-full right-0 mt-2 bg-white border border-[#E5E9F0] rounded-lg shadow-lg z-10 w-48 overflow-hidden">
                {units.map(unit => (
                  <button
                    key={unit}
                    className={cn(
                      "block w-full text-right px-4 py-3 hover:bg-[#F3F4F6] transition-colors",
                      selectedUnit === unit && "bg-[#EBF5FF] font-medium text-[#3B82F6]"
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
          <div className="relative" ref={el => dropdownRefs.current['lesson'] = el}>
            <button
              onClick={() => handleDropdownToggle('lesson')}
              className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1D4ED8] font-medium transition-colors"
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
              <div className="absolute top-full right-0 mt-2 bg-white border border-[#E5E9F0] rounded-lg shadow-lg z-10 w-64 overflow-hidden">
                {lessons.map(lesson => (
                  <button
                    key={lesson}
                    className={cn(
                      "block w-full text-right px-4 py-3 hover:bg-[#F3F4F6] transition-colors",
                      selectedLesson === lesson && "bg-[#EBF5FF] font-medium text-[#3B82F6]"
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
      <div className="px-6 py-4 border-b border-[#E5E9F0] bg-white">
        <h2 className="text-xl font-bold text-[#1E3A8A]">
          {selectedLesson.split(": ")[1] || selectedLesson}
        </h2>
        <p className="text-sm text-[#64748B] mt-1">
          {selectedGrade} / {selectedSubject} / {selectedUnit}
        </p>
      </div>
      
      {/* علامات تبويب المحتوى - بتصميم محسن */}
      <div className="border-b border-[#E5E9F0] px-6">
        <div className="flex gap-2 pt-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={cn(
                  "py-3 px-5 font-medium rounded-t-lg transition-colors flex items-center gap-2",
                  selectedTab === tab.id 
                    ? "bg-[#3B82F6] text-white shadow-sm" 
                    : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#3B82F6]"
                )}
                onClick={() => setSelectedTab(tab.id)}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* منطقة المحتوى */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        {selectedTab === 'content' && (
          <div className="prose max-w-none text-right">
            <p className="text-[#334155] leading-relaxed">محتوى الدرس سيظهر هنا، يمكن أن يحتوي على نصوص وصور وفيديوهات تفاعلية لمساعدة الطالب على فهم المادة التعليمية بشكل أفضل.</p>
            <p className="text-[#334155] leading-relaxed">يبدأ الدرس بتقديم للموضوع، ثم يتم شرح المفاهيم الأساسية بالتفصيل، ثم يتم تقديم أمثلة توضيحية، وأخيراً يتم تقديم ملخص للدرس.</p>
            <div className="my-6 p-4 bg-[#F8FAFC] border-r-4 border-[#3B82F6] rounded-md">
              <h4 className="text-[#1E3A8A] font-bold mb-2">نقطة مهمة للتذكر:</h4>
              <p className="text-[#334155]">تأكد من حفظ هذه المعلومات جيداً للاختبار القادم.</p>
            </div>
          </div>
        )}
        
        {selectedTab === 'objectives' && (
          <div className="prose max-w-none text-right">
            <p className="text-[#334155] mb-4">بعد دراسة هذا الدرس، سيكون الطالب قادراً على:</p>
            <ul className="text-right list-disc pr-6 space-y-2">
              <li className="text-[#334155]">فهم المفاهيم الأساسية للدرس</li>
              <li className="text-[#334155]">تطبيق المهارات المتعلمة في مواقف حياتية</li>
              <li className="text-[#334155]">تحليل المشكلات وإيجاد حلول مناسبة لها</li>
            </ul>
          </div>
        )}
        
        {selectedTab === 'questions' && (
          <div className="prose max-w-none text-right">
            <p className="text-[#334155] mb-4">أسئلة تفاعلية للتأكد من فهم الدرس:</p>
            <div className="space-y-4">
              <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E5E9F0]">
                <h4 className="font-medium text-[#1E3A8A] mb-2">السؤال الأول:</h4>
                <p className="text-[#334155] mb-3">اختر الإجابة الصحيحة...</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="q1" id="q1a" className="accent-[#3B82F6]" />
                    <label htmlFor="q1a" className="text-[#334155]">الخيار الأول</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="q1" id="q1b" className="accent-[#3B82F6]" />
                    <label htmlFor="q1b" className="text-[#334155]">الخيار الثاني</label>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E5E9F0]">
                <h4 className="font-medium text-[#1E3A8A] mb-2">السؤال الثاني:</h4>
                <p className="text-[#334155] mb-3">أكمل الفراغات...</p>
                <div className="flex items-center gap-2">
                  <input type="text" className="border border-[#E5E9F0] rounded p-2 text-right w-40" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedTab === 'evaluation' && (
          <div className="prose max-w-none text-right">
            <p className="text-[#334155] mb-4">تقييم مستوى الطالب في هذا الدرس:</p>
            <div className="mt-4 p-5 bg-[#F8FAFC] rounded-lg border border-[#E5E9F0] shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="text-[#10B981] font-bold">ممتاز</span>
                <span className="text-[#3B82F6] font-bold">85%</span>
              </div>
              <div className="w-full bg-[#E5E9F0] rounded-full h-3">
                <div className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] h-3 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#E5E9F0]">
                <h4 className="font-medium text-[#1E3A8A] mb-2">ملاحظات المعلم:</h4>
                <p className="text-[#334155]">أداء ممتاز! استمر في العمل الجيد وتطوير مهاراتك.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
