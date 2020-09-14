import { APIClient } from "@liskhq/lisk-api-client";
import config from "../config/config.json";

const client = new APIClient(config.nodes);

export const getTransactions = (options) => client.transactions.get(options);
export const getAccounts = (options) => client.accounts.get(options);
