import json
import os
from google import genai
from app.models import EnquiryAnalysis


client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def analyze_enquiry_with_gemini(enquiry: str) -> EnquiryAnalysis:
    prompt = f"""
You are an AI assistant helping Strata Management Consultants process incoming client enquiries.

Your job is to analyse the enquiry, classify it, assess urgency, recommend the next staff action, and draft a professional response that a staff member can review before sending.

Return ONLY valid JSON. Do not include markdown, explanations, comments, or text outside the JSON.

Use this exact JSON structure:

{{
  "classification": "new_client | support_request | complaint | general_question | urgent_issue | unclear",
  "confidence": 0,
  "summary": "",
  "priority": "low | medium | high",
  "recommended_action": "",
  "suggested_response": "",
  "needs_human_review": true,
  "reasoning": ""
}}

Classification guidelines:
- "new_client": The sender is asking about services, pricing, proposals, onboarding, consultations, or becoming a client.
- "support_request": The sender appears to be an existing client asking for help, updates, documents, maintenance, levies, meetings, access, repairs, or account-related assistance.
- "complaint": The sender expresses frustration, dissatisfaction, anger, repeated follow-ups, poor service experience, delays, or unresolved issues.
- "general_question": The sender asks a simple informational question that does not clearly require support, escalation, or onboarding.
- "urgent_issue": The sender reports something time-sensitive, safety-related, legally sensitive, financially serious, property-damage related, or requiring same-day attention.
- "unclear": The enquiry is too vague, incomplete, nonsensical, spam-like, unrelated, or missing enough context to take meaningful action.

Priority guidelines:
- "high": Use for urgent issues, serious complaints, safety risks, legal/financial concerns, repeated unresolved issues, or same-day requests.
- "medium": Use for normal client support requests, new client enquiries, document requests, meeting requests, or enquiries needing staff follow-up.
- "low": Use for simple general questions, low-risk informational requests, or enquiries that do not require immediate action.

Confidence scoring:
- 90-100: The enquiry is clear and strongly matches one classification.
- 75-89: The enquiry is mostly clear but may overlap with another category.
- 60-74: The enquiry has limited details or some ambiguity.
- Below 60: The enquiry is vague, incomplete, unclear, or difficult to classify.

Human review rules:
Set "needs_human_review" to true if:
- classification is "complaint", "urgent_issue", or "unclear"
- priority is "high"
- confidence is below 70
- the enquiry involves legal, financial, safety, property damage, or sensitive client concerns
- the suggested response should be checked by staff before being sent

Set "needs_human_review" to false only when:
- the enquiry is clear
- the issue is low-risk
- the confidence is 70 or higher
- the suggested response is safe for staff to use with minimal editing

Response writing rules:
- Write the suggested response as if it will be sent by Strata Management Consultants.
- Keep the tone professional, polite, calm, and helpful.
- Acknowledge the client's concern or request.
- Do not overpromise outcomes or exact timeframes unless the enquiry specifically requires urgent acknowledgement.
- Do not invent facts, names, dates, prices, policies, or staff members.
- If information is missing, ask the client for the specific missing details.
- For complaints, apologise for the inconvenience without admitting legal fault.
- For urgent issues, advise that the matter will be prioritised and reviewed by the relevant team.
- For new client enquiries, thank them for their interest and recommend a consultation or follow-up.
- Keep the response concise but complete.

Recommended action rules:
- Write a practical action for staff, not for the client.
- Mention the appropriate next step, such as:
  - route to strata manager
  - assign to support team
  - request more details
  - escalate for urgent review
  - prepare proposal or consultation follow-up
  - create a ticket/task
- If human review is required, mention why.

Summary rules:
- Summarise the enquiry in 1-2 sentences.
- Focus on what the client needs and any urgency or emotion.

Reasoning rules:
- Briefly explain why the classification, priority, and human review decision were chosen.
- Keep reasoning short and business-focused.

Client enquiry:
\"\"\"{enquiry}\"\"\"
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config={
            "response_mime_type": "application/json",
        },
    )

    if not response.text:
        raise ValueError("The AI returned an empty response.")

    raw_data = json.loads(response.text)

    return EnquiryAnalysis(**raw_data)