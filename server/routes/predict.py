from flask import Blueprint
from flask import request
from flask import jsonify

from utils import predict_disease

predict_bp = Blueprint(
    "predict_bp",
    __name__
)

@predict_bp.route(
    "/predict",
    methods=["POST"]
)

def predict():

    data = request.get_json()

    symptoms = data.get(
        "symptoms",
        []
    )

    result = predict_disease(
        symptoms
    )

    return jsonify(result)