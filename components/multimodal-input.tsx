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

import { StopIcon, ChevronDownIcon, PenIcon, SummarizeIcon, ThumbUpIcon, CheckedSquare, DeltaIcon, LightbulbIcon, SendIcon } from "./icons";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Tooltip } from "./ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

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
    id: 'summarize',
    icon: SummarizeIcon,
    label: 'لخص النص',
    description: 'تلخيص محتوى طويل إلى نقاط رئيسية مع الحفاظ على الأفكار المهمة',
    text: 'هل يمكنك تلخيص النص التالي بشكل موجز: ',
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
    id: 'add-title',
    icon: PenIcon,
    label: 'أضف عنوانًا',
    description: 'اقتراح عنوان مناسب يعبر عن الفكرة الرئيسية للنص بشكل دقيق وجذاب',
    text: 'أقترح عنوانًا مناسبًا لهذا النص: ',
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
  input: string;
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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight + 2, 120)}px`;
    }
  };

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
    setLocalStorageInput(input);
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

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [handleSubmit, setLocalStorageInput, width]);

  return (
    <div className="flex items-center w-full p-4 border-t border-[#E5E9F0] bg-white">
      <div className="relative flex-1">
        <Textarea
          ref={textareaRef}
          placeholder="اكتب رسالتك..."
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          className={cn(
            "min-h-[40px] max-h-[120px] overflow-hidden resize-none rounded-2xl text-base bg-[#F8FAFC] border-[#E5E9F0] flex-1 placeholder:text-right dir-rtl py-3 px-4 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all",
            className,
          )}
          rows={1}
          autoFocus
          aria-label="مربع إدخال الرسالة"
        />
        
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
        ) : (
          <Button
            className="rounded-full h-12 min-w-[90px] px-5 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white text-base font-medium shrink-0 flex items-center justify-center shadow-md hover:opacity-90 transition-all transform active:scale-95 hover:scale-105"
            onClick={(event) => {
              event.preventDefault();
              submitForm();
            }}
            disabled={input.length === 0}
            aria-label="إرسال الرسالة"
          >
            <span className="ml-2">إرسال</span>
            <SendIcon size={16} />
          </Button>
        )}
        
        {/* Child-friendly Prompt Templates Button - Improved */}
        <Tooltip content="اختر قالب رسالة" position="top">
          <Button
            className="rounded-full h-10 min-w-[90px] px-3 bg-white border-2 border-[#D8B4FE] text-[#7C3AED] text-base font-medium shrink-0 flex items-center justify-center shadow-sm hover:bg-[#F3E8FF] transition-all"
            onClick={(event) => {
              event.preventDefault();
              setShowPromptMenu(!showPromptMenu);
            }}
            aria-expanded={showPromptMenu}
            aria-haspopup="true"
            aria-label="قوالب الرسائل"
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
