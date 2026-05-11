export type Message = {
  id: string;
  role: "user" | "system";
  content: string;
  isLoading?: boolean;
};