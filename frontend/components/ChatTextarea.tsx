"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ChatTextareaProps = {
  value: string;
  isMaxHeight: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
  onResize: () => void;
  onSubmit: () => void;
};

export const ChatTextarea = forwardRef<HTMLTextAreaElement, ChatTextareaProps>(
  (
    { value, isMaxHeight, disabled = false, onChange, onResize, onSubmit },
    ref
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit();
      }
    };

    return (
      <textarea
        ref={ref}
        rows={1}
        placeholder="Ask Something..."
        value={value}
        disabled={disabled}
        onInput={onResize}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "custom-dark-scrollbar min-h-[32px] max-h-[260px] w-full resize-none bg-transparent pr-3 text-[15px] leading-6 text-white outline-none placeholder:text-white/50 disabled:cursor-not-allowed disabled:opacity-60",
          isMaxHeight ? "overflow-y-auto" : "overflow-hidden"
        )}
      />
    );
  }
);

ChatTextarea.displayName = "ChatTextarea";