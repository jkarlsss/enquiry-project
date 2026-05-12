import type { AnalysisResult } from "../types/chat";
import {
  formatLabel,
  getClassificationStyle,
  getConfidenceColor,
  getPriorityStyle,
} from "../lib/utils";

type ResultCardsProps = {
  result: AnalysisResult;
};

export const ResultCards = ({ result }: ResultCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div
        className={`rounded-2xl border p-5 shadow-sm ${getClassificationStyle(
          result.classification,
        )}`}
      >
        <p className="text-sm font-medium opacity-80">Classification</p>
        <p className="mt-2 text-xl font-bold capitalize">
          {formatLabel(result.classification)}
        </p>
      </div>

      <div
        className={`rounded-2xl border p-5 shadow-sm ${getPriorityStyle(
          result.priority,
        )}`}
      >
        <p className="text-sm font-medium opacity-80">Priority</p>
        <p className="mt-2 text-xl font-bold capitalize">
          {result.priority}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Confidence</p>

        <p className="mt-2 text-xl font-bold text-slate-900">
          {result.confidence}%
        </p>

        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${getConfidenceColor(
              result.confidence,
            )}`}
            style={{ width: `${result.confidence}%` }}
          />
        </div>
      </div>
    </div>
  );
};