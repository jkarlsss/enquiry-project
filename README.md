# AI Client Enquiry Processor

A working AI-powered prototype built for **Strata Management Consultants** to help staff process incoming client enquiries faster and more consistently.

The tool accepts a client enquiry, analyzes it using an AI model, classifies the enquiry type, assigns priority, estimates confidence, recommends a staff action, and generates a professional suggested response.

---

## Project Overview

Strata Management Consultants receives a high volume of enquiries through email and web forms. Staff currently need to manually read each enquiry, understand what the client needs, decide who should handle it, and draft a response.

This prototype demonstrates how AI can support that workflow by automatically analyzing incoming enquiries and producing structured results for staff review.

---

## Features

- Accepts a client enquiry through a simple web interface
- Uses an AI model to analyze the enquiry
- Classifies the enquiry type
- Generates a confidence score
- Assigns priority level
- Summarizes the client’s request
- Recommends the next staff action
- Drafts a professional suggested response
- Flags whether human review is required
- Handles vague, short, or unclear input
- Uses a LangGraph workflow for request processing
- Uses FastAPI as the backend API
- Uses a polished Next.js frontend dashboard

---

## Enquiry Classifications

The system can classify enquiries into the following categories:

| Classification | Description |
|---|---|
| `new_client` | Someone asking about services, pricing, proposals, onboarding, or becoming a client |
| `support_request` | An existing client asking for help, updates, documents, maintenance, levies, repairs, or account support |
| `complaint` | A frustrated or dissatisfied client reporting delays, poor communication, unresolved issues, or negative service experience |
| `general_question` | A simple informational question that does not clearly require escalation |
| `urgent_issue` | A time-sensitive, safety-related, legal, financial, property-damage, or same-day issue |
| `unclear` | A vague, incomplete, nonsensical, spam-like, or unrelated enquiry |

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- FastAPI
- LangGraph
- Pydantic
- Gemini API
- Python Dotenv

---

## System Architecture

```txt
Client Enquiry
     ↓
Next.js Frontend
     ↓
FastAPI API Endpoint
     ↓
LangGraph Workflow
     ↓
AI Model Analysis
     ↓
Structured JSON Response
     ↓
Frontend Dashboard Result