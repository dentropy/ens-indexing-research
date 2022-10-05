import requests

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
print( query_template_str % "ywnbaw.eth" + "\n")

x = requests.post(url, json = {"query" : query_template_str % "ywnbaw.eth"})
print(x.text)