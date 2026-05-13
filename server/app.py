from flask import Flask

from flask_cors import CORS

from routes.predict import predict_bp

from routes.chat import chat_bp

app = Flask(__name__)

# ENABLE CORS

CORS(app)

# ROUTES

app.register_blueprint(
    predict_bp
)

app.register_blueprint(
    chat_bp
)

@app.route("/")

def home():

    return {

        "message":
        "MediPredictAI Backend Running"
    }

if __name__ == "__main__":

    app.run(
        debug=True
    )