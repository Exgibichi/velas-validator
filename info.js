const { candidate } = require("./config");
const { contracts } = require("./constants");
const { web3 } = require("./web3");

const info = async () => {
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
  console.log("Pools:", poolsWithBalance);
  console.log("Inactive pools:", ipoolsWithBalance);
  console.log(
    "Pools to remove:",
    await contracts["StakingAuRa"].methods.getPoolsToBeRemoved().call()
  );
  console.log("Validators:", valsWithBalance);
  console.log(
    "Pending:",
    await contracts["ValidatorSetAuRa"].methods.getPendingValidators().call()
  );
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

  console.log(
    "Stake:",
    await contracts["StakingAuRa"].methods
      .stakeAmount(candidate.staking, candidate.staking)
      .call()
  );
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
  const epochs = await contracts["BlockRewardAuRa"].methods
    .epochsToClaimRewardFrom(candidate.staking, candidate.staking)
    .call();
  console.log("Avail claim epochs:", epochs);
  const reward = await contracts["StakingAuRa"].methods
    .getRewardAmount(epochs, candidate.staking, candidate.staking)
    .call();
  console.log("Avail reward:", web3.utils.fromWei(reward));
};

module.exports = { info };
