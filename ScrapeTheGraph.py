import requests
import sqlite3
import json
import pprint


con = sqlite3.connect("tutorial.db")
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

try:
    create_table = """
        CREATE TABLE ens_metadata_errors(
            ens_name
            )
    """
    cur.execute(create_table)
except Exception as e:
    s = str(e)

def log_error(ens_name):
    sql_command = "INSERT INTO ens_metadata_errors(ens_name) VALUES ('%s')" % (ens_name)
    print(sql_command)
    cur.execute(sql_command)
    con.commit()
def get_next_ens_name():
    res = cur.execute("""
    SELECT DISTINCT name
    FROM   ENS_NAMES
    WHERE  name NOT IN (SELECT DISTINCT ens_name FROM ens_metadata)
    AND    name NOT IN (SELECT DISTINCT ens_name FROM ens_metadata_errors)
    LIMIT 1;
    """)
    result = res.fetchall()
    if len(result) <= 1:
        return result[0][0]
    else:
        return False

def get_ens_name_metadata(ens_name):
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

ens_name = get_next_ens_name()
while get_next_ens_name != False:

    try:
        get_ens_name_metadata(ens_name)
    except Exception as e:
        s = str(e)
        print(s)
        log_error(ens_name)
    ens_name = get_next_ens_name()