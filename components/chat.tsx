// @ts-nocheck
"use client";

import { PreviewMessage, ThinkingMessage } from "@/components/message";
import { MultimodalInput } from "@/components/multimodal-input";
import { Overview } from "@/components/overview";
import Header from "@/components/header";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { useChat } from "ai/react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chat() {
  const chatId = "001";
  const [sendingStatus, setSendingStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isThinkingShown, setIsThinkingShown] = useState(false);

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
  } = useChat({
    maxSteps: 4,
    onResponse: () => {
      setSendingStatus("success");
      toast.success("تم إرسال الرسالة بنجاح!");
      setTimeout(() => setSendingStatus("idle"), 2000);
    },
    onError: (error) => {
      setSendingStatus("error");
      if (error.message.includes("Too many requests")) {
        toast.error("عذراً، أنت ترسل الكثير من الرسائل. يرجى المحاولة لاحقاً.");
      } else {
        toast.error("فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.");
      }
      setTimeout(() => setSendingStatus("idle"), 2000);
    },
  });

  useEffect(() => {
    setIsThinkingShown(isLoading);
  }, [isLoading]);

  const onSubmit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    if (isLoading) {
      toast.error("يرجى الانتظار حتى ينتهي المساعد من الرد!");
      return;
    }

    setSendingStatus("sending");
    try {
      await handleSubmit(event);
    } catch (error) {
      setSendingStatus("error");
      toast.error("فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى.");
      setTimeout(() => setSendingStatus("idle"), 2000);
    }
  };

  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  return (
    <div className="flex flex-col w-full h-[100dvh] bg-white">
      <Header />
      <div ref={messagesContainerRef} className="flex flex-col flex-1 w-full overflow-y-auto py-5 px-0 gap-6">
        {messages.length === 0 && <Overview />}
        {messages.map((message, index) => (
          <PreviewMessage
            key={message.id}
            chatId={chatId}
            message={message}
            isLoading={isLoading && messages.length - 1 === index}
          />
        ))}
        <AnimatePresence>
          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" &&
            isThinkingShown && <ThinkingMessage />}
        </AnimatePresence>
        <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
      </div>

      <AnimatePresence>
        {sendingStatus === "sending" && (
          <motion.div
            className="bg-blue-500 text-white text-center py-1 text-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            جاري إرسال الرسالة...
          </motion.div>
        )}
      </AnimatePresence>

      <form className="flex w-full bg-[#F5F5F5] py-4 md:py-5 px-3 border-t sticky bottom-0 shadow-sm">
        <MultimodalInput
          chatId={chatId}
          input={input}
          setInput={setInput}
          handleSubmit={onSubmit}
          isLoading={isLoading}
          stop={stop}
          messages={messages}
          setMessages={setMessages}
          append={append}
          className="text-right"
        />
      </form>
    </div>
  );
}
