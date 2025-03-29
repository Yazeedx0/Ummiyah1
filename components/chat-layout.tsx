import Header from "./header";
import { LessonNavigation } from "./lesson-navigation";
import { SelectionProvider } from "@/context/selection-context";
import { SelectionPopup } from "./selection-popup";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <SelectionProvider>
      <div dir="rtl" className="min-h-screen max-h-screen h-screen flex flex-col overflow-hidden bg-[#F8FAFC] font-noto-sans">
        <Header />
        
        <div className="flex flex-grow h-[calc(100vh-3.5rem)] mt-14 overflow-hidden">
          {/* Right side - Chat Interface */}
          <div className="w-full md:w-1/2 h-full flex flex-col border-l border-[#E5E9F0] bg-white shadow-sm overflow-hidden">
            <div className="p-2.5 border-b border-[#E5E9F0] shrink-0 bg-gradient-to-r from-[#F0F8FF] to-[#F5F9FF]">
              <h2 className="text-lg font-bold text-[#4D79FF] flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#4D79FF]"></span>
                محادثتك مع أميّة
              </h2>
            </div>
            <div className="flex-grow flex flex-col overflow-hidden">
              {children}
            </div>
          </div>
          
          {/* Left side - Lesson Content */}
          <div className="hidden md:flex md:w-1/2 h-full flex-col bg-white overflow-hidden">
            <LessonNavigation />
          </div>
        </div>
        
        {/* Selection popup appears when text is selected */}
        <SelectionPopup />
      </div>
    </SelectionProvider>
  );
}
