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
      className="w-full px-3 py-1.5 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cn(
          "flex gap-3 py-3 px-4 rounded-2xl shadow-sm",
          isAssistant 
            ? "bg-[#EEF4FF] w-full md:w-[90%] border-l-4 border-[#4D79FF]" 
            : "bg-white border border-[#E5E9F0] w-full md:w-[90%] mr-auto flex-row-reverse border-r-4 border-[#7BDCB5]"
        )}
      >
        <div className={cn(
          "size-9 flex items-center rounded-full justify-center ring-1 shrink-0 ring-[#E5E9F0] shadow-sm",
          isAssistant 
            ? "bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF]"
            : "bg-gradient-to-br from-[#33B37B] to-[#7BDCB5]"
        )}>
          {isAssistant ? (
            <SparklesIcon size={18} className="text-white" />
          ) : (
            <UserIcon size={18} className="text-white" />
          )}
        </div>

        <div className="flex flex-col gap-2 w-full text-right">
          {message.content && (
            <div className="flex flex-col gap-3">
              <Markdown>{message.content as string}</Markdown>
            </div>
          )}

          {message.toolInvocations && message.toolInvocations.length > 0 && (
            <div className="flex flex-col gap-4">
              {message.toolInvocations.map((toolInvocation) => {
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === "result") {
                  const { result } = toolInvocation;

                  return (
                    <div key={toolCallId}>
                      {toolName === "get_current_weather" ? (
                        <Weather weatherAtLocation={result} />
                      ) : (
                        <pre dir="ltr" className="bg-[#F8FAFC] p-3 rounded-lg text-sm overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
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
            <div className="flex flex-row gap-2">
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
        className="flex gap-3 w-full md:w-[90%] bg-[#EEF4FF] rounded-2xl px-4 py-3 shadow-sm border-l-4 border-[#4D79FF]"
      >
        <div className="size-9 flex items-center rounded-full justify-center ring-1 shrink-0 ring-[#E5E9F0] shadow-sm bg-gradient-to-br from-[#4D79FF] to-[#7C9CFF]">
          <SparklesIcon size={18} className="text-white" />
        </div>

        <div className="flex flex-col gap-2 w-full py-1">
          <div className="flex gap-2 items-center">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <span className="animate-bounce h-2 w-2 rounded-full bg-[#4D79FF] delay-0"></span>
              <span className="animate-bounce h-2 w-2 rounded-full bg-[#4D79FF] delay-150"></span>
              <span className="animate-bounce h-2 w-2 rounded-full bg-[#4D79FF] delay-300"></span>
            </div>
            <span className="text-[#4D79FF] mr-2 text-right font-medium">جاري التفكير...</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
