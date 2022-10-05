import csv
import json
from glob import glob

json_files = sorted(glob("./scrape_data/out/*"))


with open('RawENSNames.csv', 'w', newline='') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=' ',
                            quotechar=',', quoting=csv.QUOTE_MINIMAL)
    for json_file in json_files:
        table_rows = json.load(open(json_file))
        for row in table_rows:
            spamwriter.writerow(row[0:])
