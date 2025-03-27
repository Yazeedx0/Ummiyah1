"use client";

import type { Message } from "ai";
import { motion } from "framer-motion";

import { SparklesIcon, UserIcon } from "./icons";
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
  return (
    <motion.div
      className="w-full px-3 py-2 group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cn(
          "flex gap-3 px-4 py-3 rounded-lg",
          message.role === "user" 
            ? "bg-[#E6F0FA] w-full md:w-[85%] mr-auto flex-row-reverse" 
            : "bg-[#E6F0FA] w-full md:w-[85%]"
        )}
      >
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-[#DADDE1] bg-[#3B82F6]">
          {message.role === "user" ? (
            <UserIcon size={16} className="text-white" />
          ) : (
            <SparklesIcon size={16} className="text-white" />
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
                        <pre dir="ltr">{JSON.stringify(result, null, 2)}</pre>
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
      animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
    >
      <div
        className="flex gap-3 w-full md:w-[85%] bg-[#E6F0FA] rounded-lg px-4 py-3"
      >
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-[#DADDE1] bg-[#3B82F6]">
          <SparklesIcon size={16} className="text-white" />
        </div>

        <div className="flex flex-col gap-2 w-full py-1">
          <div className="flex flex-col gap-4 text-muted-foreground text-right">
            جاري التفكير...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
