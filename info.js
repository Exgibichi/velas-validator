const { candidate } = require("./config");
const { contracts } = require("./constants");
const { web3 } = require("./web3");

const getPoolInfo = async (pool) => {
  const stakedTotal = web3.utils.fromWei(
    await contracts["StakingAuRa"].methods.stakeAmountTotal(pool).call()
  );
  const ordered = await contracts["StakingAuRa"].methods
    .orderedWithdrawAmountTotal(pool)
    .call();
  const delegators = await contracts["StakingAuRa"].methods
    .poolDelegators(pool)
    .call();
  const idelegators = await contracts["StakingAuRa"].methods
    .poolDelegatorsInactive(pool)
    .call();
  const balance = web3.utils.fromWei(await web3.eth.getBalance(pool));
  const isBanned = await contracts["ValidatorSetAuRa"].methods
    .banCounter(pool)
    .call();
  const bannedUntil = await contracts["ValidatorSetAuRa"].methods
    .bannedUntil(pool)
    .call();
  const bannedReason = web3.utils.hexToAscii(
    await contracts["ValidatorSetAuRa"].methods.banReason(pool).call()
  );
  return {
    balance,
    isBanned,
    bannedUntil,
    bannedReason,
    delegators,
    idelegators,
    stakedTotal,
    ordered,
  };
};

const info = async () => {
  // const ipools = await contracts["StakingAuRa"].methods
  //   .getPoolsInactive()
  //   .call();
  // const ipoolsWithBalance = {};
  // for (const pool of ipools) {
  //   ipoolsWithBalance[pool] = await getPoolInfo(pool);
  // }
  // console.log({ ipoolsWithBalance });
  // console.log(
  //   "Pools to remove:",
  //   await contracts["StakingAuRa"].methods.getPoolsToBeRemoved().call()
  // );

  //   const pools = await contracts["StakingAuRa"].methods.getPools().call();
  //   const poolsWithBalance = {};
  //   for (const pool of pools) {
  //     poolsWithBalance[pool] = await getPoolInfo(pool);
  //   }
  // console.log({ poolsWithBalance });
  // const { ethToVlx } = require("./address");
  // const vals = await contracts["ValidatorSetAuRa"].methods
  //   .getValidators()
  //   .call();
  // const conv = [];
  // const stakers = [];
  // const valsWithBalance = {};
  // for (const val of vals) {
  //   valsWithBalance[val] = web3.utils.fromWei(await web3.eth.getBalance(val));
  //   const stake = await contracts["ValidatorSetAuRa"].methods
  //     .stakingByMiningAddress(val)
  //     .call();
  //   stakers.push(ethToVlx(stake));
  //   // conv.push(ethToVlx(val));
  // }
  // console.log({ stakers });

  // let block = await web3.eth.getBlock("latest");
  // console.log({block});

    let { number, author, timestamp } = await web3.eth.getBlock("latest");
    console.log({ number });

    let i = 100;
    let hash = "";
    const times = [];
    const authors = { [author]: 1 };
    while (i > 0) {
      number = number - 1;
      const block = await web3.eth.getBlock(number);
      times.push(timestamp - block.timestamp);
      timestamp = block.timestamp;
      if (authors[block.author]) {
        authors[block.author]++;
      } else {
        authors[block.author] = 1;
      }
      hash = block.hash;
      // console.log({ number: block.number, author: block.author, timestamp: block.timestamp });
      i--;
    }
    console.log({ sum: times, authors, hash });
  // console.log({ w: web3.utils.fromWei("7950228212241"), n: web3.utils.fromWei("52118941864653") });

  // console.log("Validators:", valsWithBalance);
  // console.log({ poolsWithBalance });
  // let { number, author, timestamp } = await web3.eth.getBlock("latest");
  // console.log({number});

  console.log(
    "Epoch end block:",
    await contracts["StakingAuRa"].methods.stakingEpochEndBlock().call()
  );
  // return;
  // console.log(
  //   "Epoch end block:",
  //   await contracts["StakingAuRa"].methods.stakingEpochEndBlock().call()
  // );
  // const pools = await contracts["StakingAuRa"].methods.getPools().call();
  // const poolsWithBalance = {};
  // for (const pool of pools) {
  //   poolsWithBalance[pool] = web3.utils.fromWei(
  //     await web3.eth.getBalance(pool)
  //   );
  // }
  // const ipools = await contracts["StakingAuRa"].methods
  //   .getPoolsInactive()
  //   .call();
  // const ipoolsWithBalance = {};
  // for (const pool of ipools) {
  //   ipoolsWithBalance[pool] = {
  //     balance: web3.utils.fromWei(await web3.eth.getBalance(pool)),
  //     isBanned: await contracts["ValidatorSetAuRa"].methods
  //       .banCounter(pool)
  //       .call(),
  //     bannedUntil: await contracts["ValidatorSetAuRa"].methods
  //       .bannedUntil(pool)
  //       .call(),
  //     bannedReason: web3.utils.hexToAscii(
  //       await contracts["ValidatorSetAuRa"].methods
  //         .banReason("0x1ed811Bcfc6982c54411Fd3e114d5313dC09F262")
  //         .call()
  //     ),
  //   };
  // }
  // const vals = await contracts["ValidatorSetAuRa"].methods
  //   .getValidators()
  //   .call();
  // const valsWithBalance = {};
  // for (const val of vals) {
  //   valsWithBalance[val] = web3.utils.fromWei(await web3.eth.getBalance(val));
  // }
  // console.log("Pools:", poolsWithBalance);
  // console.log("Inactive pools:", ipoolsWithBalance);
  // console.log(
  //   "Pools to remove:",
  //   await contracts["StakingAuRa"].methods.getPoolsToBeRemoved().call()
  // );
  // console.log("Validators:", valsWithBalance);
  // console.log(
  //   "Pending:",
  //   await contracts["ValidatorSetAuRa"].methods.getPendingValidators().call()
  // );
  // console.log(
  //   "Emit callable:",
  //   await contracts["ValidatorSetAuRa"].methods
  //     .emitInitiateChangeCallable()
  //     .call()
  // );

  // const minCandidateStake = await contracts["StakingAuRa"].methods
  //   .candidateMinStake()
  //   .call();
  // console.log("min stake =", web3.utils.fromWei(minCandidateStake));
  // const stakeAllowed = await contracts["StakingAuRa"].methods
  //   .areStakeAndWithdrawAllowed()
  //   .call();
  // console.log("stake allowed:", stakeAllowed);

  // console.log(
  //   "Stake:",
  //   await contracts["StakingAuRa"].methods
  //     .stakeAmount(candidate.staking, candidate.staking)
  //     .call()
  // );
  // console.log(
  //   "Withdrawable:",
  //   await contracts["StakingAuRa"].methods
  //     .maxWithdrawAllowed(candidate.staking, candidate.staking)
  //     .call()
  // );
  // console.log(
  //   "Order withdrawable:",
  //   await contracts["StakingAuRa"].methods
  //     .maxWithdrawOrderAllowed(candidate.staking, candidate.staking)
  //     .call()
  // );
  // console.log(
  //   "Staking balance:",
  //   web3.utils.fromWei(await web3.eth.getBalance(candidate.staking))
  // );
  // console.log(
  //   "Signer balance:",
  //   web3.utils.fromWei(await web3.eth.getBalance(candidate.mining))
  // );
  // const epochs = await contracts["BlockRewardAuRa"].methods
  //   .epochsToClaimRewardFrom(candidate.staking, candidate.staking)
  //   .call();
  // console.log("Avail claim epochs:", epochs);
  // const reward = await contracts["StakingAuRa"].methods
  //   .getRewardAmount(epochs, candidate.staking, candidate.staking)
  //   .call();
  // console.log("Avail reward:", web3.utils.fromWei(reward));
  // console.log(
  //   "Banned:",
  //   await Promise.all(
  //     [].map(
  //       async (ip) =>
  //         await contracts["ValidatorSetAuRa"].methods.banCounter(ip).call()
  //     )
  //   )
  // );
  // console.log(
  //   "Banned until:",
  // await contracts["ValidatorSetAuRa"].methods
  //   .bannedUntil("0x1ed811Bcfc6982c54411Fd3e114d5313dC09F262")
  //   .call()
  // );
  // console.log(
  //   "Banned reason:",
  // web3.utils.hexToAscii(
  //   await contracts["ValidatorSetAuRa"].methods
  //     .banReason("0x1ed811Bcfc6982c54411Fd3e114d5313dC09F262")
  //     .call()
  // );
  // );
  web3.eth.net.getId().then(console.log);
};

module.exports = { info };
