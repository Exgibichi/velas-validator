#!/usr/bin/env node

const { contracts } = require("./constants");

const Web3 = require("web3");

const StakingAuRa = "StakingAuRa"
const BlockRewardAuRa = "BlockRewardAuRa"
const ValidatorSetAuRa = "ValidatorSetAuRa"

const [,, ...args] = process.argv

const info = async () => {
 web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet-v2.velas.com/rpc'));
 for (const arg of args) {
 if (arg === 'testnet' ) {
  web3 = new Web3(new Web3.providers.HttpProvider('https://testnet-v2.velas.com/rpc'));
  }
 }

console.log("info for: ", web3.currentProvider.host);
  console.log(
    "Epoch end block:",
    await contracts["StakingAuRa"].methods.stakingEpochEndBlock().call()
  );
  const pools = await contracts["StakingAuRa"].methods.getPools().call();
  const poolsWithBalance = {};
  for (const pool of pools) {
    poolsWithBalance[pool] = web3.utils.fromWei(
      await web3.eth.getBalance(pool)
    );
  }
  const ipools = await contracts["StakingAuRa"].methods
    .getPoolsInactive()
    .call();
  const ipoolsWithBalance = {};
  for (const pool of ipools) {
    ipoolsWithBalance[pool] = web3.utils.fromWei(
      await web3.eth.getBalance(pool)
    );
  }
  const vals = await contracts["ValidatorSetAuRa"].methods
    .getValidators()
    .call();
  const valsWithBalance = {};
  for (const val of vals) {
    valsWithBalance[val] = web3.utils.fromWei(await web3.eth.getBalance(val));
  }
  // console.log("Block gas limit: ",
  //     await contracts["TxPermission"].methods.blockGasLimit().call());
  console.log("Pools:", poolsWithBalance);
  console.log("Inactive pools:", ipoolsWithBalance);
  console.log(
    "Pools to remove:",
    await contracts["StakingAuRa"].methods.getPoolsToBeRemoved().call()
  );
  console.log("Pools to be elected: ",
    await contracts["StakingAuRa"].methods.getPoolsToBeElected().call()
  );
  console.log("Pools to be removed: ",
      await contracts[StakingAuRa].methods.getPoolsToBeRemoved().call()
  );
  console.log("Validators:", valsWithBalance);
  console.log(
    "Pending:",
    await contracts["ValidatorSetAuRa"].methods.getPendingValidators().call()
  );
  console.log("Previous Validators: ",
      await contracts[ValidatorSetAuRa].methods.getPreviousValidators().call());
  console.log(
    "Emit callable:",
    await contracts["ValidatorSetAuRa"].methods
      .emitInitiateChangeCallable()
      .call()
  );

  const minCandidateStake = await contracts["StakingAuRa"].methods
    .candidateMinStake()
    .call();
  console.log("min stake =", web3.utils.fromWei(minCandidateStake));
  const stakeAllowed = await contracts["StakingAuRa"].methods
    .areStakeAndWithdrawAllowed()
    .call();
  console.log("stake allowed:", stakeAllowed);
};

info(contracts);

module.exports = { info };
