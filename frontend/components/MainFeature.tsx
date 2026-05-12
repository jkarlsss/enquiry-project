"use client";

import { useState } from "react";
import { LoadingState } from "./EnquiryLoading";
import { EnquiryForm } from "./EnquiryForm";
import { ErrorAlert } from "./ErrorAlert";
import { ResultCards } from "./ResultCards";
import { ResultDetails } from "./ResultDetails";
import { SuggestedResponse } from "./SuggestedResponse";
import type { AnalysisResult, ApiResponse } from "../types/chat";
import { toast } from "sonner";

export const MainFeature = () => {
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const response = await fetch(`${apiUrl}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enquiry: enquiry.trim(),
        }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || "Failed to analyse enquiry.");
        toast.error(data.error || "Failed to analyse enquiry.");
        return;
      }

      if (!data.data) {
        setError("No analysis result was returned.");
        toast.error("No analysis result was returned.");
        return;
      }

      setResult(data.data);
    } catch (err) {
      console.error(err);
      setError("Network error. Please make sure the FastAPI backend is running.");
      toast.error("Network error. Please make sure the FastAPI backend is running.");
    } finally {
      setIsCopied(false);
      setLoading(false);
    }
  }

  function handleCopyResponse() {
    if (!result?.suggested_response) return;

    navigator.clipboard.writeText(result.suggested_response);
    setIsCopied(true);
  }

  return (
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
            assign priority, estimate confidence, and suggest a staff response.
          </p>
        </div>

        <EnquiryForm
          enquiry={enquiry}
          loading={loading}
          onChange={setEnquiry}
          onAnalyze={handleAnalyze}
        />

        {error && <ErrorAlert message={error} />}

        {loading && <LoadingState />}
      </div>

      {result && (
        <div className="space-y-6">
          <ResultCards result={result} />

          <ResultDetails result={result} />

          <SuggestedResponse
            response={result.suggested_response}
            isCopied={isCopied}
            onCopy={handleCopyResponse}
          />
        </div>
      )}
    </div>
  );
};