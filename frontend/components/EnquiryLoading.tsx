export function LoadingState() {
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