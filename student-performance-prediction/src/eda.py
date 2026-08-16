import pandas as pd

df = pd.read_csv("data/student-mat.csv", sep=";")

print("Dataset shape:")
print(df.shape)

print("\nColumn names:")
print(df.columns.tolist())