import type { AnalysisResult } from "../types/chat";

type ResultDetailsProps = {
  result: AnalysisResult;
};

export const ResultDetails = ({ result }: ResultDetailsProps) => {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Summary</h2>

          <p className="mt-3 leading-relaxed text-slate-700">
            {result.summary}
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Human Review
          </h2>

          <div
            className={`mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-medium ${
              result.needs_human_review
                ? "border-orange-200 bg-orange-50 text-orange-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {result.needs_human_review
              ? "Review required"
              : "No review required"}
          </div>

          <p className="mt-3 text-slate-700">{result.reasoning}</p>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Recommended Staff Action
        </h2>

        <p className="mt-3 leading-relaxed text-slate-700">
          {result.recommended_action}
        </p>
      </section>
    </>
  );
};