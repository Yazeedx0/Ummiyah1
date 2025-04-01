"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, BookOpenIcon, TargetIcon, QuestionMarkIcon, ChartIcon } from "./icons";
import { Tooltip } from "./ui/tooltip";
import { Grade, Subject, Unit, Lesson } from "@/types/navigation";
import { LessonContentFormatter } from "./lesson-content-formatter";
import { formatContent } from "@/lib/content-formatter";
import { useSelection } from '@/context/selection-context';

// Update interface for PDF data to match the schema table name
interface PdfData {
  id: number;
  title: string;
  url: string;
  subject_id: number;
}

const tabs = [
  { 
    id: 'content', 
    label: 'المحتوى', 
    icon: BookOpenIcon,
    description: 'استعراض المادة التعليمية للدرس بشكل كامل مع الشروحات والأمثلة التوضيحية'
  },
  { 
    id: 'book', 
    label: 'الكتاب', 
    icon: TargetIcon,
    description: 'عرض محتوى الكتاب بصيغة PDF'
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
  const [pdfData, setPdfData] = useState<PdfData | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  
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

  const { setSelectedText, setSelectionPosition } = useSelection();

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/grades');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        
        let allLessons = [];
        data.forEach(grade => {
          grade.subjects?.forEach(subject => {
            subject.units?.forEach(unit => {
              if (unit.lessons) {
                allLessons.push(...unit.lessons.map(lesson => ({
                  id: lesson.id,
                  title: lesson.title,
                  content: lesson.content ? `${lesson.content.substring(0, 50)}...` : null
                })));
              }
            });
          });
        });
        console.log('All lessons:', allLessons);
        
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown) {
        const currentDropdownRef = dropdownRefs.current[openDropdown];
        if (currentDropdownRef && !currentDropdownRef.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    const adjustDropdownPosition = () => {
      if (openDropdown) {
        const dropdownEl = document.querySelector(`[data-dropdown="${openDropdown}"]`) as HTMLElement;
        if (dropdownEl) {
          const rect = dropdownEl.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          
          if (rect.right > viewportWidth) {
            dropdownEl.style.right = '0';
            dropdownEl.style.left = 'auto';
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Adjust dropdown position when it opens
    if (openDropdown) {
      setTimeout(adjustDropdownPosition, 0);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

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

  const renderDropdown = (id: string, items: any[], selectedId: number, getItemLabel: (item: any) => string) => {
    const selectedItem = items.find(item => item.id === selectedId);
    const selectedLabel = selectedItem ? getItemLabel(selectedItem) : id === 'lesson' ? 'الدرس' : '';
    
    return (
      <div className="relative" ref={el => dropdownRefs.current[id] = el}>
        <button
          ref={el => buttonRefs.current[id] = el}
          onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
          className="flex items-center gap-2 text-[#3B82F6] hover:text-[#1D4ED8] hover:bg-[#F1F5F9] px-3 py-2 rounded-md font-medium transition-all"
          aria-expanded={openDropdown === id}
          title={selectedLabel}
        >
          <span className="truncate max-w-[120px]">
            {selectedLabel}
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
            data-dropdown={id}
            className="fixed mt-1 bg-white border border-[#E5E9F0] rounded-lg shadow-lg z-20 w-64 max-h-[300px] overflow-y-auto"
            style={{
              top: (buttonRefs.current[id]?.getBoundingClientRect().bottom || 0) + window.scrollY + 'px',
              left: (buttonRefs.current[id]?.getBoundingClientRect().left || 0) + window.scrollX + 'px'
            }}
          >
            {items.map(item => (
              <button
                key={item.id}
                className={cn(
                  "block w-full text-right px-4 py-3 hover:bg-[#F3F4F6] transition-colors",
                  selectedId === item.id && "bg-[#EBF5FF] font-medium text-[#3B82F6]"
                )}
                onClick={() => handleSelect(id, item.id)}
              >
                <div className="truncate" title={getItemLabel(item)}>
                  {getItemLabel(item)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const currentLesson = getCurrentLesson();
  
  // DEBUG: Add logging for content validation
  console.log('Current lesson:', currentLesson?.id, currentLesson?.title);
  console.log('Content exists:', Boolean(currentLesson?.content));
  if (currentLesson?.content) {
    console.log('Content length:', currentLesson.content.length);
    console.log('Content sample:', currentLesson.content.substring(0, 100));
  }
  
  // Improved content validation - check if content exists and isn't just HTML tags or whitespace
  const hasContent = Boolean(currentLesson?.content && 
    currentLesson.content.trim() !== '' && 
    !currentLesson.content.match(/^(<[^>]*>|\s)*$/));
  
  console.log('Has content (after validation):', hasContent);

  // Format the content for display
  const formattedContent = hasContent ? formatContent(currentLesson?.content) : '';

  // Auto-select objectives tab if content tab is selected but no content exists
  useEffect(() => {
    if (selections.tab === 'content' && !hasContent) {
      setSelections(prev => ({ ...prev, tab: 'objectives' }));
    }
  }, [selections.lessonId, hasContent, selections.tab]);

  // Fetch PDF data based on selected subject ID
  const fetchPdfData = async (subjectId: number) => {
    if (!subjectId) return;
    
    try {
      setPdfLoading(true);
      setPdfError(null);
      console.log(`Fetching PDF for subject ID: ${subjectId}`);
      
      const response = await fetch(`/api/pdf?subject_id=${subjectId}`);
      const responseText = await response.text();
      
      // Try to parse as JSON, but keep the original text if it fails
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing JSON response:', e);
        console.log('Response was:', responseText);
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }
      
      if (!response.ok) {
        console.error('Error response:', data);
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }
      
      console.log('PDF data received:', data);
      
      // Verify that the data has the expected structure
      if (!data.url) {
        console.warn('PDF data is missing url property:', data);
      }
      
      setPdfData(data);
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setPdfError(error instanceof Error ? error.message : 'حدث خطأ أثناء تحميل ملف PDF');
    } finally {
      setPdfLoading(false);
    }
  };

  // Fetch PDF data when subject changes
  useEffect(() => {
    if (selections.subjectId && selections.tab === 'book') {
      fetchPdfData(selections.subjectId);
    }
  }, [selections.subjectId, selections.tab]);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      
      if (selection && !selection.isCollapsed && selection.toString().trim() !== '') {
        // Get selected text immediately without timeout
        const text = selection.toString().trim();
        
        // Only process selections from the lesson content
        const lessonContentElement = document.querySelector('.lesson-content');
        if (lessonContentElement) {
          const range = selection.getRangeAt(0);
          
          // Check if the selection is within the lesson content
          if (lessonContentElement.contains(range.commonAncestorContainer)) {
            // Position the popup above the selection
            const selectionRect = range.getBoundingClientRect();
            const x = selectionRect.x + (selectionRect.width / 2);
            const y = selectionRect.y - 10;
            
            // Set the selection data immediately
            setSelectedText(text);
            setSelectionPosition({ x, y });
            
            // Prevent default behavior to keep selection visible
            document.addEventListener('mousedown', function preventDeselect(e) {
              // Only prevent once, then remove
              document.removeEventListener('mousedown', preventDeselect);
              
              // Check if clicking within lesson content
              const isClickingPopup = !!e.target && (e.target as HTMLElement).closest('[data-selection-popup]');
              
              // Don't prevent default if clicking on a popup
              if (!isClickingPopup) {
                // Allow clicking links and buttons
                const isClickable = (e.target as HTMLElement).tagName === 'A' || 
                                   (e.target as HTMLElement).tagName === 'BUTTON';
                                   
                if (!isClickable) {
                  e.preventDefault();
                }
              }
            }, { once: true });
          }
        }
      }
    };
    
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, [setSelectedText, setSelectionPosition]);

  const renderPdfViewer = (pdfUrl: string) => {
    // Create a proxied URL for the PDF
    const proxiedPdfUrl = `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}`;
    
    console.log('Rendering PDF viewer with URL:', proxiedPdfUrl);
    
    return (
      <div className="flex-1 w-full h-full" style={{ height: "600px", minHeight: "500px" }}>
        <object
          data={proxiedPdfUrl}
          type="application/pdf"
          className="w-full h-full"
          title="PDF Viewer"
        >
          <iframe
            src={proxiedPdfUrl}
            className="w-full h-full border-0"
            title="PDF Viewer"
            sandbox="allow-scripts allow-same-origin allow-forms"
          >
            <p>
              Your browser doesn't support embedded PDF viewing. 
              <a href={proxiedPdfUrl} target="_blank" rel="noopener noreferrer">Click here to download the PDF</a>.
            </p>
          </iframe>
        </object>
      </div>
    );
  };

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
      <nav className="border-b border-[#E5E9F0] bg-[#F8FAFC] px-4 py-4 flex flex-wrap gap-3 justify-start">
        {renderDropdown('grade', navigationData, selections.gradeId, (item: any) => item.name)}
        {renderDropdown('subject', getCurrentGrade()?.subjects || [], selections.subjectId, (item: any) => item.name)}
        {renderDropdown('unit', getCurrentSubject()?.units || [], selections.unitId, (item: any) => item.name)}
        {renderDropdown('lesson', getCurrentUnit()?.lessons || [], selections.lessonId, (item: any) => item.title)}
      </nav>

      <div className="px-4 py-4 border-b border-[#E5E9F0] bg-white">
        <h2 className="text-xl font-bold text-[#1E3A8A] truncate" title={getCurrentLesson()?.title || 'الدرس'}>
          {getCurrentLesson()?.title || 'الدرس'}
        </h2>
        <p className="text-sm text-[#64748B] mt-1 truncate">
          {getCurrentGrade()?.name} / {getCurrentSubject()?.name} / {getCurrentUnit()?.name}
        </p>
      </div>
      
      <div className="border-b border-[#E5E9F0] px-6">
        <div className="flex gap-2 pt-2 overflow-x-auto pb-1">
          {tabs
            // Filter out content tab if no meaningful content exists
            .filter(tab => tab.id !== 'content' || hasContent)
            .map(tab => {
              const Icon = tab.icon;
              return (
                <Tooltip 
                  key={tab.id}
                  content={tab.label}
                  description={tab.description}
                  position="bottom-start"
                  isRtl={true}
                  color="blue"
                  className="rtl-tooltip"
                >
                  <button
                    className={cn(
                      "py-3 px-5 font-medium rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap",
                      selections.tab === tab.id 
                        ? "bg-[#3B82F6] text-white shadow-sm" 
                        : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#3B82F6]"
                    )}
                    onClick={() => setSelections(prev => ({ ...prev, tab: tab.id }))}
                    aria-label={`${tab.label}: ${tab.description}`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                </Tooltip>
              );
            })}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 bg-white">
        {selections.tab === 'content' && hasContent && (
          <div className="prose max-w-full text-right bg-[#FAFAFA] p-5 rounded-lg border border-[#E5E9F0] shadow-sm overflow-x-hidden">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#E5E9F0]">
              <h3 className="text-lg font-semibold text-[#1E3A8A]">محتوى الدرس</h3>
              <button 
                onClick={() => {
                  if (currentLesson?.content) {
                    navigator.clipboard.writeText(currentLesson.content.replace(/<[^>]*>/g, ' '));
                  }
                }}
                className="text-[#3B82F6] hover:text-[#1D4ED8] flex items-center gap-1 text-sm py-1 px-2 rounded hover:bg-[#EBF5FF] transition-colors"
                title="نسخ المحتوى"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                نسخ
              </button>
            </div>
            <div 
              className="leading-relaxed text-[#334155] lesson-content break-words selection-persist" 
              dir="rtl"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>
        )}
        
        {/* This section should never appear due to the tab filtering and auto-selection,
            but we'll keep it as a fallback just in case */}
        {selections.tab === 'content' && !hasContent && (
          <div className="flex items-center justify-center h-full p-8 bg-[#F8FAFC] rounded-lg border border-dashed border-[#CBD5E1]">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-[#64748B] mt-3 font-medium">لم يتم إضافة محتوى لهذا الدرس بعد</p>
              <p className="text-[#94A3B8] mt-1 text-sm">يرجى الانتقال إلى الأهداف التعليمية لمعرفة المزيد</p>
            </div>
          </div>
        )}
        
        {selections.tab === 'book' && (
          <div className="h-full flex flex-col">
            {pdfLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-[#3B82F6]">جاري تحميل الكتاب...</div>
              </div>
            ) : pdfError ? (
              <div className="flex-1 flex items-center justify-center flex-col">
                <div className="text-red-500 mb-2">
                  {pdfError}
                </div>
                {pdfError.includes('PDF functionality is not available') ? (
                  <div className="text-center max-w-md mx-auto mt-2">
                    <p className="text-sm text-gray-600 mb-4">
                      يبدو أن قاعدة البيانات تحتاج إلى تحديث. يرجى اتباع الخطوات التالية:
                    </p>
                    <ol className="text-sm text-gray-700 text-right list-decimal list-inside space-y-2">
                      <li>تأكد من تشغيل قاعدة البيانات</li>
                      <li>قم بتنفيذ الأمر <code className="bg-gray-100 px-1 py-0.5 rounded">prisma generate</code></li>
                      <li>قم بتنفيذ الأمر <code className="bg-gray-100 px-1 py-0.5 rounded">prisma migrate dev</code></li>
                      <li>أعد تشغيل الخادم</li>
                    </ol>
                  </div>
                ) : (
                  <button 
                    onClick={() => fetchPdfData(selections.subjectId)} 
                    className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-md transition-colors"
                  >
                    إعادة المحاولة
                  </button>
                )}
              </div>
            ) : pdfData && pdfData.url ? (
              <div className="flex-1 flex flex-col">
                <div className="bg-[#F8FAFC] p-3 border-b border-[#E5E9F0] flex justify-between items-center">
                  <h3 className="font-bold text-[#1E3A8A]">{pdfData.title}</h3>
                  <div className="flex items-center gap-2">
                    <a 
                      href={`/api/pdf-proxy?url=${encodeURIComponent(pdfData.url)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#3B82F6] hover:text-[#1D4ED8] flex items-center gap-1 text-sm py-1 px-2 rounded hover:bg-[#EBF5FF] transition-colors"
                      title="فتح في صفحة جديدة"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      فتح في صفحة جديدة
                    </a>
                    <a 
                      href={`/api/pdf-proxy?url=${encodeURIComponent(pdfData.url)}`}
                      download={`${pdfData.title}.pdf`}
                      className="text-[#3B82F6] hover:text-[#1D4ED8] flex items-center gap-1 text-sm py-1 px-2 rounded hover:bg-[#EBF5FF] transition-colors"
                      title="تنزيل الملف"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      تنزيل
                    </a>
                  </div>
                </div>
                {renderPdfViewer(pdfData.url)}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full p-8 bg-[#F8FAFC] rounded-lg border border-dashed border-[#CBD5E1]">
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <p className="text-[#64748B] mt-3 font-medium">لم يتم إضافة كتاب لهذه المادة بعد</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {selections.tab === 'objectives' && (
          <LessonContentFormatter 
            lesson={getCurrentLesson()} 
            unitName={getCurrentUnit()?.name}
          />
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