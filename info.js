#!/usr/bin/env node

const { candidate } = require("./config");
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
  console.log("****************** Staker INFO: *******************");
  console.log("Is pool active: ",
    await contracts[StakingAuRa].methods.isPoolActive(candidate.staking).call());
  console.log("Staker pools length: ",
      await contracts[StakingAuRa].methods.getStakerPoolsLength(candidate.staking)
          .call());
  console.log("Pool delegators: ",
      await contracts[StakingAuRa].methods.poolDelegators(candidate.staking).call());
  console.log(("Inactive pool delegators: ",
  await contracts[StakingAuRa].methods.poolDelegatorsInactive(candidate.staking).call()));
  console.log(
    "Stake:",
    await contracts["StakingAuRa"].methods
      .stakeAmount(candidate.staking, candidate.staking)
      .call()
  );
  console.log("Stake amount by current epoch: ",
  await contracts[StakingAuRa].methods.stakeAmountByCurrentEpoch(candidate.staking, candidate.staking).call());
  console.log(
    "Withdrawable:",
    await contracts["StakingAuRa"].methods
      .maxWithdrawAllowed(candidate.staking, candidate.staking)
      .call()
  );
  console.log(
    "Order withdrawable:",
    await contracts["StakingAuRa"].methods
      .maxWithdrawOrderAllowed(candidate.staking, candidate.staking)
      .call()
  );
  console.log(
    "Staking balance:",
    web3.utils.fromWei(await web3.eth.getBalance(candidate.staking))
  );
  console.log(
    "Signer balance:",
    web3.utils.fromWei(await web3.eth.getBalance(candidate.mining))
  );
  console.log("Banned: ", await contracts[ValidatorSetAuRa].methods.isValidatorBanned(candidate.mining).call());
  console.log("Validator or pending: ", await contracts[ValidatorSetAuRa].methods.isValidatorOrPending(candidate.mining).call());
  console.log("Can report malicious: ",
      await contracts[ValidatorSetAuRa].methods.isReportValidatorValid(candidate.mining).call());
  const epochs = await contracts["BlockRewardAuRa"].methods
    .epochsToClaimRewardFrom(candidate.staking, candidate.staking)
    .call();
  console.log("Avail claim epochs:", epochs);
  const reward = await contracts["StakingAuRa"].methods
    .getRewardAmount(epochs, candidate.staking, candidate.staking)
    .call();
  console.log("Avail reward:", web3.utils.fromWei(reward));
  console.log("Reward coefficient: ",
      await contracts[BlockRewardAuRa].methods.validatorRewardPercent(candidate.staking).call());
  console.log("Epochs pool got reward for: ",
      await contracts[BlockRewardAuRa].methods.epochsPoolGotRewardFor(candidate.mining).call());
  console.log("Delegators are currently banned: ",
      await contracts[ValidatorSetAuRa].methods.areDelegatorsBanned(candidate.mining).call());

};

info(candidate, contracts);

module.exports = { info };
