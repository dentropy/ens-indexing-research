import requests

url = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
query_template_str = """
{
  domains(where: {name: "%s"} ) {
    id
    name
    labelName
    labelhash
    parent
    subdomains
    subdomainCount
    resolvedAddress
    owner
    resolver
    ttl
    isMigrated
    createdAt
  }
}
"""
print( query_template_str % "stateofus.eth" + "\n")

x = requests.post(url, json = {"query" : query_template_str % "stateofus.eth"})
print(x.text)