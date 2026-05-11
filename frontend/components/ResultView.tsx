"use client";

import { MessageCircleQuestion } from "lucide-react";
import type { Message } from "@/types/chat";

type ResultViewProps = {
  messages: Message[];
};

export function ResultView({ messages }: ResultViewProps) {
  if (messages.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {messages.map((message) => {
        const isUser = message.role === "user";

        if (message.isLoading) {
          return <SystemLoadingMessage key={message.id} />;
        }

        return (
          <div
            key={message.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`
                max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-6
                ${
                  isUser
                    ? "bg-white text-black"
                    : "border border-white/10 bg-[#1f1f1f] text-white"
                }
              `}
            >
              <p className="mb-1 text-xs font-semibold opacity-60">
                {isUser ? "You" : "System"}
              </p>

              <p className="whitespace-pre-wrap break-words">
                {message.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SystemLoadingMessage() {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[85%] items-center gap-3 rounded-2xl border border-white/10 bg-[#1f1f1f] px-5 py-4 text-white">
        <div className="relative flex size-8 items-center justify-center rounded-full bg-white/10">
          <MessageCircleQuestion
            size={18}
            className="animate-pulse text-white/80"
          />

          <span className="absolute inset-0 rounded-full border border-white/10 animate-ping" />
        </div>

        <div className="flex items-center gap-1">
          <span className="size-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:0ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:150ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-white/50 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}