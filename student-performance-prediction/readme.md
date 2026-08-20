Student Performance Prediction
Project Overview

Student Performance Prediction is a machine learning project that analyzes student academic, demographic, and social information to predict the student's final grade (G3).

The project includes data preprocessing, exploratory data analysis (EDA), visualization, feature encoding, machine learning model training, model evaluation, and final grade prediction.

Objectives
Analyze student performance data.
Handle and inspect missing values.
Check duplicate records.
Explore relationships between student features and final grades.
Convert categorical data into numerical features.
Train machine learning models.
Compare model performance.
Select the best-performing model.
Predict the final student grade.
Dataset

The project uses the Student Performance Dataset.

Main dataset:

data/student-mat.csv

The dataset contains information such as:

School
Gender
Age
Family information
Study time
Previous failures
Absences
First-period grade (G1)
Second-period grade (G2)
Final grade (G3)

The target variable is:

G3

G3 represents the student's final grade.

Project Structure
student-performance-prediction/
│
├── data/
│   └── student-mat.csv
│
├── models/
│   └── best_student_grade_model.pkl
│
├── notebooks/
│   └── student_analysis.ipynb
│
├── src/
│   ├── eda.py
│   ├── preprocess.py
│   └── predict.py
│
├── visualizations/
│   ├── grade_distribution.png
│   ├── correlation_heatmap.png
│   ├── boxplot_features.png
│   └── actual_vs_predicted.png
│
├── .gitignore
├── README.md
└── requirements.txt
Technologies Used
Python
Pandas
NumPy
Matplotlib
Seaborn
Scikit-learn
Joblib
Jupyter Notebook
Git and GitHub
Project Workflow
Student Dataset
      ↓
Data Inspection
      ↓
Missing Value Check
      ↓
Duplicate Check
      ↓
Exploratory Data Analysis
      ↓
Data Encoding
      ↓
Train/Test Split
      ↓
Linear Regression
      ↓
Random Forest
      ↓
Model Evaluation
      ↓
Best Model Selection
      ↓
Final Grade Prediction
Data Preprocessing

The dataset was checked for:

Missing values
Duplicate rows
Numerical features
Categorical features

Categorical features were converted into numerical features using one-hot encoding.

The target variable was separated from the input features:

X = df.drop("G3", axis=1)
y = df["G3"]

The dataset was then divided into:

80% training data
20% testing data
Machine Learning Models

Two regression models were trained:

1. Linear Regression

Linear Regression was used as the first baseline model.

2. Random Forest Regressor

Random Forest was trained using multiple decision trees and was compared with Linear Regression.

The models were evaluated using:

MAE — Mean Absolute Error
MSE — Mean Squared Error
RMSE — Root Mean Squared Error
R² — R-squared

For MAE, MSE, and RMSE, lower values are better.

For R², a higher value is better.

The model with the better performance was saved as:

models/best_student_grade_model.pkl
Visualizations

The project contains the following visualizations:

Grade Distribution

Shows the distribution of students' final grades.

Correlation Heatmap

Shows relationships between numerical features and helps identify features related to the final grade.

Boxplot

Helps identify the distribution and potential outliers in selected numerical features.

Actual vs Predicted

Compares the actual final grades with the grades predicted by the machine learning model.

How to Run the Project
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd student-performance-prediction
2. Create a virtual environment

Windows:

python -m venv venv
3. Activate the virtual environment

PowerShell:

venv\Scripts\Activate.ps1

If using Command Prompt:

venv\Scripts\activate
4. Install dependencies
pip install -r requirements.txt
5. Open the notebook
jupyter notebook

Then open:

notebooks/student_analysis.ipynb
6. Run the prediction script

From the project root:

python src/predict.py

The program will display a predicted final grade.

Example Output
Predicted Final Grade: 14.XX

The exact prediction depends on the trained model and student input.

Model File

The trained model is stored as:

models/best_student_grade_model.pkl

The model can be loaded using Joblib:

import joblib

model = joblib.load("models/best_student_grade_model.pkl")
Future Improvements

Possible improvements include:

Hyperparameter tuning
Additional machine learning models
Cross-validation
Better feature engineering
A web interface for entering student information
Deployment using Flask or FastAPI
Student performance classification such as Pass/Fail
Future-grade prediction dashboard

Conclusion

This project demonstrates an end-to-end machine learning workflow for student performance prediction. It covers data inspection, preprocessing, exploratory analysis, visualization, model training, evaluation, model selection, and prediction.

The final trained model can be used to estimate a student's final grade based on available student information.