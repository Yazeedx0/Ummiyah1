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

import { StopIcon, ChevronDownIcon, PenIcon, SummarizeIcon, ThumbUpIcon, CheckedSquare, DeltaIcon } from "./icons";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

// Define preset prompts with icons and text
const presetPrompts = [
  {
    id: 'summarize',
    icon: SummarizeIcon,
    label: 'لخص النص',
    text: 'هل يمكنك تلخيص النص التالي بشكل موجز: '
  },
  {
    id: 'translate',
    icon: DeltaIcon,
    label: 'ترجم إلى العربية',
    text: 'هل يمكنك ترجمة هذا النص إلى اللغة العربية: '
  },
  {
    id: 'multiple-choice',
    icon: CheckedSquare,
    label: 'أنشئ سؤال اختيار متعدد',
    text: 'أنشئ سؤال اختيار من متعدد حول هذا الموضوع: '
  },
  {
    id: 'add-title',
    icon: PenIcon,
    label: 'أضف عنوانًا',
    text: 'أقترح عنوانًا مناسبًا لهذا النص: '
  },
  {
    id: 'rephrase',
    icon: ThumbUpIcon,
    label: 'أعد الصياغة',
    text: 'هل يمكنك إعادة صياغة هذه الفكرة بأسلوب أوضح: '
  }
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

  // Close prompt menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (promptMenuRef.current && !promptMenuRef.current.contains(event.target as Node)) {
        setShowPromptMenu(false);
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

  const submitForm = useCallback(() => {
    handleSubmit(undefined, {});
    setLocalStorageInput("");

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [handleSubmit, setLocalStorageInput, width]);

  return (
    <div className="flex items-center w-full p-4 border-t border-[#E5E9F0] bg-white">
      <Textarea
        ref={textareaRef}
        placeholder="اكتب رسالتك..."
        value={input}
        onChange={handleInput}
        className={cn(
          "min-h-[40px] max-h-[120px] overflow-hidden resize-none rounded-2xl text-base bg-[#F8FAFC] border-[#E5E9F0] flex-1 placeholder:text-right dir-rtl py-3 px-4 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all",
          className,
        )}
        rows={1}
        autoFocus
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (isLoading) {
              toast.error("يرجى الانتظار حتى ينتهي المساعد من الرد!");
            } else {
              submitForm();
            }
          }
        }}
      />
      
      <div className="flex flex-col items-center gap-2 pr-4 relative" ref={promptMenuRef}>
        {isLoading ? (
          <Button
            className="rounded-full h-10 w-10 min-w-[40px] p-0 bg-[#3B82F6] text-white shrink-0 shadow-md hover:bg-[#2563EB] transition-colors"
            onClick={(event) => {
              event.preventDefault();
              stop();
              setMessages((messages) => sanitizeUIMessages(messages));
            }}
          >
            <StopIcon size={14} />
          </Button>
        ) : (
          <Button
            className="rounded-full h-10 min-w-[80px] px-4 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white text-sm shrink-0 flex items-center justify-center shadow-md hover:opacity-90 transition-all transform hover:scale-105"
            onClick={(event) => {
              event.preventDefault();
              submitForm();
            }}
            disabled={input.length === 0}
          >
            إرسال
          </Button>
        )}
        
        {/* Prompt Templates Button */}
        <Button
          className="rounded-full h-8 min-w-[80px] px-2 bg-white border border-[#E5E9F0] text-[#3B82F6] text-sm shrink-0 flex items-center justify-center shadow-sm hover:bg-[#F8FAFC] transition-all"
          onClick={(event) => {
            event.preventDefault();
            setShowPromptMenu(!showPromptMenu);
          }}
        >
          <span className="ml-1">قوالب</span>
          <ChevronDownIcon size={14} className={cn("transition-transform", showPromptMenu && "rotate-180")} />
        </Button>
        
        {/* Prompt Templates Menu */}
        {showPromptMenu && (
          <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-md border border-[#E5E9F0] w-64 z-10">
            <div className="p-2">
              <h3 className="text-sm font-bold text-[#3B82F6] mb-2 text-right px-2">اختر نموذج رسالة</h3>
              
              <div className="space-y-1">
                {presetPrompts.map((prompt) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={prompt.id}
                      className="flex items-center justify-end gap-2 w-full p-2 text-right text-[#334155] hover:bg-[#F8FAFC] rounded transition-colors"
                      onClick={() => insertPromptTemplate(prompt.text)}
                    >
                      <span className="text-sm">{prompt.label}</span>
                      <Icon size={14} className="text-[#3B82F6]" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
