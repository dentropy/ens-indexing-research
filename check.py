import json
from glob import glob

file_list = glob("./results/*")
total_ens_names = 0
texts_ens_names = []
for file_name in file_list:
    file_json = json.load(open(file_name))
    print("File {} has {} elements".format(file_name, len(file_json)))
    total_ens_names += len(file_json)
    for ens_name in file_json:
        if ens_name["resolver"] != None:
            if "texts" in ens_name["resolver"].keys():
                if ens_name["resolver"]["texts"] != None:
                    texts_ens_names.append(ens_name)
print("\ntotal_ens_names = {}".format(total_ens_names))
json.dump(texts_ens_names, open('data.json', 'w'))
print("\nnum ens names with text records = {}".format(len(texts_ens_names)))
