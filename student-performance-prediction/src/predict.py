import pandas as pd
import joblib

# Load the trained model
model = joblib.load("models/best_student_grade_model.pkl")

# Load the original dataset to get the training columns
df = pd.read_csv("data/student-mat.csv", sep=";")

# Remove target column
X = df.drop("G3", axis=1)

# Apply the same encoding used during training
X_encoded = pd.get_dummies(X, drop_first=True)


def predict_student_grade(student_data):
    # Convert student data into a DataFrame
    student_df = pd.DataFrame([student_data])

    # Encode categorical variables
    student_encoded = pd.get_dummies(student_df, drop_first=True)

    # Match the training columns
    student_encoded = student_encoded.reindex(
        columns=X_encoded.columns,
        fill_value=0
    )

    # Predict
    prediction = model.predict(student_encoded)

    return prediction[0]


# Example student
new_student = {
    "school": "GP",
    "sex": "F",
    "age": 17,
    "address": "U",
    "famsize": "GT3",
    "Pstatus": "A",
    "Medu": 3,
    "Fedu": 3,
    "Mjob": "teacher",
    "Fjob": "other",
    "reason": "course",
    "guardian": "mother",
    "traveltime": 1,
    "studytime": 3,
    "failures": 0,
    "schoolsup": "no",
    "famsup": "yes",
    "paid": "no",
    "activities": "yes",
    "nursery": "yes",
    "higher": "yes",
    "internet": "yes",
    "romantic": "no",
    "famrel": 4,
    "freetime": 3,
    "goout": 3,
    "Dalc": 1,
    "Walc": 1,
    "health": 5,
    "absences": 4,
    "G1": 14,
    "G2": 15
}

predicted_grade = predict_student_grade(new_student)

print("Predicted Final Grade:", round(predicted_grade, 2))