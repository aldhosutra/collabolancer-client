const config = {
  nodes: [process.env.REACT_APP_NODE || "http://localhost:4000"],
  extendedAPI: process.env.REACT_APP_EXTENDED_API || "http://localhost:4001",
  explorerURL: process.env.REACT_APP_EXPLORER_URL || "http://localhost:6040",
  faucetURL: process.env.REACT_APP_FAUCET_URL || "http://localhost:3200",
  block_time: 15000,
  sessionExpireMilliseconds: 900000,
};

export default config;
