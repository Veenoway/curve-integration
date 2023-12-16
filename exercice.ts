require("dotenv").config();
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
);

console.log("provider", provider);
