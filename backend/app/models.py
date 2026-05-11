from typing import Literal, Optional
from pydantic import BaseModel, Field


Classification = Literal[
    "new_client",
    "support_request",
    "complaint",
    "general_question",
    "urgent_issue",
    "unclear",
]

Priority = Literal["low", "medium", "high"]


class EnquiryRequest(BaseModel):
    enquiry: str = Field(..., min_length=3)


class EnquiryAnalysis(BaseModel):
    classification: Classification
    confidence: int = Field(..., ge=0, le=100)
    summary: str
    priority: Priority
    recommended_action: str
    suggested_response: str
    needs_human_review: bool
    reasoning: str


class EnquiryResponse(BaseModel):
    success: bool
    data: Optional[EnquiryAnalysis] = None
    error: Optional[str] = None