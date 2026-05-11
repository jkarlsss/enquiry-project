"use client";

import { useRef, useState } from "react";
import { ResultView } from "./ResultView";
import { ChatTextarea } from "./ChatTextarea";
import { InputActions } from "./InputActions";
import type { Message } from "@/types/chat";

export default function GeminiInputBox() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isMaxHeight, setIsMaxHeight] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const MAX_HEIGHT = 260;

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    const newHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT);
    textarea.style.height = `${newHeight}px`;

    setIsMaxHeight(textarea.scrollHeight > MAX_HEIGHT);
  };

  const resetTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "32px";
    setIsMaxHeight(false);
  };

  const handleSubmit = () => {
    const prompt = inputValue.trim();
    if (!prompt || isGenerating) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
    };

    const loadingMessageId = crypto.randomUUID();

    const loadingSystemMessage: Message = {
      id: loadingMessageId,
      role: "system",
      content: "",
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingSystemMessage]);
    setInputValue("");
    setIsGenerating(true);

    requestAnimationFrame(() => {
      resetTextarea();
    });

    // Replace this with your real API call later
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === loadingMessageId
            ? {
                ...message,
                content: `This is a sample system response for: "${prompt}"`,
                isLoading: false,
              }
            : message
        )
      );

      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full max-w-[760px] flex-col rounded-[30px] border border-white/5 bg-[#1f1f1f] px-6 py-5 shadow-lg shadow-black/20">
        <ChatTextarea
          ref={textareaRef}
          value={inputValue}
          isMaxHeight={isMaxHeight}
          disabled={isGenerating}
          onChange={setInputValue}
          onResize={resizeTextarea}
          onSubmit={handleSubmit}
        />

        <InputActions
          inputValue={inputValue}
          isGenerating={isGenerating}
          onSubmit={handleSubmit}
        />
      </div>

      <div className="mt-14 w-full max-w-[760px]">
        <ResultView messages={messages} />
      </div>
    </div>
  );
}