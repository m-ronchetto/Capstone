import csv
import json

with open("./inputdata.csv", "r") as infile:
    data = list(csv.reader(infile))
    print(data[:5])

output = {}
headers = data[0]
for line in data[1:]:
    linedict = {}
    i = 1
    for header in headers[1:]:
        if len(line[i]) > 0:
            linedict[header] = line[i]
        i = i+1
    output[line[0]] = linedict

with open("./data/zipdata.json", "w") as outfile:
    json.dump(output, outfile)
