import pandas as pd
import joblib

from sklearn.ensemble import (
    RandomForestClassifier,
    VotingClassifier
)

from sklearn.naive_bayes import GaussianNB

from sklearn.svm import SVC

from sklearn.model_selection import (
    train_test_split
)

from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("dataset.csv")

# Remove empty columns
df = df.dropna(axis=1)

# Features and labels
X = df.drop("prognosis", axis=1)

y = df["prognosis"]

# Split data
X_train, X_test, y_train, y_test = (
    train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )
)

# Models
rf = RandomForestClassifier()

nb = GaussianNB()

svm = SVC(probability=True)

# Voting classifier
voting_model = VotingClassifier(

    estimators=[
        ("rf", rf),
        ("nb", nb),
        ("svm", svm),
    ],

    voting="soft"
)

# Train
voting_model.fit(X_train, y_train)

# Accuracy
predictions = voting_model.predict(X_test)

accuracy = accuracy_score(
    y_test,
    predictions
)

print(
    f"Accuracy: {accuracy * 100:.2f}%"
)

# Save model
joblib.dump(
    voting_model,
    "voting_classifier.pkl"
)

print("Model saved successfully.")