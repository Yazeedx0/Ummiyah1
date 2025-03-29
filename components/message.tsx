"use client";

import type { Message } from "ai";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";

import { SparklesIcon, UserIcon, ThumbUpIcon } from "./icons";
import { Markdown } from "./markdown";
import { PreviewAttachment } from "./preview-attachment";
import { cn } from "@/lib/utils";
import { Weather } from "./weather";
import { Tooltip } from "./ui/tooltip";

export const PreviewMessage = ({
  message,
  chatId,
  isLoading,
}: {
  chatId: string;
  message: Message;
  isLoading: boolean;
}) => {
  const isAssistant = message.role === "assistant";
  const [isStarred, setIsStarred] = useState(false);

  const toggleStarred = useCallback(() => {
    setIsStarred((prev) => !prev);
  }, []);

  // Enhanced message animation variants
  const messageVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className="w-full px-3 py-2.5 group/message"
      initial="hidden"
      animate="visible"
      variants={messageVariants}
      data-role={message.role}
    >
      <div
        className={cn(
          "flex gap-4 py-5 px-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md",
          isAssistant
            ? "bg-[#EEF4FF] w-full md:w-[88%] border-l-4 border-[#4D79FF]"
            : "bg-[#F0FAF0] border w-full md:w-[88%] mr-auto flex-row-reverse border-r-4 border-[#33B37B]"
        )}
      >
        <div
          className={cn(
            "size-10 flex items-center rounded-full justify-center ring-2 shrink-0 shadow-sm transition-transform duration-300 group-hover/message:scale-110",
            isAssistant
              ? "bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF] ring-[#BFDBFE]"
              : "bg-gradient-to-br from-[#33B37B] to-[#7BDCB5] ring-[#D1FAE5]"
          )}
        >
          {isAssistant ? 
            <SparklesIcon className="text-white w-5 h-5" /> : 
            <UserIcon className="text-white w-5 h-5" />
          }
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center mb-2">
            <Tooltip content="تمييز الرسالة">
              <button
                onClick={toggleStarred}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="تمييز الرسالة"
              >
                <ThumbUpIcon className={`w-4 h-4 ${isStarred ? "text-yellow-400" : ""}`} />
              </button>
            </Tooltip>

            <span className={cn("text-sm font-medium", isAssistant ? "text-[#4D79FF]" : "text-[#33B37B]")}>
              {isAssistant ? "أُمية" : "أنت"}
            </span>
          </div>

          {message.content && (
            <div className="flex flex-col gap-3 text-right">
              <div className={cn(
                "text-[#334155] leading-relaxed",
                isAssistant ? "font-medium" : "font-medium"
              )}>
                <Markdown>{message.content as string}</Markdown>
              </div>
            </div>
          )}

          {message.toolInvocations?.map(({ toolName, toolCallId, state, result }) => (
            <div key={toolCallId} className="mt-2">
              {state === "result" ? (
                toolName === "get_current_weather" ? (
                  <Weather weatherAtLocation={result} />
                ) : (
                  <pre
                    dir="ltr"
                    className="bg-[#F8FAFC] p-3 rounded-lg text-sm overflow-x-auto border border-[#E5E9F0]"
                  >
                    {JSON.stringify(result, null, 2)}
                  </pre>
                )
              ) : toolName === "get_current_weather" ? (
                <Weather />
              ) : null}
            </div>
          ))}

          {message.experimental_attachments?.length > 0 && (
            <div className="flex flex-row-reverse gap-2 mt-2">
              {message.experimental_attachments.map((attachment) => (
                <PreviewAttachment key={attachment.url} attachment={attachment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const ThinkingMessage = () => (
  <motion.div
    className="w-full px-3 py-2.5"
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
    exit={{ opacity: 0, transition: { duration: 0.2 } }}
  >
    <div className="flex gap-4 w-full md:w-[88%] bg-[#F0F5FF] rounded-2xl px-6 py-5 shadow-sm border-l-4 border-[#4D79FF]">
      <div className="size-10 flex items-center rounded-full justify-center ring-2 ring-[#BFDBFE] shrink-0 shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <SparklesIcon className="text-white w-5 h-5" />
        </motion.div>
      </div>

      <div className="flex flex-col gap-2 w-full py-1">
        <div className="flex justify-between items-center mb-2">
          <div></div>
          <span className="text-sm font-medium text-[#4D79FF]">أُمية</span>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex space-x-3 rtl:space-x-reverse mr-auto">
            <motion.span 
              className="h-2.5 w-2.5 rounded-full bg-[#4D79FF]"
              animate={{ y: [-5, 0, -5] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
            <motion.span 
              className="h-2.5 w-2.5 rounded-full bg-[#4D79FF]"
              animate={{ y: [-5, 0, -5] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.span 
              className="h-2.5 w-2.5 rounded-full bg-[#4D79FF]"
              animate={{ y: [-5, 0, -5] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.4 }}
            />
          </div>
          <span className="text-[#4D79FF] text-right font-medium">جاري التفكير...</span>
        </div>
      </div>
    </div>
  </motion.div>
);
