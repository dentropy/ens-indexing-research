const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/02f9493940cc44c295dfd149493e1cea");

async function pleaseRun(){
    // See below (Resolver) for examples of using this object
    const resolver = await provider.getResolver("torprojecttor.eth"); //ricmoo.eth

    try {
        let contentHash = await resolver.getContentHash();
        console.log(contentHash)
    } catch {
        console.log("contentHash error")
    }

    try {
        let contentHash = await resolver.getText("onion");
        console.log(contentHash)
    } catch {
        console.log("onion error")
    }

    // 'ipfs://QmdTPkMMBWQvL8t7yXogo7jq5pAcWg8J7RkLrDsWZHT82y'

    // let email = await resolver.getText("email");
    // console.log(email)
    // 'me@ricmoo.com'
    
    try {
        let twitter = await resolver.getText("email");
        console.log(twitter)
    } catch {
        console.log("email error")
    }

    try {
        let url = await resolver.getText("url");
        console.log(url)
    } catch {
        console.log("url error")
    }
    // 'https://www.ricmoo.com/'
    
    try {
        let twitter = await resolver.getText("com.twitter");
        console.log(twitter)
    } catch {
        console.log("Twitter error")
    }
    // '@ricmoo'
}

pleaseRun()
