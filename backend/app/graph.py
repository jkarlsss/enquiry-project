from typing import TypedDict, Optional
import re

from langgraph.graph import StateGraph, START, END

from app.models import EnquiryAnalysis
from app.llm import analyze_enquiry_with_gemini


class EnquiryState(TypedDict):
    enquiry: str
    is_valid: bool
    error: Optional[str]
    analysis: Optional[EnquiryAnalysis]


MIN_ENQUIRY_LENGTH = 10
MAX_ENQUIRY_LENGTH = 5000


def is_mostly_symbols_or_numbers(text: str) -> bool:
    """
    Returns True if the enquiry contains very little normal text.
    Example: "1234567890 !!! ??? ###"
    """
    letters = re.findall(r"[a-zA-Z]", text)
    total_chars = len(text.replace(" ", ""))

    if total_chars == 0:
        return True

    letter_ratio = len(letters) / total_chars
    return letter_ratio < 0.3


def looks_like_spam(text: str) -> bool:
    """
    Basic spam detection for obvious low-quality input.
    This does not replace AI classification, but prevents wasting an API call.
    """
    spam_patterns = [
        r"http[s]?://",
        r"www\.",
        r"free money",
        r"click here",
        r"crypto",
        r"bitcoin",
        r"casino",
        r"loan approved",
        r"make money fast",
    ]

    lowered = text.lower()

    return any(re.search(pattern, lowered) for pattern in spam_patterns)


def validate_input(state: EnquiryState) -> EnquiryState:
    enquiry = state.get("enquiry", "")

    if enquiry is None:
        return {
            **state,
            "is_valid": False,
            "error": "Enquiry is required.",
            "analysis": None,
        }

    enquiry = enquiry.strip()

    if not enquiry:
        return {
            **state,
            "enquiry": enquiry,
            "is_valid": False,
            "error": "Please enter a client enquiry before analysing.",
            "analysis": None,
        }

    if len(enquiry) < MIN_ENQUIRY_LENGTH:
        return {
            **state,
            "enquiry": enquiry,
            "is_valid": False,
            "error": f"Please enter a clearer enquiry with at least {MIN_ENQUIRY_LENGTH} characters.",
            "analysis": None,
        }

    if len(enquiry) > MAX_ENQUIRY_LENGTH:
        return {
            **state,
            "enquiry": enquiry,
            "is_valid": False,
            "error": f"The enquiry is too long. Please keep it under {MAX_ENQUIRY_LENGTH} characters.",
            "analysis": None,
        }

    if is_mostly_symbols_or_numbers(enquiry):
        return {
            **state,
            "enquiry": enquiry,
            "is_valid": False,
            "error": "The enquiry does not contain enough readable text. Please enter a clear client message.",
            "analysis": None,
        }

    if looks_like_spam(enquiry):
        return {
            **state,
            "enquiry": enquiry,
            "is_valid": False,
            "error": "This enquiry appears to contain spam-like content. Please enter a valid client enquiry.",
            "analysis": None,
        }

    return {
        **state,
        "enquiry": enquiry,
        "is_valid": True,
        "error": None,
        "analysis": None,
    }


def route_after_validation(state: EnquiryState) -> str:
    if not state.get("is_valid"):
        return "end"

    return "analyze"


def analyze_enquiry(state: EnquiryState) -> EnquiryState:
    try:
        enquiry = state.get("enquiry", "").strip()

        if not enquiry:
            return {
                **state,
                "is_valid": False,
                "error": "No enquiry was provided for analysis.",
                "analysis": None,
            }

        analysis = analyze_enquiry_with_gemini(enquiry)

        if analysis is None:
            return {
                **state,
                "is_valid": False,
                "error": "The AI did not return an analysis result.",
                "analysis": None,
            }

        return {
            **state,
            "analysis": analysis,
            "error": None,
        }

    except ValueError as error:
        return {
            **state,
            "is_valid": False,
            "error": f"AI response error: {str(error)}",
            "analysis": None,
        }

    except Exception:
        return {
            **state,
            "is_valid": False,
            "error": "Something went wrong while processing the enquiry. Please try again.",
            "analysis": None,
        }


def build_enquiry_graph():
    graph = StateGraph(EnquiryState)

    graph.add_node("validate_input", validate_input)
    graph.add_node("analyze_enquiry", analyze_enquiry)

    graph.add_edge(START, "validate_input")

    graph.add_conditional_edges(
        "validate_input",
        route_after_validation,
        {
            "analyze": "analyze_enquiry",
            "end": END,
        },
    )

    graph.add_edge("analyze_enquiry", END)

    return graph.compile()


enquiry_graph = build_enquiry_graph()