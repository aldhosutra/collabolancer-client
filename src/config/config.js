const config = {
  nodes: [process.env.NODE || "http://localhost:4000"],
  extendedAPI: process.env.EXTENDED_API || "http://localhost:4001",
  explorerURL: process.env.EXPLORER_URL || "http://localhost:6040",
  faucetURL: process.env.FAUCET_URL || "http://localhost:3200",
  block_time: 15000,
  sessionExpireMilliseconds: 900000,
};

export default config;
