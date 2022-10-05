import requests

url = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
myobj = {'query': """
{
  domains(first: 5) {
    id
    name
    labelName
    labelhash
  }
  transfers(first: 5) {
    id
    domain {
      id
    }
    blockNumber
    transactionID
  }
}
"""}

x = requests.post(url, json = myobj)

print(x.text)