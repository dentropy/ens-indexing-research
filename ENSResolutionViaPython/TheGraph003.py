import requests

url = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
query_template_str = """
{
  domains(where: {name: "%s"} ) {
    id
    name
    labelName
    labelhash
  }
}
"""
print( query_template_str % "asrtrax.eth" + "\n")

x = requests.post(url, json = {"query" : query_template_str % "asrtrax.eth"})
print(x.text)