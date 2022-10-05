# ens-indexing

If you want to look for interesting records you can just check out [ENS Subgraph](https://thegraph.com/hosted-service/subgraph/ensdomains/ens)

``` javascript

query {
  domains(where: {
    resolver_: {
      texts_not: null
    }
  }) {
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
```

## Order To Run Scripts

``` bash
npm install

```

