import fetch from "node-fetch";
import util from "util";
import fs from 'fs';

async function main(){
    var saving_dir = "./results"
    if (!fs.existsSync(saving_dir)){
        fs.mkdirSync(saving_dir);
    }
    for (var skip = 512*50; skip < 512*100; skip += 512){
        const query = `
        {
            domains(first: 100, skip: ${skip}) {
              id
              name
              labelName
              labelhash,
              resolver {
                id,
                address,
                contentHash,
                texts,
                coinTypes,
                events {
                  id,
                  blockNumber,
                  transactionID,
                  ... on AddrChanged {
                  id
                  }
                  ... on NameChanged {
                    name
                  }
                  ... on AbiChanged {
                    contentType
                  }
                  ... on TextChanged {
                    id,
                    key,
                    value
                  },
                  ... on MulticoinAddrChanged {
                    id,
                    coinType,
                    addr
                  }
                }
                }
              }
          }
        `
        const fetchResult = await fetch('https://api.thegraph.com/subgraphs/name/ensdomains/ens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        })
        const result = await fetchResult.json()
        let saving_path = (saving_dir + `/ens-domains-${String(skip-512).padStart(10, '0')}-${String(skip).padStart(10, '0')}.json`)
        fs.writeFileSync(saving_path, JSON.stringify(result));
        // console.log(util.inspect(result, {showHidden: false, depth: null, colors: true}))
        console.log("Saved " + saving_path)
    }
}

main()