type EnquiryFormProps = {
  enquiry: string;
  loading: boolean;
  onChange: (value: string) => void;
  onAnalyze: () => void;
};

export const EnquiryForm = ({
  enquiry,
  loading,
  onChange,
  onAnalyze,
}: EnquiryFormProps) => {
  const characterCount = enquiry.trim().length;
  
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Client Enquiry
      </label>

      <textarea
        className="h-44 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        placeholder="Example: Hi, I have been waiting for an update about our levy notice and nobody has replied. This is very frustrating..."
        value={enquiry}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          {characterCount} characters
        </p>

        <button
          onClick={onAnalyze}
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
  );
};