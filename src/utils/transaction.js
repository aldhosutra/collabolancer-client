const { APIClient } = require("@liskhq/lisk-api-client");
const { Mnemonic } = require("@liskhq/lisk-passphrase");
const config = require("../config/config.json");
const {
  getNetworkIdentifier,
  getPrivateAndPublicKeyFromPassphrase,
  getAddressFromPublicKey,
} = require("@liskhq/lisk-cryptography");
const { utils } = require("@liskhq/lisk-transactions");
const {
  RegisterEmployerTransaction,
  RegisterWorkerTransaction,
  RegisterSolverTransaction,
  PostProjectTransaction,
  PostProposalTransaction,
  JoinTeamTransaction,
  StartWorkTransaction,
  SubmitContributionTransaction,
  LeaderRequestRevisionTransaction,
  SubmitWorkTransaction,
  EmployerRequestRevisionTransaction,
  FinishWorkTransaction,
  ClaimPrizeTransaction,
  TerminateWorkTransaction,
  CancelWorkTransaction,
  OpenDisputeTransaction,
  VoteDisputeTransaction,
  CloseDisputeTransaction,
} = require("../transactions");
const networkIdentifier = getNetworkIdentifier(
  "23ce0366ef0a14a91e5fd4b1591fc880ffbef9d988ff8bebf8f3666b0c09597d",
  "Lisk"
);

const api = new APIClient(config.nodes);

const createAccount = () => {
  const passphrase = Mnemonic.generateMnemonic();
  const keys = getPrivateAndPublicKeyFromPassphrase(passphrase);
  const credentials = {
    address: getAddressFromPublicKey(keys.publicKey),
    passphrase: passphrase,
    publicKey: keys.publicKey,
    privateKey: keys.privateKey,
  };
  return credentials;
};

const registerEmployer = async (employerPassphrase) => {
  let ret;
  const tx = new RegisterEmployerTransaction({
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(employerPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return ret;
};

const registerWorker = async (workerPassphrase) => {
  let ret;
  const tx = new RegisterWorkerTransaction({
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(workerPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return ret;
};

const registerSolver = async (solverPassphrase) => {
  let ret;
  const tx = new RegisterSolverTransaction({
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(solverPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return ret;
};

const postProject = () => {};

const postProposal = () => {};

const joinTeam = () => {};

const startWork = () => {};

const submitContribution = () => {};

const leaderRequestRevision = () => {};

const submitWork = () => {};

const employerRequestRevision = () => {};

const finishWork = () => {};

const claimPrize = () => {};

const terminateWork = () => {};

const cancelWork = () => {};

const openDispute = () => {};

const voteDispute = () => {};

const closeDispute = () => {};

module.exports = {
  createAccount,
  registerEmployer,
  registerWorker,
  registerSolver,
  postProject,
  postProposal,
  joinTeam,
  startWork,
  submitContribution,
  leaderRequestRevision,
  submitWork,
  employerRequestRevision,
  finishWork,
  claimPrize,
  terminateWork,
  cancelWork,
  openDispute,
  voteDispute,
  closeDispute,
};
