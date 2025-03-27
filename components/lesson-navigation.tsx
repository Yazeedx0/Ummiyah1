"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LessonContent } from "./lesson-content";

export function LessonNavigation() {
  // Define the navigation items
  const navItems = [
    { id: 'grade', label: 'السنة الدراسية' },
    { id: 'subject', label: 'المادة' },
    { id: 'unit', label: 'الوحدة' },
    { id: 'lesson', label: 'الدرس' }
  ];
  
  // Define tabs for content
  const tabs = [
    { id: 'content', label: 'المحتوى' },
    { id: 'objectives', label: 'الأهداف التعليمية' },
    { id: 'questions', label: 'الأسئلة' },
    { id: 'evaluation', label: 'تقييمك' }
  ];
  
  // State for selected tab
  const [selectedTab, setSelectedTab] = useState('content');
  
  // Lesson path (this would come from your navigation state in a real app)
  const lessonPath = "الوحدة الأولى، الدرس الأول: أُصَدِّقُ كِتابِي";
  
  return (
    <div className="h-full flex flex-col">
      {/* Navigation bar */}
      <div className="border-b border-[#E6E6E6]">
        <nav className="flex justify-between px-6 py-3">
          {navItems.map(item => (
            <button
              key={item.id}
              className="text-[#3B82F6] hover:text-[#1D4ED8] font-medium"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Lesson path */}
      <div className="px-6 py-4 border-b border-[#E6E6E6]">
        <h2 className="text-xl font-bold text-[#1E3A8A]">
          {lessonPath}
        </h2>
      </div>
      
      {/* Content tabs */}
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
      
      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedTab === 'content' && (
          <div className="prose max-w-none text-right">
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
