# AI Client Enquiry Processor

A full-stack AI-powered prototype built for **Strata Management Consultants** to help staff process incoming client enquiries faster, more consistently, and with less manual effort.

The system accepts a client enquiry, analyzes it using an AI model, classifies the enquiry type, assigns a priority level, estimates confidence, recommends the next staff action, and generates a professional suggested response for staff review.

---

## Project Purpose

Strata Management Consultants handles a high volume of enquiries from emails and web forms. Staff currently read each enquiry manually, determine the type of request, decide the next action, and draft a response.

This prototype demonstrates how AI can support that workflow by automatically producing structured enquiry analysis that staff can review and act on.

The goal is not to replace staff, but to reduce repetitive manual work and help staff respond faster.

---

## Live Demo

### Frontend

```txt
https://enquiry-project-one.vercel.app/
```

### Backend

If deployed using Vercel Services, the FastAPI backend may be available at:

```txt
https://enquiry-project-one.vercel.app/_/backend
```

### FastAPI Docs

```txt
https://enquiry-project-one.vercel.app/_/backend/docs
```

### Analyze Endpoint

```txt
POST https://enquiry-project-one.vercel.app/_/backend/analyze
```

---

## Features

- Accepts client enquiries through a web interface
- Uses an AI model to analyze enquiry text
- Classifies enquiry type
- Generates a confidence score
- Assigns priority level
- Summarizes the enquiry
- Recommends the next staff action
- Drafts a professional suggested response
- Flags whether human review is required
- Handles vague, short, spam-like, or unclear input
- Uses LangGraph for workflow-based request processing
- Uses FastAPI for the backend API
- Uses Next.js for the frontend dashboard
- Uses Sonner for toast notifications and user feedback
- Includes loading states and visual result cards
- Includes copy-to-clipboard functionality for suggested responses

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Sonner

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
Gemini AI Analysis
     ↓
Structured JSON Response
     ↓
Frontend Dashboard Result
```

---

## LangGraph Workflow

The backend uses LangGraph to manage the enquiry-processing flow.

```txt
validate_input
     ↓
analyze_enquiry
     ↓
return_result
```

### 1. `validate_input`

Checks whether the enquiry is valid before sending it to the AI model.

Validation includes:

- Empty input
- Very short input
- Very long input
- Mostly numbers or symbols
- Spam-like content
- Unreadable or unclear text

### 2. `analyze_enquiry`

Sends the validated enquiry to the AI model and requests a structured JSON result containing:

- Classification
- Confidence
- Summary
- Priority
- Recommended action
- Suggested response
- Human review flag
- Reasoning

### 3. `return_result`

Returns the structured result to the frontend so it can be displayed in a dashboard format.

---

## Enquiry Classifications

| Classification | Description |
|---|---|
| `new_client` | The sender asks about services, pricing, proposals, onboarding, consultations, or becoming a client |
| `support_request` | An existing client asks for help, updates, documents, levies, repairs, maintenance, meetings, or account support |
| `complaint` | The sender expresses frustration, dissatisfaction, anger, repeated follow-ups, delays, or poor communication |
| `general_question` | The sender asks a simple informational question that does not clearly require escalation |
| `urgent_issue` | The sender reports a time-sensitive, safety-related, legal, financial, property-damage, or same-day issue |
| `unclear` | The enquiry is vague, incomplete, nonsensical, spam-like, unrelated, or missing enough context |

---

## Example Input

```txt
Hi, I have been waiting for an update about our levy notice and nobody has replied. This is very frustrating. Can someone please get back to me today?
```

---

## Example Output

```json
{
  "success": true,
  "data": {
    "classification": "complaint",
    "confidence": 92,
    "summary": "The client is frustrated because they have not received an update about their levy notice and is requesting a same-day response.",
    "priority": "high",
    "recommended_action": "Route this enquiry to the relevant strata manager or support team for same-day review because the client is frustrated and has requested an urgent update.",
    "suggested_response": "Hi, thank you for reaching out. I’m sorry for the inconvenience and understand your frustration regarding the lack of update about your levy notice. We will prioritise this with the relevant team and ask someone to review your enquiry as soon as possible.",
    "needs_human_review": true,
    "reasoning": "The enquiry expresses frustration, mentions a lack of response, and requests same-day follow-up, so it is classified as a high-priority complaint requiring human review."
  },
  "error": null
}
```

---

## Project Structure

```txt
enquiry/
├── README.md
├── .gitignore
├── backend/
│   ├── .env.example
│   ├── pyproject.toml
│   ├── requirements.txt
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       ├── graph.py
│       ├── llm.py
│       └── models.py
└── frontend/
    ├── app/
    ├── components/
    ├── lib/
    ├── public/
    ├── package.json
    └── next.config.ts
```

---

## Backend Setup

### 1. Go to the backend folder

```bash
cd backend
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

### 3. Activate the virtual environment

For Windows:

```bash
.venv\Scripts\activate
```

For macOS or Linux:

```bash
source .venv/bin/activate
```

### 4. Install backend dependencies

```bash
pip install fastapi uvicorn langgraph google-genai python-dotenv pydantic
```

Or install from `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 5. Create a `.env` file

Create this file inside the `backend` folder:

```txt
backend/.env
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Do not commit this file to GitHub.

Use this file for GitHub instead:

```txt
backend/.env.example
```

Example:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 6. Configure FastAPI entrypoint

Inside `backend/pyproject.toml`:

```toml
[tool.fastapi]
entrypoint = "app.main:app"
```

### 7. Run the backend

Using FastAPI CLI:

```bash
fastapi dev
```

Or using Uvicorn:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend URL:

```txt
http://127.0.0.1:8000
```

FastAPI Docs:

```txt
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

### 1. Go to the frontend folder

```bash
cd frontend
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install Sonner

```bash
npm install sonner
```

### 4. Run the frontend

```bash
npm run dev
```

Frontend URL:

```txt
http://localhost:3000
```

---

## Sonner Toast Notifications

Sonner is used to show clean toast notifications for user feedback.

Examples:

- Success when analysis completes
- Error when the backend fails
- Warning when input is empty
- Success when suggested response is copied

### Add Toaster to your layout

In `frontend/app/layout.tsx`:

```tsx
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
```

### Example usage in a component

```tsx
import { toast } from "sonner";

toast.success("Enquiry analysed successfully.");
toast.error("Failed to analyse enquiry.");
toast.warning("Please enter a client enquiry.");
toast.success("Suggested response copied.");
```

---

## API Endpoint

### Analyze Enquiry

```txt
POST /analyze
```

Request body:

```json
{
  "enquiry": "Client enquiry text here"
}
```

Successful response:

```json
{
  "success": true,
  "data": {
    "classification": "support_request",
    "confidence": 88,
    "summary": "Short summary of the enquiry.",
    "priority": "medium",
    "recommended_action": "Recommended staff action.",
    "suggested_response": "Suggested client response.",
    "needs_human_review": false,
    "reasoning": "Brief explanation of the decision."
  },
  "error": null
}
```

Error response:

```json
{
  "success": false,
  "data": null,
  "error": "Please enter a clearer enquiry with at least 10 characters."
}
```

---

## Frontend API Configuration

For local development, the frontend can call:

```tsx
const res = await fetch("http://localhost:8000/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    enquiry: enquiry.trim(),
  }),
});
```

For Vercel Services deployment, use:

```tsx
const res = await fetch("/_/backend/analyze", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    enquiry: enquiry.trim(),
  }),
});
```

---

## Error Handling

The prototype handles:

| Error Case | Handling |
|---|---|
| Empty enquiry | Shows a validation message |
| Very short enquiry | Asks for a clearer enquiry |
| Very long enquiry | Requests shorter input |
| Mostly numbers or symbols | Rejects unreadable input |
| Spam-like content | Rejects likely spam input |
| Vague enquiry | AI classifies as `unclear` |
| AI model failure | Returns a backend error message |
| Network error | Frontend shows a connection error toast |
| Missing API key | Backend returns a clear configuration error |

---

## Human Review Logic

The system sets `needs_human_review` to `true` when:

- The enquiry is a complaint
- The enquiry is urgent
- The enquiry is unclear
- The priority is high
- The confidence score is below 70
- The enquiry involves legal, financial, safety, property damage, insurance, tribunal, by-law, or sensitive client concerns

Human review is set to `false` only when the enquiry is clear, low-risk, and safe for staff to use with minimal editing.

---

## Prompt Engineering

The prompt was designed to produce consistent, structured, business-friendly output.

The prompt instructs the AI to:

- Return only valid JSON
- Use a fixed response structure
- Follow clear classification rules
- Apply strata-specific examples
- Assign priority based on urgency and risk
- Estimate confidence
- Decide whether human review is required
- Draft a professional response
- Avoid inventing facts, prices, policies, names, or dates
- Apologise for inconvenience without admitting legal fault
- Ask for missing details when needed

This makes the output easier to display in the frontend and easier to connect to automation tools later.

---

## Automation Potential

This prototype can be extended into a larger business workflow.

Possible future integrations:

- Gmail or Outlook intake
- Website enquiry forms
- CRM systems
- Ticketing systems
- Staff assignment rules
- Slack or Microsoft Teams alerts
- Background task queues
- Human approval workflows
- Enquiry history database
- Response audit logs

Example future workflow:

```txt
Incoming Email or Web Form
     ↓
AI Classification
     ↓
Priority and Human Review Check
     ↓
Create Ticket
     ↓
Notify Staff
     ↓
Draft Suggested Response
     ↓
Human Approval
     ↓
Send Response
```

---

## Design Decisions

### Why FastAPI?

FastAPI was chosen because it is lightweight, fast, and suitable for building API-based AI applications. It works well with Pydantic for validating request and response data.

### Why LangGraph?

LangGraph was chosen because enquiry processing is a workflow. The request can move through separate nodes such as validation, AI analysis, routing, and future automation steps.

### Why Gemini API?

Gemini was used to analyze the enquiry and return structured JSON. The model is suitable for classification, summarization, and response generation.

### Why Sonner?

Sonner was added to improve the frontend user experience. It provides clean toast notifications for success, error, warning, and copy actions.

### Why Structured JSON?

Structured JSON makes the AI response predictable and easier to render in the UI. It also makes the result easier to pass into future systems such as CRMs, ticketing tools, or task queues.

### Why Human Review?

The AI supports staff but does not fully replace human judgement. Complaints, urgent matters, legal concerns, financial issues, and unclear enquiries should still be reviewed by a person before action is taken.

---

## Current Limitations

- No direct email integration yet
- No CRM integration yet
- No database for storing enquiry history
- Suggested responses are not automatically sent
- Staff routing is currently only recommended
- Human review is shown as a flag only
- Confidence scoring is generated by the AI model, not a separate statistical model

---

## Future Improvements

- Add authentication
- Add enquiry history database
- Add email inbox integration
- Add website form integration
- Add ticket creation
- Add staff assignment rules
- Add response approval workflow
- Add CRM integration
- Add audit logs
- Add analytics dashboard
- Add model evaluation using sample enquiries
- Add file or attachment support
- Add email metadata analysis

---

## GitHub Notes

Do not commit sensitive or generated files.

Recommended `.gitignore` entries:

```gitignore
# Backend
backend/.env
backend/.venv/
backend/venv/
backend/__pycache__/
backend/**/__pycache__/

# Frontend
frontend/.env.local
frontend/.env
frontend/node_modules/
frontend/.next/
frontend/out/

# General
.env
.env.*
!.env.example
.DS_Store
Thumbs.db
*.log
```

Commit this instead:

```txt
backend/.env.example
```

Do not commit this:

```txt
backend/.env
frontend/.env.local
```

---

## Submission Summary

This project demonstrates how AI can be integrated into a practical business workflow for Strata Management Consultants.

The prototype uses a Next.js frontend, FastAPI backend, LangGraph workflow orchestration, and Gemini AI analysis to classify enquiries, assign priority, generate confidence scores, recommend staff actions, and draft suggested responses.

The system reduces repetitive manual review work while keeping humans involved for complaints, urgent issues, unclear enquiries, and sensitive matters.
