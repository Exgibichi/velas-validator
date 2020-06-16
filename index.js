const { candidate } = require("./config");
const { addresses, contracts } = require("./constants");
const { info } = require("./info");
const { web3 } = require("./web3");

const { sendSigned } = require("./signAndSendTx");

const sendStake = async () => {
  const minCandidateStake = await contracts["StakingAuRa"].methods
    .candidateMinStake()
    .call();

  try {
    const tx = await sendSigned(
      web3,
      {
        from: candidate.staking,
        to: addresses["StakingAuRa"],
        value: minCandidateStake,
        method: contracts["StakingAuRa"].methods.addPool(
          minCandidateStake,
          candidate.mining
        ),
        gas: web3.utils.toHex(1000000),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(1000000)
      },
      null
    );

    console.log({ tx });
  } catch (err) {
    console.log({ err });
  }
};

const emitChange = async () => {
  try {
    const tx = await sendSigned(
      web3,
      {
        from: candidate.staking,
        to: addresses["ValidatorSetAuRa"],
        method: contracts["ValidatorSetAuRa"].methods.emitInitiateChange(),
        gas: web3.utils.toHex(1600000),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(1000000)
      },
      null
    );

    console.log({ tx });
  } catch (err) {
    console.log({ err });
  }
};

const stake = async () => {
  try {
    const minCandidateStake = await contracts["StakingAuRa"].methods
      .candidateMinStake()
      .call();

    console.log({ minCandidateStake });

    const tx = await sendSigned(
      web3,
      {
        from: candidate.staking,
        to: addresses["StakingAuRa"],
        value: minCandidateStake,
        method: contracts["StakingAuRa"].methods.stake(
          candidate.staking,
          minCandidateStake
        ),
        gas: web3.utils.toHex(1600000),
        gasPrice: web3.utils.toHex(1000000)
      },
      null
    );

    console.log({ tx });
  } catch (err) {
    console.log({ err });
  }
};

const claimReward = async () => {
  try {
    const epochs = await contracts["BlockRewardAuRa"].methods
      .epochsToClaimRewardFrom(candidate.staking, candidate.staking)
      .call();
    const tx = await sendSigned(
      web3,
      {
        from: candidate.staking,
        to: addresses["StakingAuRa"],
        method: contracts["StakingAuRa"].methods.claimReward(
          epochs,
          candidate.staking
        ),
        gas: web3.utils.toHex(1600000),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(1000000)
      },
      null
    );

    console.log({ tx });
  } catch (err) {
    console.log({ err });
  }
};

const withdraw = async () => {
  try {
    const minCandidateStake = await contracts["StakingAuRa"].methods
      .candidateMinStake()
      .call();
    console.log({ minCandidateStake });
    const tx = await sendSigned(
      web3,
      {
        from: candidate.staking,
        to: addresses["ValidatorSetAuRa"],
        method: contracts["StakingAuRa"].methods.withdraw(
          candidate.staking,
          minCandidateStake
        ),
        gas: web3.utils.toHex(1600000),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(1000000)
      },
      null
    );

    console.log({ tx });
  } catch (err) {
    console.log({ err });
  }
};

const orderWithdraw = async () => {
  try {
    const minCandidateStake = await contracts["StakingAuRa"].methods
      .candidateMinStake()
      .call();
    console.log({ minCandidateStake });
    // const tx = await sendSigned(
    //   web3,
    //   {
    //     from: candidate.staking,
    //     to: addresses["StakingAuRa"],
    //     method: contracts["StakingAuRa"].methods.orderWithdraw(
    //       candidate.staking,
    //       minCandidateStake
    //     ),
    //     gas: web3.utils.toHex(1600000),
    //     gasLimit: web3.utils.toHex(1000000),
    //     gasPrice: web3.utils.toHex(1000000)
    //   },
    //   null
    // );

    console.log({ tx });
  } catch (err) {
    console.log({ err });
  }
};

const claimOrderedWithdraw = async () => {
  try {
    const tx = await sendSigned(
      web3,
      {
        from: candidate.staking,
        to: addresses["StakingAuRa"],
        method: contracts["StakingAuRa"].methods.claimOrderedWithdraw(
          candidate.staking
        ),
        gas: web3.utils.toHex(1800000),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(2100000)
      },
      null
    );

    console.log({ tx });
  } catch (err) {
    console.log({ err });
  }
};
 
const send = async () => {
  try {
    const tx = await sendSigned(
      web3,
      {
        from: "0x6882585ef0b67f0acb441a9bde1d8581f35c0c5b",
        to: "0xe3fb71ad638772c9875caa601456652f56bdefe0",
        value: web3.utils.toHex(web3.utils.toWei("100")),
        gas: web3.utils.toHex(21000),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(21000),
      },
      null
    );

    console.log({ tx });
  } catch (err) {
    console.log({ err });
  }
};

// чтобы стасть валидатором посылаем 1кк в стейк
// sendStake();
// запускаем чтобы применились изменения
// emitChange();
// чтобы забрать награду за блоки
// claimReward();
// чтобы выйти из валидаторов
// orderWithdraw();
// потом твой валидатор должен исчезнуть из Pending
// когда исчез, делаешь emitChange
// emitChange();
// когда исчезнет из валидаторов
// claimOrderedWithdraw();
// для получения инфо из бч
info();
// stake();
// send();