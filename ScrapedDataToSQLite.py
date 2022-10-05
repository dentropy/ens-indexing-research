import sqlite3
import json
from glob import glob

json_files = sorted(glob("./scrape_data/out/*"))

con = sqlite3.connect("tutorial.db")
cur = con.cursor()

try:
    create_table = """
        CREATE TABLE ENS_NAMES(
            registered_time, 
            length,
            name, 
            unit_price, 
            duration, 
            registration_cost_USD,
            annual_cost)
    """
    cur.execute(create_table)
except Exception as e:
    s = str(e)

insert_template = """
    INSERT INTO ENS_NAMES VALUES
        ('%s', %s, '%s', %s, '%s', %s, %s)
"""

# test_data = ["2022-09-24 04:11", "11", "union-omaha.eth", "5", "3 years 11 mons 29 days 23:16:48", "20", "5"]
# print(insert_template % tuple(test_data))
# cur.execute(insert_template % tuple(test_data))
# con.commit()

for json_file in json_files:
    table_rows = json.load(open(json_file))
    for row in table_rows:
        try:
            cur.execute(insert_template % tuple(row))
            con.commit()
        except Exception as e:
            s = str(e)
            print(s)