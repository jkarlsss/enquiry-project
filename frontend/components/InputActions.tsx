"use client";

import {
  ChevronDown,
  Loader2,
  Plus,
  SendHorizontal,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

type InputActionsProps = {
  inputValue: string;
  isGenerating: boolean;
  onSubmit: () => void;
};

export function InputActions({
  inputValue,
  isGenerating,
  onSubmit,
}: InputActionsProps) {
  const hasValue = inputValue.trim().length > 0;
  const isDisabled = !hasValue || isGenerating;

  return (
    <div className="mt-5 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <button
          type="button"
          className="rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <Plus size={20} />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full px-2.5 py-1.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <SlidersHorizontal size={17} />
          Tools
        </button>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Fast
          <ChevronDown size={15} />
        </button>

        <button
          type="button"
          disabled={isDisabled}
          onClick={onSubmit}
          className={cn(
            "rounded-full p-1.5",
            !isDisabled
              ? "text-white/80 transition hover:bg-white/10 hover:text-white"
              : "cursor-not-allowed text-white/30"
          )}
        >
          {isGenerating ? (
            <Loader2 size={19} className="animate-spin" />
          ) : (
            <SendHorizontal size={19} />
          )}
        </button>
      </div>
    </div>
  );
}