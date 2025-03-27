"use client";

import type { Message } from "ai";
import { motion } from "framer-motion";

import { SparklesIcon, UserIcon, CheckCircleFillIcon } from "./icons";
import { Markdown } from "./markdown";
import { PreviewAttachment } from "./preview-attachment";
import { cn } from "@/lib/utils";
import { Weather } from "./weather";

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
  
  return (
    <motion.div
      className="w-full px-3 py-2 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cn(
          "flex gap-4 py-4 px-5 rounded-2xl shadow-sm",
          isAssistant 
            ? "bg-[#EEF4FF] w-full md:w-[88%] border-l-4 border-[#4D79FF]" 
            : "bg-white border border-[#E5E9F0] w-full md:w-[88%] mr-auto flex-row-reverse border-r-4 border-[#7BDCB5]"
        )}
      >
        <div className={cn(
          "size-12 flex items-center rounded-full justify-center ring-2 shrink-0 shadow-sm",
          isAssistant 
            ? "bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF] ring-[#BFDBFE]"
            : "bg-gradient-to-br from-[#33B37B] to-[#7BDCB5] ring-[#D1FAE5]"
        )}>
          {isAssistant ? (
            <SparklesIcon size={24} style={{ color: 'white' }} />
          ) : (
            <UserIcon size={24} style={{ color: 'white' }} />
          )}
        </div>

        <div className="flex flex-col gap-2 w-full text-right">
          {/* Message header */}
          <div className="flex justify-end items-center mb-1">
            <span className={cn(
              "font-bold text-sm",
              isAssistant ? "text-[#4D79FF]" : "text-[#33B37B]"
            )}>
              {isAssistant ? "أُمية" : "أنت"}
            </span>
          </div>

          {message.content && (
            <div className="flex flex-col gap-3">
              <Markdown>{message.content as string}</Markdown>
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
            <div className="flex flex-row gap-2 mt-2">
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
      className="w-full px-3"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
    >
      <div
        className="flex gap-4 w-full md:w-[88%] bg-[#F0F5FF] rounded-2xl px-5 py-4 shadow-sm border-l-4 border-[#4D79FF]"
      >
        <div className="size-12 flex items-center rounded-full justify-center ring-2 ring-[#BFDBFE] shrink-0 shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF]">
          <SparklesIcon size={24} style={{ color: 'white' }} />
        </div>

        <div className="flex flex-col gap-2 w-full py-1">
          <div className="flex justify-end items-center mb-1">
            <span className="font-bold text-sm text-[#4D79FF]">أُمية</span>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="flex space-x-3 rtl:space-x-reverse mr-auto">
              <span className="animate-bounce h-3 w-3 rounded-full bg-[#4D79FF] delay-0"></span>
              <span className="animate-bounce h-3 w-3 rounded-full bg-[#4D79FF] delay-150"></span>
              <span className="animate-bounce h-3 w-3 rounded-full bg-[#4D79FF] delay-300"></span>
            </div>
            <span className="text-[#4D79FF] text-right font-medium">جاري التفكير...</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
