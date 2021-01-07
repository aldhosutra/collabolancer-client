import { APIClient } from "@liskhq/lisk-api-client";
import { Link } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";
import config from "../config/config";
import { ACCOUNT, MISCELLANEOUS } from "../transactions/constants";
import base91 from "node-base91";
import {
  getAddressFromPublicKey,
  getAddressFromPassphrase,
} from "@liskhq/lisk-cryptography";

const client = new APIClient(config.nodes);

export const profileParser = (address, callback) => {
  const onClick = callback || null;
  return (
    <Link
      className="link"
      style={{ textDecoration: "none", overflowWrap: "break-word" }}
      to={`/app/profile/${address}`}
      onClick={onClick}
    >
      {address}
    </Link>
  );
};

export const parseDocumentTitle = (title, brand, account) => {
  const isGuest = account && account.asset.type === "guest" ? "[Guest] " : "";
  const useBrand = brand === false ? "" : " | Collabolancer";
  return `${isGuest}${title}${useBrand}`;
};

export const getTransactionName = (type) => {
  const transactionRegistry = {
    8: "Transfer Transaction",
    101: "Register Employer Transaction",
    102: "Register Worker Transaction",
    103: "Register Solver Transaction",
    104: "Post Project Transaction",
    105: "Post Proposal Transaction",
    106: "Join Team Transaction",
    107: "Start Work Transaction",
    108: "Submit Contribution Transaction",
    109: "Leader Request Revision Transaction",
    110: "Submit Work Transaction",
    111: "Employer Request Revision Transaction",
    112: "Finish Work Transaction",
    113: "Claim Prize Transaction",
    114: "Terminate Work Transaction",
    115: "Cancel Work Transaction",
    116: "Open Dispute Transaction",
    117: "Vote Dispute Transaction",
    118: "Close Dispute Transaction",
  };
  return transactionRegistry[type];
};

export const login = async (userPassphrase) => {
  if (userPassphrase) {
    let ret = false;
    const userAddress = getAddressFromPassphrase(userPassphrase);
    await getAccounts({
      limit: 1,
      address: userAddress,
    })
      .then((res) => {
        if (
          [ACCOUNT.EMPLOYER, ACCOUNT.WORKER, ACCOUNT.SOLVER].includes(
            res.data[0].asset.type
          )
        ) {
          toast.success("Login Successful! Happy Collaborating!");
          setSession("secret", userPassphrase);
          ret = res.data[0];
        } else {
          toast.warning("No valid account found, check passphrase.");
        }
      })
      .catch((err) => {
        toast.warning("No valid account found, check passphrase.");
      });
    return ret;
  } else {
    toast.warning("Passphrase are empty, check again!");
    return false;
  }
};

export const saveFile = async (filePublicKey) => {
  let fileData = null;
  let title = "";
  let type = "";
  await client.accounts
    .get({ address: getAddressFromPublicKey(filePublicKey) })
    .then(async (data) => {
      title = data.data[0].asset.filename;
      type = data.data[0].asset.mime;
      await client.transactions
        .get({ id: data.data[0].asset.dataTransaction })
        .then((file) => {
          fileData = file.data[0].asset.filedata;
        });
    });
  const arrayBuffer = base91.decode(fileData);
  const blob = new Blob([arrayBuffer], { type: type });

  const url = window.URL.createObjectURL(blob);
  const tempLink = document.createElement("a");

  tempLink.href = url;
  tempLink.setAttribute("download", title);
  tempLink.click();
};

export const deflationaryMultiplier = async () => {
  let height = 0;
  await client.node.getStatus().then((data) => {
    height = data.data.height;
  });
  let multiplier = 1.0;
  for (
    let i = 0;
    i < MISCELLANEOUS.CASHBACK_DEFLATIONARY_MILESTONE.length;
    i++
  ) {
    if (height < MISCELLANEOUS.CASHBACK_DEFLATIONARY_MILESTONE[i]) {
      break;
    } else {
      multiplier = multiplier / 2;
    }
  }
  return multiplier;
};

export const getTransactions = (options) => client.transactions.get(options);

export const getAccounts = (options) => client.accounts.get(options);

export const getCategory = () =>
  fetch(config.extendedAPI + "/api/constant/category");

export const getBatch = (publicKeyList) =>
  fetch(config.extendedAPI + "/api/batch?q=" + publicKeyList.toString());

export const getStateCenter = () => fetch(config.extendedAPI + "/api/state");

export const getAvailableProjects = (offset, limit) =>
  fetch(
    config.extendedAPI +
      "/api/project/available?offset=" +
      offset.toString() +
      "&limit=" +
      limit.toString()
  );

export const getOpenedDisputes = (offset, limit) =>
  fetch(
    config.extendedAPI +
      "/api/disputes/open?offset=" +
      offset.toString() +
      "&limit=" +
      limit.toString()
  );

export const getProject = (projectPublicKey, parsed, fullFileData) => {
  if (projectPublicKey === null) {
    return null;
  }
  return fetch(
    config.extendedAPI +
      "/api/packed?project=" +
      projectPublicKey.toString() +
      "&parsed=" +
      parsed.toString() +
      "&full=" +
      fullFileData.toString()
  );
};

export const guestProfile = {
  address: "guest",
  publicKey: "guest",
  balance: "0",
  asset: {
    type: "guest",
  },
};

export const getSession = (key) => {
  if (localStorage.getItem(key) === null) {
    return null;
  }
  if (Date.now() >= JSON.parse(localStorage.getItem(key)).expireAt) {
    toast.error("Session Expire, Please Authenticate Again!");
    removeSession(key);
    return null;
  } else {
    return JSON.parse(localStorage.getItem(key)).data;
  }
};

export const getSessionExpire = (key) => {
  if (localStorage.getItem(key) === null) {
    return null;
  }
  return JSON.parse(localStorage.getItem(key)).expireAt;
};

export const setSession = (key, data) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      expireAt: Date.now() + config.sessionExpireMilliseconds,
      data: data,
    })
  );
};

export const removeSession = (key) => {
  localStorage.removeItem(key);
};
