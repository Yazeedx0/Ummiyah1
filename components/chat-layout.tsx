import Header from "./header";
import { LessonNavigation } from "./lesson-navigation";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div dir="rtl" className="min-h-screen bg-white font-tajawal">
      <Header />
      
      <div className="flex h-[calc(100vh-5rem)] mt-20">
        {/* Right side - Chat Interface (50% width) */}
        <div className="w-1/2 h-full flex flex-col border-l border-[#D1D5DB]">
          {children}
        </div>
        
        {/* Left side - Lesson Content (50% width) */}
        <div className="w-1/2 h-full flex flex-col">
          <LessonNavigation />
        </div>
      </div>
    </div>
  );
}
