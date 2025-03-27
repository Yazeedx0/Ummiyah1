"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, BookOpenIcon, TargetIcon, QuestionMarkIcon, ChartIcon } from "./icons";
import { Tooltip } from "./ui/tooltip";
import { Grade, Subject, Unit, Lesson } from "@/types/navigation";

const tabs = [
  { 
    id: 'content', 
    label: 'المحتوى', 
    icon: BookOpenIcon,
    description: 'استعراض المادة التعليمية للدرس بشكل كامل مع الشروحات والأمثلة التوضيحية'
  },
  { 
    id: 'objectives', 
    label: 'الأهداف التعليمية', 
    icon: TargetIcon,
    description: 'عرض المهارات والمعارف التي سيكتسبها الطالب بعد إتمام هذا الدرس'
  },
  { 
    id: 'questions', 
    label: 'الأسئلة', 
    icon: QuestionMarkIcon,
    description: 'اختبار الفهم من خلال مجموعة من الأسئلة التفاعلية المتنوعة حول الدرس'
  },
  { 
    id: 'evaluation', 
    label: 'تقييمك', 
    icon: ChartIcon,
    description: 'متابعة مستوى التقدم ونتائج التقييم الخاصة بهذا الدرس مع ملاحظات المعلم'
  }
];

interface NavigationState {
  gradeId: number;
  subjectId: number;
  unitId: number;
  lessonId: number;
  tab: string;
}

export function LessonNavigation() {
  const [navigationData, setNavigationData] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selections, setSelections] = useState<NavigationState>({
    gradeId: 0,
    subjectId: 0,
    unitId: 0,
    lessonId: 0,
    tab: 'content'
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/grades');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        setNavigationData(data);
        
        if (data.length > 0) {
          const firstGrade = data[0];
          const firstSubject = firstGrade.subjects[0];
          const firstUnit = firstSubject?.units[0];
          const firstLesson = firstUnit?.lessons[0];
          
          setSelections({
            gradeId: firstGrade.id,
            subjectId: firstSubject?.id || 0,
            unitId: firstUnit?.id || 0,
            lessonId: firstLesson?.id || 0,
            tab: 'content'
          });
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationData();
  }, []);

  const getCurrentGrade = () => navigationData.find(g => g.id === selections.gradeId);
  const getCurrentSubject = () => getCurrentGrade()?.subjects.find(s => s.id === selections.subjectId);
  const getCurrentUnit = () => getCurrentSubject()?.units.find(u => u.id === selections.unitId);
  const getCurrentLesson = () => getCurrentUnit()?.lessons.find(l => l.id === selections.lessonId);

  const handleSelect = (type: string, id: number) => {
    setSelections(prev => {
      const newSelections = { ...prev, [`${type}Id`]: id };
      
      // Reset child selections
      if (type === 'grade') {
        newSelections.subjectId = navigationData.find((g: any) => g.id === id)?.subjects[0]?.id || 0;
        newSelections.unitId = 0;
        newSelections.lessonId = 0;
      } else if (type === 'subject') {
        newSelections.unitId = getCurrentGrade()?.subjects.find((s: any) => s.id === id)?.units[0]?.id || 0;
        newSelections.lessonId = 0;
      } else if (type === 'unit') {
        newSelections.lessonId = getCurrentSubject()?.units.find((u: any) => u.id === id)?.lessons[0]?.id || 0;
      }
      
      return newSelections;
    });
    setOpenDropdown(null);
  };

  const renderDropdown = (id: string, items: any[], selectedId: number, getItemLabel: (item: any) => string) => (
    <div className="relative" ref={el => dropdownRefs.current[id] = el}>
      <button
        ref={el => buttonRefs.current[id] = el}
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
        className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1D4ED8] hover:bg-[#F1F5F9] px-3 py-2 rounded-md font-medium transition-all"
        aria-expanded={openDropdown === id}
      >
        {id === 'lesson' ? 'الدرس' : getItemLabel(items.find(item => item.id === selectedId))}
        <ChevronDownIcon 
          size={16} 
          className={cn(
            "transition-transform duration-200",
            openDropdown === id && "rotate-180"
          )}
        />
      </button>
      {openDropdown === id && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-[#E5E9F0] rounded-lg shadow-lg z-10 w-64 max-h-64 overflow-y-auto">
          {items.map(item => (
            <button
              key={item.id}
              className={cn(
                "block w-full text-right px-4 py-3 hover:bg-[#F3F4F6] transition-colors",
                selectedId === item.id && "bg-[#EBF5FF] font-medium text-[#3B82F6]"
              )}
              onClick={() => handleSelect(id, item.id)}
            >
              {getItemLabel(item)}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-[#3B82F6]">جاري التحميل...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <nav className="border-b border-[#E5E9F0] bg-[#F8FAFC] px-6 py-4 flex justify-between flex-wrap gap-4">
        {renderDropdown('grade', navigationData, selections.gradeId, (item: any) => item.name)}
        {renderDropdown('subject', getCurrentGrade()?.subjects || [], selections.subjectId, (item: any) => item.name)}
        {renderDropdown('unit', getCurrentSubject()?.units || [], selections.unitId, (item: any) => item.name)}
        {renderDropdown('lesson', getCurrentUnit()?.lessons || [], selections.lessonId, (item: any) => item.title)}
      </nav>

      <div className="px-6 py-4 border-b border-[#E5E9F0] bg-white">
        <h2 className="text-xl font-bold text-[#1E3A8A]">
          {getCurrentLesson()?.title || 'الدرس'}
        </h2>
        <p className="text-sm text-[#64748B] mt-1">
          {getCurrentGrade()?.name} / {getCurrentSubject()?.name} / {getCurrentUnit()?.name}
        </p>
      </div>
      
      <div className="border-b border-[#E5E9F0] px-6">
        <div className="flex gap-2 pt-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <Tooltip 
                key={tab.id}
                content={tab.label}
                description={tab.description}
                position="bottom"
                isRtl={true}
                color="blue"
              >
                <button
                  className={cn(
                    "py-3 px-5 font-medium rounded-t-lg transition-colors flex items-center gap-2",
                    selections.tab === tab.id 
                      ? "bg-[#3B82F6] text-white shadow-sm" 
                      : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#3B82F6]"
                  )}
                  onClick={() => setSelections(prev => ({ ...prev, tab: tab.id }))}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              </Tooltip>
            );
          })}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        {selections.tab === 'content' && getCurrentLesson()?.content && (
          <div className="prose max-w-none text-right">
            <div dangerouslySetInnerHTML={{ __html: getCurrentLesson()?.content || '' }} />
          </div>
        )}
        
        {selections.tab === 'objectives' && (
          <div className="prose max-w-none text-right">
            <p className="text-[#334155] mb-4">بعد دراسة هذا الدرس، سيكون الطالب قادراً على:</p>
            <ul className="text-right list-disc pr-6 space-y-2">
              {getCurrentLesson()?.objectives.map(objective => (
                <li key={objective.id} className="text-[#334155]">
                  {objective.text}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {selections.tab === 'questions' && (
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
        
        {selections.tab === 'evaluation' && (
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