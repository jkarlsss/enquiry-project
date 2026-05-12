// src/lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}

export function getPriorityStyle(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export function getClassificationStyle(classification: string) {
  switch (classification) {
    case "complaint":
      return "bg-red-100 text-red-700 border-red-200";
    case "urgent_issue":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "new_client":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "support_request":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "general_question":
      return "bg-cyan-100 text-cyan-700 border-cyan-200";
    case "unclear":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
}

export function getConfidenceColor(confidence: number) {
  if (confidence >= 85) return "bg-green-500";
  if (confidence >= 70) return "bg-yellow-500";
  return "bg-red-500";
}
