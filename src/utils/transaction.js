const { APIClient } = require("@liskhq/lisk-api-client");
const { Mnemonic } = require("@liskhq/lisk-passphrase");
const config = require("../config/config.json");
const {
  getNetworkIdentifier,
  getPrivateAndPublicKeyFromPassphrase,
  getAddressFromPublicKey,
} = require("@liskhq/lisk-cryptography");
const { utils, TransferTransaction } = require("@liskhq/lisk-transactions");
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

const transfer = async (recipientId, amount, passphrase) => {
  let ret;
  const tx = new TransferTransaction({
    asset: {
      amount: amount,
      recipientId: recipientId,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(passphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

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
      ret = err;
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
      ret = err;
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
      ret = err;
    });
  return ret;
};

const postProject = async (
  senderPassphrase,
  title,
  description,
  category,
  prize,
  maxTime,
  maxRevision
) => {
  let ret;
  const projectAccount = createAccount();
  const tx = new PostProjectTransaction({
    asset: {
      projectPublicKey: projectAccount.publicKey,
      title: title,
      description: description,
      category: category,
      prize: prize,
      maxTime: maxTime,
      maxRevision: maxRevision,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const postProposal = async (
  senderPassphrase,
  projectPublicKey,
  pitching,
  term
) => {
  let ret;
  const proposalAccount = createAccount();
  const tx = new PostProposalTransaction({
    asset: {
      proposalPublicKey: proposalAccount.publicKey,
      projectPublicKey: projectPublicKey,
      pitching: pitching,
      term: term,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const joinTeam = async (senderPassphrase, proposalPublicKey, roleIndex) => {
  let ret;
  const teamAccount = createAccount();
  const tx = new JoinTeamTransaction({
    asset: {
      teamPublicKey: teamAccount.publicKey,
      proposalPublicKey: proposalPublicKey,
      role: roleIndex,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const startWork = async (
  senderPassphrase,
  projectPublicKey,
  selectedProposalPublicKey
) => {
  let ret;
  const tx = new StartWorkTransaction({
    asset: {
      projectPublicKey: projectPublicKey,
      selectedProposalPublicKey: selectedProposalPublicKey,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const submitContribution = async (
  senderPassphrase,
  teamPublicKey,
  fileextension,
  filemime,
  filename,
  filedata
) => {
  let ret;
  const contributionAccount = createAccount();
  const tx = new SubmitContributionTransaction({
    asset: {
      contributionPublicKey: contributionAccount.publicKey,
      teamPublicKey: teamPublicKey,
      fileextension: fileextension,
      filemime: filemime,
      filename: filename,
      filedata: filedata,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const leaderRequestRevision = async (
  senderPassphrase,
  contributionPublicKey,
  reason
) => {
  let ret;
  const tx = new LeaderRequestRevisionTransaction({
    asset: {
      contributionPublicKey: contributionPublicKey,
      reason: reason,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const submitWork = async (
  senderPassphrase,
  proposalPublicKey,
  fileextension,
  filemime,
  filename,
  filedata
) => {
  let ret;
  const submissionAccount = createAccount();
  const tx = new SubmitWorkTransaction({
    asset: {
      submissionPublicKey: submissionAccount.publicKey,
      proposalPublicKey: proposalPublicKey,
      fileextension: fileextension,
      filemime: filemime,
      filename: filename,
      filedata: filedata,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const employerRequestRevision = async (
  senderPassphrase,
  submissionPublicKey,
  reason
) => {
  let ret;
  const tx = new EmployerRequestRevisionTransaction({
    asset: {
      submissionPublicKey: submissionPublicKey,
      reason: reason,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const finishWork = async (senderPassphrase, projectPublicKey) => {
  let ret;
  const tx = new FinishWorkTransaction({
    asset: {
      projectPublicKey: projectPublicKey,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const claimPrize = async (senderPassphrase, projectPublicKey) => {
  let ret;
  const tx = new ClaimPrizeTransaction({
    asset: {
      projectPublicKey: projectPublicKey,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const terminateWork = async (senderPassphrase, projectPublicKey) => {
  let ret;
  const tx = new TerminateWorkTransaction({
    asset: {
      projectPublicKey: projectPublicKey,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const cancelWork = async (senderPassphrase, projectPublicKey) => {
  let ret;
  const tx = new CancelWorkTransaction({
    asset: {
      projectPublicKey: projectPublicKey,
    },
    networkIdentifier: networkIdentifier,
    timestamp: utils.getTimeFromBlockchainEpoch(),
  });
  tx.sign(senderPassphrase);
  await api.transactions
    .broadcast(tx.toJSON())
    .then((res) => {
      ret = res;
    })
    .catch((err) => {
      console.log(err);
      ret = err;
    });
  return ret;
};

const openDispute = () => {};

const voteDispute = () => {};

const closeDispute = () => {};

module.exports = {
  transfer,
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
