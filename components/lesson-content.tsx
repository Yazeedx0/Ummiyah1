import { cn } from "@/lib/utils";

interface LessonContentProps {
  grade: string;
  unit: string;
  lesson: string;
  className?: string;
}

export function LessonContent({ grade, unit, lesson, className }: LessonContentProps) {
  // This would normally fetch from an API based on the selections
  const content = `هذا هو محتوى الدرس ${lesson} من ${unit} للصف ${grade}. هنا سيظهر النص الكامل للدرس من قاعدة البيانات. يمكن أن يحتوي على فقرات وصور وأسئلة تفاعلية لمساعدة الطالب على فهم المادة التعليمية بشكل أفضل.`;
  
  return (
    <div 
      className={cn(
        "border border-[#BFDBFE] rounded-lg p-4 bg-white w-full max-h-[50vh] overflow-y-auto",
        className
      )}
    >
      <div className="text-right text-[#1F2937] text-base leading-relaxed">
        {content}
      </div>
    </div>
  );
}
