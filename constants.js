const { web3 } = require("./web3");

const abis = {};
abis["StakingAuRa"] = require("./contracts/StakingAuRa.json").abi;
abis["ValidatorSetAuRa"] = require("./contracts/ValidatorSetAuRa.json").abi;
abis["BlockRewardAuRa"] = require("./contracts/BlockRewardAuRa.json").abi;

const addresses = {};
addresses["StakingAuRa"] = "0x1100000000000000000000000000000000000001";
addresses["ValidatorSetAuRa"] = "0x1000000000000000000000000000000000000001";
addresses["BlockRewardAuRa"] = "0x2000000000000000000000000000000000000001";

const contracts = {};
contracts["StakingAuRa"] = new web3.eth.Contract(
  abis["StakingAuRa"],
  addresses["StakingAuRa"]
);
contracts["ValidatorSetAuRa"] = new web3.eth.Contract(
  abis["ValidatorSetAuRa"],
  addresses["ValidatorSetAuRa"]
);
contracts["BlockRewardAuRa"] = new web3.eth.Contract(
  abis["BlockRewardAuRa"],
  addresses["BlockRewardAuRa"]
);

module.exports = { abis, addresses, contracts };
