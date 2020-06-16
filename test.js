const Web3 = require("web3");
const fs = require("fs");
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://mainnet-v2.velas.com/rpc")
);

// const privkey =
//   "0x4d04ae7292b89d4136b031a56bbe247a3d3a1e59ec8c30bbe0ecbb64643bb7d0";
// const pass = "atata"

// const keystore = web3.eth.accounts.encrypt(privkey, pass);

// fs.writeFileSync('./keystore.json', JSON.stringify(keystore))

// console.log(web3.eth.getBlock().);

// web3.eth
//   .getTransaction(
//     "0xa72d690b98aeaa03dcf090e4c31ae041b3a2d8037f09bd3c473c04bcc38dff7c"
//   )
//   .then(console.log);
