import fetch from "node-fetch";
import util from "util";
import fs from 'fs';

async function main(){
    var saving_dir = "./results4"
    if (!fs.existsSync(saving_dir)){
        fs.mkdirSync(saving_dir);
    }
    let last_created_at = 1;
    for (var i = 0; i < 10; i += 1){
        const query = `
        {
            domains(first: 1000, where: {createdAt_gt: "${last_created_at}"}, order: {field: createdAt, direction: ASC}) {
              id
              createdAt
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
        console.log(result)
        // console.log(util.inspect(result, {showHidden: false, depth: null, colors: true}))
        let newest_created_at = result.data.domains[result.data.domains.length - 1]["createdAt"]
        let saving_path = (saving_dir + `/ens-domains-${String(last_created_at).padStart(10, '0')}-${String(newest_created_at).padStart(10, '0')}.json`)
        last_created_at = newest_created_at
        fs.writeFileSync(saving_path, JSON.stringify(result.data.domains));
        console.log("Saved " + saving_path)
    }
}

main()