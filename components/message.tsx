"use client";

import type { Message } from "ai";
import { motion } from "framer-motion";
import { useState } from "react";

import { SparklesIcon, UserIcon, CheckCircleFillIcon, ThumbUpIcon } from "./icons";
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
  
  return (
    <motion.div
      className="w-full px-3 py-2.5 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cn(
          "flex gap-4 py-5 px-6 rounded-2xl shadow-sm",
          isAssistant 
            ? "bg-[#EEF4FF] w-full md:w-[88%] border-l-4 border-[#4D79FF]" 
            : "bg-[#F0FAF0] border border-[#D1FAE5] w-full md:w-[88%] mr-auto flex-row-reverse border-r-4 border-[#33B37B]"
        )}
      >
        {/* RTL adjustment: Icon position based on role */}
        <div className={cn(
          "size-10 flex items-center rounded-full justify-center ring-2 shrink-0 shadow-sm",
          isAssistant 
            ? "bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF] ring-[#BFDBFE]"
            : "bg-gradient-to-br from-[#33B37B] to-[#7BDCB5] ring-[#D1FAE5]"
        )}>
          {isAssistant ? (
            <SparklesIcon size={20} style={{ color: 'white' }} />
          ) : (
            <UserIcon size={20} style={{ color: 'white' }} />
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          {/* Message header with name on right and star on left */}
          <div className="flex justify-between items-center mb-2">
            <Tooltip content="تمييز الرسالة">
              <button 
                onClick={() => setIsStarred(!isStarred)}
                className="text-gray-400 hover:text-yellow-400 transition-colors"
                aria-label="تمييز الرسالة"
              >
                {isStarred ? (
                  <ThumbUpIcon size={16} className="text-yellow-400" />
                ) : (
                  <ThumbUpIcon size={16} />
                )}
              </button>
            </Tooltip>
            
            <span className={cn(
              "text-sm font-medium",
              isAssistant ? "text-[#4D79FF]" : "text-[#33B37B]"
            )}>
              {isAssistant ? "أُمية" : "أنت"}
            </span>
          </div>

          {message.content && (
            <div className="flex flex-col gap-3 text-right">
              <div className="text-[#334155] leading-relaxed font-medium">
                <Markdown>{message.content as string}</Markdown>
              </div>
            </div>
          )}

          {message.toolInvocations && message.toolInvocations.length > 0 && (
            <div className="flex flex-col gap-4 mt-2">
              {message.toolInvocations.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === "result") {
                  const { result } = toolInvocation;

                  return (
                    <div key={toolCallId}>
                      {toolName === "get_current_weather" ? (
                        <Weather weatherAtLocation={result} />
                      ) : (
                        <pre dir="ltr" className="bg-[#F8FAFC] p-3 rounded-lg text-sm overflow-x-auto border border-[#E5E9F0]">{JSON.stringify(result, null, 2)}</pre>
                      )}
                    </div>
                  );
                }
                return (
                  <div
                    key={toolCallId}
                    className={cn({
                      skeleton: ["get_current_weather"].includes(toolName),
                    })}
                  >
                    {toolName === "get_current_weather" ? <Weather /> : null}
                  </div>
                );
              })}
            </div>
          )}

          {message.experimental_attachments && (
            <div className="flex flex-row-reverse gap-2 mt-2">
              {message.experimental_attachments.map((attachment) => (
                <PreviewAttachment
                  key={attachment.url}
                  attachment={attachment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const ThinkingMessage = () => {
  return (
    <motion.div
      className="w-full px-3 py-2.5"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
    >
      <div
        className="flex gap-4 w-full md:w-[88%] bg-[#F0F5FF] rounded-2xl px-6 py-5 shadow-sm border-l-4 border-[#4D79FF]"
      >
        <div className="size-10 flex items-center rounded-full justify-center ring-2 ring-[#BFDBFE] shrink-0 shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF]">
          <SparklesIcon size={20} style={{ color: 'white' }} />
        </div>

        <div className="flex flex-col gap-2 w-full py-1">
          {/* Align the thinking message header to the right */}
          <div className="flex justify-between items-center mb-2">
            <div></div> {/* Empty div for flex spacing */}
            <span className="text-sm font-medium text-[#4D79FF]">أُمية</span>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="flex space-x-3 rtl:space-x-reverse mr-auto">
              <span className="animate-bounce h-2.5 w-2.5 rounded-full bg-[#4D79FF] delay-0"></span>
              <span className="animate-bounce h-2.5 w-2.5 rounded-full bg-[#4D79FF] delay-150"></span>
              <span className="animate-bounce h-2.5 w-2.5 rounded-full bg-[#4D79FF] delay-300"></span>
            </div>
            <span className="text-[#4D79FF] text-right font-medium">جاري التفكير...</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
