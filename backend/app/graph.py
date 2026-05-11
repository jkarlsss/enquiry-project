from typing import TypedDict, Optional
from langgraph.graph import StateGraph, START, END

from app.models import EnquiryAnalysis
from app.llm import analyze_enquiry_with_gemini


class EnquiryState(TypedDict):
    enquiry: str
    is_valid: bool
    error: Optional[str]
    analysis: Optional[EnquiryAnalysis]


def validate_input(state: EnquiryState) -> EnquiryState:
    enquiry = state["enquiry"].strip()

    if len(enquiry) < 10:
        return {
            **state,
            "is_valid": False,
            "error": "Please enter a clearer enquiry with at least 10 characters.",
        }

    return {
        **state,
        "enquiry": enquiry,
        "is_valid": True,
        "error": None,
    }


def route_after_validation(state: EnquiryState) -> str:
    if not state["is_valid"]:
        return "end"
    return "analyze"


def analyze_enquiry(state: EnquiryState) -> EnquiryState:
    analysis = analyze_enquiry_with_gemini(state["enquiry"])

    return {
        **state,
        "analysis": analysis,
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