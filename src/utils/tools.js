import { APIClient } from "@liskhq/lisk-api-client";
import { toast } from "react-toastify";
import config from "../config/config.json";
import { MISCELLANEOUS } from "../transactions/constants";
const base91 = require("node-base91");
const { getAddressFromPublicKey } = require("@liskhq/lisk-cryptography");

const client = new APIClient(config.nodes);

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

export const getAvailableProjects = (offset, limit) =>
  fetch(
    config.extendedAPI +
      "/api/project/available?offset=" +
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

export const getSession = (key) => {
  if (sessionStorage.getItem(key) === null) {
    return null;
  }
  if (Date.now() > JSON.parse(sessionStorage.getItem(key)).expireAt) {
    toast.error("Session Expire, Please Login Again!");
    removeSession(key);
    return null;
  } else {
    return JSON.parse(sessionStorage.getItem(key)).data;
  }
};

export const getSessionExpire = (key) => {
  if (sessionStorage.getItem(key) === null) {
    return null;
  }
  return JSON.parse(sessionStorage.getItem(key)).expireAt;
};

export const setSession = (key, data) => {
  sessionStorage.setItem(
    key,
    JSON.stringify({
      expireAt: Date.now() + config.sessionExpireMilliseconds,
      data: data,
    })
  );
};

export const removeSession = (key) => {
  sessionStorage.removeItem(key);
};
