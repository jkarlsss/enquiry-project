type ErrorAlertProps = {
  message: string;
};

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
      <p className="font-medium">Error</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};