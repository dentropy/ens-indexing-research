import requests
import sqlite3
import json
import pprint


con = sqlite3.connect("my.db")
cur = con.cursor()

try:
    create_table = """
        CREATE TABLE ens_metadata(
            ens_name, 
            id,
            labelName, 
            labelhash, 
            parent_id, 
            subdomainCount,
            resolvedAddress,
            owner,
            resolver,
            texts,
            coinTypes
            )
    """
    cur.execute(create_table)
except Exception as e:
    s = str(e)


url = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
query_template_str = """
{
  domains(where: {name: "%s"} ) {
    id
    name
    labelName
    labelhash
    parent {
      id
    }
    subdomains {
      id
    }
    subdomainCount
    resolvedAddress {
      id
    }
    owner {
      id
    }
    resolver {
      addr {
        id
      }
      id
      texts
      coinTypes
    }
    ttl
    isMigrated
    createdAt
  }
}

"""

ens_name = "ywnbaw.eth"
print( query_template_str % ens_name + "\n")

x = requests.post(url, json = {"query" : query_template_str % ens_name })

# pprint.pprint(json.load(x.text).data)

# ens_name, 
# id,
# labelName, 
# labelhash, 
# parent_id, 
# subdomainCount,
# resolvedAddress,
# owner, # NOT USED
# resolver,
# texts,
# coinTypes
response = x.json()["data"]["domains"][0]

print("\n")
print(response)
print(response["labelhash"])
input_data = [
  ens_name,
  response["id"],
  response["labelName"],
  response["labelhash"],
  response["parent"]["id"],
  response["subdomainCount"],
  response["resolver"]["addr"]["id"],
  json.dumps(response["resolver"]["texts"]),
  json.dumps(response["resolver"]["coinTypes"])
]
print("\n")
print(input_data)
print("\n")


insert_template = """
    INSERT INTO ens_metadata(
      ens_name, 
      id, 
      labelName, 
      labelhash,
      parent_id, 
      subdomainCount, 
      resolver, 
      texts, 
      coinTypes
    ) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
"""

print(insert_template % tuple(input_data))

cur.execute(insert_template % tuple(input_data))
con.commit()