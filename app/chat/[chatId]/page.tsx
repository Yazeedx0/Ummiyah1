"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { PreviewMessage, ThinkingMessage } from "@/components/message";
import { MultimodalInput } from "@/components/multimodal-input";
import ChatLayout from "@/components/chat-layout";
import { Overview } from "@/components/overview";

export default function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    params.then((data) => setChatId(data.chatId)).catch(console.error);
  }, [params]);

  const {
    messages,
    setMessages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    stop,
    append,
  } = useChat({
    api: "/api/chat",
    id: chatId || "", 
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "مرحبًا! أنا أُمية، وأنا هنا لأساعدك في دراستك! هل لديك أي سؤال يمكنني مساعدتك في الإجابة عليه اليوم؟",
      }
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ChatLayout>
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {messages.length === 0 ? (
          <Overview />
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <PreviewMessage
                key={message.id}
                chatId={chatId || ""}
                message={message}
                isLoading={false}
              />
            ))}
            {isLoading && <ThinkingMessage />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="sticky bottom-0 w-full">
        <MultimodalInput
          chatId={chatId || ""}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          stop={stop}
          messages={messages}
          setMessages={setMessages}
          append={append}
          handleSubmit={handleSubmit}
        />
      </div>
    </ChatLayout>
  );
}
