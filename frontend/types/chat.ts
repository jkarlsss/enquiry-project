export type Message = {
  id: string;
  role: "user" | "system";
  content: string;
  isLoading?: boolean;
};



export type AnalysisResult = {
  classification: string;
  confidence: number;
  summary: string;
  priority: string;
  recommended_action: string;
  suggested_response: string;
  needs_human_review: boolean;
  reasoning: string;
};

export type ApiResponse = {
  success: boolean;
  data: AnalysisResult | null;
  error: string | null;
};