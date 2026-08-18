import pandas as pd

# Load dataset
df = pd.read_csv("data/student-mat.csv")

# Display basic information
print("Dataset Shape:", df.shape)

print("\nFirst 5 rows:")
print(df.head())

print("\nDataset Information:")
print(df.info())

print("\nMissing Values:")
print(df.isnull().sum())

print("\nDuplicate Rows:")
print(df.duplicated().sum())