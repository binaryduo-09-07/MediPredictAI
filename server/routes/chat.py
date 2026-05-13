from flask import Blueprint, request, jsonify

import google.generativeai as genai

from dotenv import load_dotenv

import os
import random

load_dotenv()

# -------------------------
# GEMINI CONFIG
# -------------------------

GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY"
)

genai.configure(
    api_key=GEMINI_API_KEY
)

# -------------------------
# BLUEPRINT
# -------------------------

chat_bp = Blueprint(
    "chat_bp",
    __name__
)

# -------------------------
# CHAT ROUTE
# -------------------------

@chat_bp.route(
    "/chat",
    methods=["POST"]
)

def chat():

    data = request.get_json()

    message = data.get(
        "message"
    )

    history = data.get(
        "history",
        []
    )

    # -------------------------
    # BUILD CONVERSATION
    # -------------------------

    conversation = ""

    for msg in history:

        role = (
            "User"
            if msg["type"] == "user"
            else "AI"
        )

        conversation += f"""
{role}: {msg["text"]}
"""

    # -------------------------
    # MAIN PROMPT
    # -------------------------

    prompt = f"""
You are MediPredictAI,
an advanced conversational
AI healthcare assistant.

You are having an ongoing
natural conversation
with a patient.

Previous Conversation:

{conversation}

Current User Message:
{message}

Guidelines:

- Be conversational
- Be empathetic
- Be intelligent
- Remember previous context
- Avoid repetitive replies
- Give healthcare suggestions carefully
- Never provide final diagnosis
- Speak naturally like ChatGPT

Keep responses concise
but helpful.
"""

    try:

        model = genai.GenerativeModel(
            "gemini-2.0-flash"
        )

        response = model.generate_content(
            prompt
        )

        return jsonify({

            "reply": response.text

        })

    except Exception as e:

        print("CHATBOT ERROR:", e)

        fallback_responses = [

            f"""
AI Doctor is currently handling high traffic.

Basic Advice:
• Stay hydrated
• Rest adequately
• Monitor symptoms closely

Your concern:
{message}
""",

            f"""
Healthcare Guidance:

• Maintain proper hydration
• Avoid self-medication
• Track symptom progression

Your message:
{message}
""",

            f"""
Temporary AI Assistance:

• Eat light nutritious meals
• Take adequate sleep
• Seek medical help if symptoms worsen

User Input:
{message}
"""
        ]

        fallback_reply = random.choice(
            fallback_responses
        )

        return jsonify({

            "reply": fallback_reply

        })