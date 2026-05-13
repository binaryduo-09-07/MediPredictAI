import os
import random
import numpy as np
import joblib

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "model",
    "voting_classifier.pkl"
)

model = joblib.load(
    MODEL_PATH
)

feature_names = model.feature_names_in_

def generate_care_plan(
    disease,
    symptoms
):

    plans = [

        f"""
Possible Condition:
{disease}

Recommendations:
• Stay hydrated
• Monitor symptoms
• Get proper rest
• Avoid stress
• Consult a doctor if symptoms worsen
""",

        f"""
Healthcare Guidance for {disease}

• Eat nutritious meals
• Maintain hydration
• Sleep adequately
• Avoid self-medication
• Seek medical help if condition worsens
""",

        f"""
AI Care Suggestions

Predicted Condition:
{disease}

• Track symptom progression
• Maintain healthy diet
• Drink fluids regularly
• Take sufficient rest
"""
    ]

    return random.choice(plans)

def predict_disease(
    selected_symptoms
):

    input_data = []

    for symptom in feature_names:

        if symptom in selected_symptoms:

            input_data.append(1)

        else:

            input_data.append(0)

    input_array = np.array(
        input_data
    ).reshape(1, -1)

    prediction = model.predict(
        input_array
    )[0]

    probability = max(

        model.predict_proba(
            input_array
        )[0]

    )

    care_plan = generate_care_plan(

        prediction,

        selected_symptoms
    )

    return {

        "disease": prediction,

        "confidence": round(
            probability * 100,
            2
        ),

        "care_plan": care_plan
    }