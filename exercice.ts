const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
);

const doSomethingWithBlockNumber = async () => {
  const blockNumber = await provider.getBlockNumber();
  // DO SOMETHING
};
