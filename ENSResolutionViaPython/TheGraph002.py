import requests

def namehash(name):
  if name == '':
    return '\0' * 32
  else:
    label, _, remainder = name.partition('.')
    return sha3(namehash(remainder) + sha3(label))
  
url = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
myobj = {'query': """
{
  domain(id: "0x0000044a32f0964f4bf8fb4d017e230ad33595c0e149b6b2d0c34b733dcf906a") {
    id
    name
    labelName
    labelhash
  }
}
"""}

x = requests.post(url, json = myobj)

print(x.text)