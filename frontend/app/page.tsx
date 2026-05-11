"use client";

import { useState } from "react";


type AnalysisResult = {
  classification: string;
  confidence: number;
  summary: string;
  priority: string;
  recommended_action: string;
  suggested_response: string;
  needs_human_review: boolean;
  reasoning: string;
};

type ApiResponse = {
  success: boolean;
  data: AnalysisResult | null;
  error: string | null;
};

function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}

function getPriorityStyle(priority: string) {
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

function getClassificationStyle(classification: string) {
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

function getConfidenceColor(confidence: number) {
  if (confidence >= 85) return "bg-green-500";
  if (confidence >= 70) return "bg-yellow-500";
  return "bg-red-500";
}

function LoadingState() {
  return (
    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        <div>
          <h2 className="font-semibold text-blue-900">
            Analysing client enquiry...
          </h2>
          <p className="text-sm text-blue-700">
            Classifying enquiry, generating response, and checking priority.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="animate-pulse rounded-xl bg-white p-4">
          <div className="mb-3 h-3 w-24 rounded bg-blue-100" />
          <div className="h-5 w-32 rounded bg-blue-200" />
        </div>

        <div className="animate-pulse rounded-xl bg-white p-4">
          <div className="mb-3 h-3 w-24 rounded bg-blue-100" />
          <div className="h-5 w-32 rounded bg-blue-200" />
        </div>

        <div className="animate-pulse rounded-xl bg-white p-4">
          <div className="mb-3 h-3 w-24 rounded bg-blue-100" />
          <div className="h-5 w-32 rounded bg-blue-200" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [enquiry, setEnquiry] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  async function handleAnalyze() {
    if (!enquiry.trim()) {
      setError("Please enter a client enquiry.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enquiry: enquiry.trim(),
        }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to analyse enquiry.");
        return;
      }

      if (!data.data) {
        setError("No analysis result was returned.");
        return;
      }

      setResult(data.data);
    } catch (err) {
      console.error(err);
      setError(
        "Network error. Please make sure the FastAPI backend is running.",
      );
    } finally {
      setIsCopied(false);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6">
            <div className="mb-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              FastAPI + LangGraph + AI Workflow
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              AI Client Enquiry Processor
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600">
              Paste a client enquiry below. The AI will classify the message,
              assign priority, estimate confidence, and suggest a staff
              response.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Client Enquiry
            </label>

            <textarea
              className="h-44 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              placeholder="Example: Hi, I have been waiting for an update about our levy notice and nobody has replied. This is very frustrating..."
              value={enquiry}
              onChange={(e) => setEnquiry(e.target.value)}
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                {enquiry.trim().length} characters
              </p>

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {loading ? "Analysing..." : "Analyze Enquiry"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {loading && <LoadingState />}
        </div>

        {result && (
          <div className="space-y-6">
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

            <section className="rounded-3xl border border-blue-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-blue-950">
                  Suggested Client Response
                </h2>

                <button
                  onClick={() => {

                    setIsCopied(true);
                    navigator.clipboard.writeText(result.suggested_response);
                  }}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="rounded-2xl bg-gray-100 p-5 text-slate-700 shadow-sm">
                <p className="whitespace-pre-line leading-relaxed">
                  {result.suggested_response}
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
