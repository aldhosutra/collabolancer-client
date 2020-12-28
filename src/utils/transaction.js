import { Mnemonic } from "@liskhq/lisk-passphrase";
import { utils, TransferTransaction } from "@liskhq/lisk-transactions";
import {
  getNetworkIdentifier,
  getPrivateAndPublicKeyFromPassphrase,
  getAddressFromPublicKey,
} from "@liskhq/lisk-cryptography";
import {
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
} from "../transactions";
import config from "../config/config";

const { APIClient } = require("@liskhq/lisk-api-client");
const networkIdentifier = getNetworkIdentifier(
  window._env_.REACT_APP_NETWORK_HASH ||
    "23ce0366ef0a14a91e5fd4b1591fc880ffbef9d988ff8bebf8f3666b0c09597d",
  window._env_.REACT_APP_NETWORK_NAME || "Lisk"
);

const api = new APIClient(config.nodes);

export const transfer = async (recipientId, amount, passphrase) => {
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

export const createAccount = () => {
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

export const registerEmployer = async (employerPassphrase) => {
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

export const registerWorker = async (workerPassphrase) => {
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

export const registerSolver = async (solverPassphrase) => {
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

export const postProject = async (
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

export const postProposal = async (
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

export const joinTeam = async (
  senderPassphrase,
  proposalPublicKey,
  roleIndex
) => {
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

export const startWork = async (
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

export const submitContribution = async (
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

export const leaderRequestRevision = async (
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

export const submitWork = async (
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

export const employerRequestRevision = async (
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

export const finishWork = async (senderPassphrase, projectPublicKey) => {
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

export const claimPrize = async (senderPassphrase, projectPublicKey) => {
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

export const terminateWork = async (senderPassphrase, projectPublicKey) => {
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

export const cancelWork = async (senderPassphrase, projectPublicKey) => {
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

export const openDispute = async (
  senderPassphrase,
  casePublicKey,
  projectPublicKey,
  suit,
  maxDays
) => {
  let ret;
  const disputeAccount = createAccount();
  const tx = new OpenDisputeTransaction({
    asset: {
      disputePublicKey: disputeAccount.publicKey,
      casePublicKey: casePublicKey,
      projectPublicKey: projectPublicKey,
      suit: suit,
      maxDays: maxDays,
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

export const voteDispute = async (
  senderPassphrase,
  disputePublicKey,
  voteFor
) => {
  let ret;
  const tx = new VoteDisputeTransaction({
    asset: {
      disputePublicKey: disputePublicKey,
      voteFor: voteFor,
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

export const closeDispute = async (senderPassphrase, disputePublicKey) => {
  let ret;
  const tx = new CloseDisputeTransaction({
    asset: {
      disputePublicKey: disputePublicKey,
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
