
  // @ts-nocheck

"use client";

import type { ChatRequestOptions, CreateMessage, Message } from "ai";
import type React from "react";
import {
  useRef,
  useEffect,
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { toast } from "sonner";
import { useLocalStorage, useWindowSize } from "usehooks-ts";

import { cn, sanitizeUIMessages } from "@/lib/utils";
import { useSelection } from "@/context/selection-context";
import { useSpeechRecognition } from "./ui/useSpeechRecognition";

import { StopIcon, ChevronDownIcon, PenIcon, SummarizeIcon, ThumbUpIcon, CheckedSquare, DeltaIcon, LightbulbIcon, SendIcon } from "./icons";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Tooltip } from "./ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

// Microphone icon component
const MicIcon = ({ className = "", size = 18 }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

// Define preset prompts with icons, text and enhanced descriptions in educational order
const presetPrompts = [
  {
    id: 'multiple-choice',
    icon: CheckedSquare,
    label: 'أنشئ سؤال اختيار متعدد',
    description: 'إنشاء أسئلة تفاعلية مع خيارات متعددة لاختبار فهمك للموضوع',
    text: 'أنشئ سؤال اختيار من متعدد حول هذا الموضوع: ',
    color: 'purple',
    isHighlighted: true
  },
  {
    id: 'explain',
    icon: SummarizeIcon,
    label: 'اشرح هذا',
    description: 'تقديم شرح بسيط وواضح للنص لمساعدتك على فهمه بشكل أفضل',
    text: 'اشرح هذا النص بطريقة بسيطة وواضحة: ',
    color: 'blue'
  },
  {
    id: 'rephrase',
    icon: ThumbUpIcon,
    label: 'أعد الصياغة',
    description: 'إعادة كتابة النص بأسلوب أبسط وأوضح للفهم مع الحفاظ على المعنى الأصلي',
    text: 'هل يمكنك إعادة صياغة هذه الفكرة بأسلوب أوضح: ',
    color: 'green'
  },
  {
    id: 'test-understanding',
    icon: PenIcon,
    label: 'اختبر فهمي',
    description: 'إنشاء سؤال أو تمرين قصير لاختبار مدى فهمك للمحتوى',
    text: 'اختبر فهمي لهذا الموضوع من خلال إنشاء سؤال تطبيقي: ',
    color: 'yellow'
  },
  {
    id: 'translate',
    icon: DeltaIcon,
    label: 'ترجم إلى العربية',
    description: 'تحويل النصوص من لغات أخرى إلى اللغة العربية بدقة ووضوح',
    text: 'هل يمكنك ترجمة هذا النص إلى اللغة العربية: ',
    color: 'blue'
  },
  {
    id: 'practice-activity',
    icon: LightbulbIcon,
    label: 'اقترح نشاط تعليمي',
    description: 'إنشاء أنشطة عملية وتطبيقية تساعد على تعزيز المهارات وفهم المفاهيم',
    text: 'هل يمكنك اقتراح نشاط تعليمي مرتبط بهذا الموضوع: ',
    color: 'green'
  }
];

// Common educational phrases for auto-suggestions
const commonPhrases = [
  "اشرح لي درس",
  "أريد أن أفهم",
  "ما معنى",
  "كيف أحل",
  "أعطني أمثلة على",
  "لخص لي",
];

export function MultimodalInput({
  chatId,
  input,
  setInput,
  isLoading,
  stop,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
}: {
  chatId: string;
  input: string | null | undefined;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  messages: Array<Message>;
  setMessages: Dispatch<SetStateAction<Array<Message>>>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions,
  ) => void;
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();
  const [showPromptMenu, setShowPromptMenu] = useState(false);
  const promptMenuRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [currentMessageType, setCurrentMessageType] = useState("");
  const { registerInputSetter } = useSelection();

  // Speech recognition integration
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    isSupported 
  } = useSpeechRecognition({
    language: 'ar-SA',
    onFinalTranscript: (finalTranscript) => {
      if (finalTranscript && !isLoading) {
        // When speech recognition produces a final transcript, update the input
        // and submit it automatically
        const finalText = currentMessageType + finalTranscript;
        setInput(finalText);
        
        // Use a small delay to ensure the UI updates before submitting
        setTimeout(() => {
          handleSubmit(undefined, {});
          setLocalStorageInput("");
          setShowSuggestions(false);
        }, 200);
      }
    }
  });

  // Update input while listening for better UX
  useEffect(() => {
    if (isListening && transcript) {
      setInput(currentMessageType + transcript);
      adjustHeight();
    }
  }, [transcript, isListening, currentMessageType]);

  // Toggle speech recognition
  const toggleSpeechRecognition = () => {
    if (isLoading) {
      toast.error("يرجى الانتظار حتى ينتهي المساعد من الرد!");
      return;
    }

    if (!isSupported) {
      toast.error("التعرف على الكلام غير مدعوم في هذا المتصفح!");
      return;
    }

    if (isListening) {
      stopListening();
      setIsSpeechEnabled(false);
      
    
      console.log("تم محاولة إيقاف الاستماع");
      
    
      setTimeout(() => {
        if (isListening) {
          console.log("فشل إيقاف الاستماع، محاولة مرة أخرى");
          stopListening();
        }
      }, 300);
    } else {
      startListening();
      setIsSpeechEnabled(true);
      setShowPromptMenu(false);
    }
  };


  useEffect(() => {
    registerInputSetter((text, preserveMessageType = false) => {
      if (preserveMessageType && currentMessageType) {
        setInput(currentMessageType + text);
      } else {
        setInput(text);
      }
    });
  }, [registerInputSetter, setInput, currentMessageType]);

  // Track the current message type when input changes
  useEffect(() => {
    if (input) {
      // Check if input starts with any of our predefined message types
      for (const prompt of presetPrompts) {
        if (input.startsWith(prompt.text)) {
          setCurrentMessageType(prompt.text);
          return;
        }
      }
      // If no match, reset current message type
      setCurrentMessageType("");
    } else {
      setCurrentMessageType("");
    }
  }, [input]);

  // Close prompt menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (promptMenuRef.current && !promptMenuRef.current.contains(event.target as Node)) {
        setShowPromptMenu(false);
      }
      
      // Hide suggestions when clicking outside the textarea
      if (textareaRef.current && !textareaRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight = 180; // زيادة الارتفاع الأقصى من 120 إلى 180
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight + 2, maxHeight)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    "input",
    "",
  );

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || "";
      setInput(finalValue);
      adjustHeight();
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageInput(input || "");
  }, [input, setLocalStorageInput]);

  // Update suggestions as user types
  useEffect(() => {
    if (input && input.length > 0) {
      const filtered = commonPhrases.filter(phrase => 
        phrase.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedSuggestionIndex(0);
    } else {
      setShowSuggestions(false);
    }
  }, [input]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const insertPromptTemplate = (promptText: string) => {
    setInput(promptText);
    setCurrentMessageType(promptText);
    setShowPromptMenu(false);
    
    if (textareaRef.current) {
      textareaRef.current.focus();
      adjustHeight();
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    adjustHeight();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSuggestions) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : prev
        );
      } else if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        selectSuggestion(filteredSuggestions[selectedSuggestionIndex]);
      } else if (event.key === "Escape") {
        setShowSuggestions(false);
      }
    } else if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (isLoading) {
        toast.error("يرجى الانتظار حتى ينتهي المساعد من الرد!");
      } else {
        submitForm();
      }
    }
  };

  const submitForm = useCallback(() => {
    handleSubmit(undefined, {});
    setLocalStorageInput("");
    setShowSuggestions(false);
    setIsSpeechEnabled(false);
    stopListening();

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [handleSubmit, setLocalStorageInput, width, stopListening]);

  return (
    <div className="flex items-center w-full p-4 border-t border-[#E5E9F0] bg-white">
      <div className="relative flex-1">
        <Textarea
          ref={textareaRef}
          placeholder={isListening ? "جاري الاستماع..." : "اكتب رسالتك..."}
          value={input || ''} // Add a fallback for null/undefined input
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          className={cn(
            "min-h-[60px] max-h-[180px] overflow-y-auto resize-none rounded-2xl text-base bg-[#F8FAFC] border-[#E5E9F0] flex-1 placeholder:text-right dir-rtl py-3 px-4 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all",
            "whitespace-pre-wrap break-words", // تحسين عرض النص
            isListening && "bg-[#F0F9FF] border-[#BFDBFE]",
            className,
          )}
          rows={2} // زيادة عدد الصفوف الافتراضي من 1 إلى 2
          autoFocus
          aria-label="مربع إدخال الرسالة"
          disabled={isListening} // Disable typing while listening
        />
        
        {/* Live speech indicator */}
        {isListening && (
          <div className="absolute left-3 top-3 flex items-center">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EF4444]"></span>
            </div>
            <span className="text-xs text-[#EF4444] mr-2">جاري الاستماع...</span>
          </div>
        )}
        
        {/* Auto-suggestions dropdown */}
        <AnimatePresence>
          {showSuggestions && (
            <motion.div 
              className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-[#E5E9F0] w-full z-10 max-h-48 overflow-y-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-1">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    className={`w-full text-right px-4 py-2 hover:bg-[#F0F9FF] transition-colors ${
                      index === selectedSuggestionIndex ? 'bg-[#EBF8FF] text-[#2563EB]' : 'text-[#334155]'
                    }`}
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex flex-col items-center gap-2 pr-4 relative" ref={promptMenuRef}>
        {isLoading ? (
          <Tooltip content="إيقاف الرد" position="top" color="red">
            <Button
              className="rounded-full h-12 w-12 min-w-[48px] p-0 bg-[#EF4444] text-white shrink-0 shadow-md hover:bg-[#DC2626] transition-colors"
              onClick={(event) => {
                event.preventDefault();
                stop();
                setMessages((messages) => sanitizeUIMessages(messages));
              }}
              aria-label="إيقاف الرد"
            >
              <StopIcon size={18} />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip content="إرسال الرسالة" position="top" color="blue">
            <Button
              className="rounded-full h-12 min-w-[90px] px-5 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white text-base font-medium shrink-0 flex items-center justify-center shadow-md hover:opacity-90 transition-all transform active:scale-95 hover:scale-105"
              onClick={(event) => {
                event.preventDefault();
                submitForm();
              }}
              disabled={(!input || input.length === 0) && !isListening} // Allow submitting when listening
              aria-label="إرسال الرسالة"
            >
              <span className="ml-2">إرسال</span>
              <SendIcon size={16} />
            </Button>
          </Tooltip>
        )}
        
        {/* Speech Recognition Button */}
        {isSupported && (
          <Tooltip 
            content={isListening ? "إيقاف الاستماع" : "التحدث بالرسالة"} 
            position="top" 
            color={isListening ? "red" : "blue"}
          >
            <Button
              className={cn(
                "rounded-full h-10 w-10 min-w-[40px] p-0 shrink-0 shadow-sm transition-all",
                isListening 
                  ? "bg-[#EF4444] text-white animate-pulse" 
                  : "bg-white border-2 border-[#E5E9F0] text-[#64748B] hover:bg-[#F3F4F6]"
              )}
              onClick={(event) => {
                event.preventDefault();
                toggleSpeechRecognition();
              }}
              aria-pressed={isListening}
              aria-label={isListening ? "إيقاف الاستماع" : "بدء الاستماع"}
            >
              <MicIcon size={18} />
            </Button>
          </Tooltip>
        )}
        
        {/* Template Messages Button */}
        <Tooltip 
          content="اختر قالب رسالة"
          position="top" 
          color="purple"
          isRtl={true} // Explicitly setting RTL for Arabic content
        >
          <Button
            className="rounded-full h-10 min-w-[90px] px-3 bg-white border-2 border-[#D8B4FE] text-[#7C3AED] text-base font-medium shrink-0 flex items-center justify-center shadow-sm hover:bg-[#F3E8FF] transition-all"
            onClick={(event) => {
              event.preventDefault();
              setShowPromptMenu(!showPromptMenu);
            }}
            aria-expanded={showPromptMenu}
            aria-haspopup="true"
            aria-label="قوالب الرسائل"
            disabled={isListening} // Disable while listening
          >
            <span className="ml-1">أفكار للرسائل</span>
            <ChevronDownIcon size={16} className={cn("transition-transform", showPromptMenu && "rotate-180")} />
          </Button>
        </Tooltip>
        
        {/* Child-friendly Prompt Templates Menu - Improved with animation */}
        <AnimatePresence>
          {showPromptMenu && (
            <motion.div 
              className="absolute bottom-full mb-3 left-0 bg-white rounded-xl shadow-lg border-2 border-[#D8B4FE] w-80 z-10 overflow-hidden"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-3">
                <h3 className="text-base font-bold text-[#7C3AED] mb-3 text-right px-2 border-b pb-2 border-[#F3E8FF]">
                  اختر نوع الرسالة
                </h3>
                
                <div className="space-y-2">
                  {presetPrompts.map((prompt) => {
                    const Icon = prompt.icon;
                    return (
                      <Tooltip 
                        key={prompt.id}
                        content={prompt.label}
                        description={prompt.description}
                        position="left"
                        isRtl={true}
                        color={prompt.color as 'blue' | 'green' | 'yellow' | 'purple'}
                        isHighlighted={prompt.isHighlighted}
                        width="md"
                      >
                        <motion.button
                          className={cn(
                            "flex items-center justify-end gap-3 w-full p-3 text-right text-[#334155] hover:bg-[#F8FAFC] rounded-lg transition-colors",
                            prompt.isHighlighted && "bg-[#F3E8FF] border-2 border-[#D8B4FE] shadow-sm"
                          )}
                          onClick={() => insertPromptTemplate(prompt.text)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-base font-medium">{prompt.label}</span>
                          <div className={cn(
                            "flex items-center justify-center rounded-full p-2",
                            prompt.color === 'blue' && "bg-[#DBEAFE] text-[#3B82F6]",
                            prompt.color === 'green' && "bg-[#D1FAE5] text-[#10B981]",
                            prompt.color === 'yellow' && "bg-[#FEF3C7] text-[#F59E0B]",
                            prompt.color === 'purple' && "bg-[#F3E8FF] text-[#7C3AED]"
                          )}>
                            <Icon size={20} className="text-current" />
                          </div>
                        </motion.button>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
