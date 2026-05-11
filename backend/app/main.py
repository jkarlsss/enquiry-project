from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import EnquiryRequest, EnquiryResponse
from app.graph import enquiry_graph
import os


app = FastAPI(
    title="Strata AI Enquiry Processor",
    description="FastAPI + LangGraph backend for processing client enquiries.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("URL") or "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "Strata AI Enquiry Processor API is running.",
    }


@app.post("/analyze", response_model=EnquiryResponse)
def analyze_enquiry(payload: EnquiryRequest):
    try:
        result = enquiry_graph.invoke(
            {
                "enquiry": payload.enquiry,
                "is_valid": False,
                "error": None,
                "analysis": None,
            }
        )

        if result["error"]:
            return EnquiryResponse(
                success=False,
                error=result["error"],
            )

        return EnquiryResponse(
            success=True,
            data=result["analysis"],
        )

    except Exception as error:
        return EnquiryResponse(
            success=False,
            error=f"Failed to process enquiry: {str(error)}",
        )