import sqlite3
import pandas as pd


df = pd.read_csv('./RawENSNames.csv')
print(df.to_string()) 