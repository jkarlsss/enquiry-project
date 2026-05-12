type SuggestedResponseProps = {
  response: string;
  isCopied: boolean;
  onCopy: () => void;
};

export const SuggestedResponse = ({
  response,
  isCopied,
  onCopy,
}: SuggestedResponseProps) => {
  return (
    <section className="rounded-3xl border border-blue-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-blue-950">
          Suggested Client Response
        </h2>

        <button
          onClick={onCopy}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="rounded-2xl bg-gray-100 p-5 text-slate-700 shadow-sm">
        <p className="whitespace-pre-line leading-relaxed">
          {response}
        </p>
      </div>
    </section>
  );
};