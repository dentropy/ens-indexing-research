import fetch from "node-fetch";
import util from "util";

async function main(){
    const query = `
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
    `
    const variables = { id: '1' }
    
    const fetchResult = await fetch('https://api.thegraph.com/subgraphs/name/ensdomains/ens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
    const result = await fetchResult.json()
    // console.log(result)
    console.log(util.inspect(result, {showHidden: false, depth: null, colors: true}))
}

main()