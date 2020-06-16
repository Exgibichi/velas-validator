const { contracts } = require("./constants");
const { web3 } = require("./web3");

const getPoolReward = async (pools) => {
  const info = [];
  for (const pool of pools) {
    const epochs = await contracts["BlockRewardAuRa"].methods
      .epochsToClaimRewardFrom(pool, pool)
      .call();
    const epochsForCheck = epochs.slice(-10);
    const rewards = [];
    for (const epoch of epochsForCheck) {
      const reward = await contracts["StakingAuRa"].methods
        .getRewardAmount([epoch], pool, pool)
        .call();
      rewards.push(web3.utils.fromWei(reward));
    }
    info.push({
      pool,
      rewards,
    });
  }
  return info;
};

const rewardInfo = async () => {
    // const epochs = await contracts["BlockRewardAuRa"]
      console.log(await contracts["BlockRewardAuRa"].methods.NATIVE_COIN_INFLATION_RATE().call());
//   const pools = await contracts["StakingAuRa"].methods.getPools().call();
//   const info = await getPoolReward(pools);
//   console.log(info);

};

rewardInfo();

module.exports = { rewardInfo };
