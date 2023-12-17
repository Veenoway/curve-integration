const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

const uniswapAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const uniswapABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Swap",
    type: "event",
  },
];

const PAIR_ADDRESS = "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852";

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
);
const swapEventListener = async () => {
  const blockNumber = await provider.getBlockNumber();
  const contract = new ethers.Contract(PAIR_ADDRESS, uniswapABI, provider);

  contract.on("Swap", async (event) => {
    console.log("event", event);
    const events = JSON.stringify(event);

    fs.appendFile("swap.json", events + "\n", (err) => {
      if (err) throw err;
      console.log("Swap event saved!", events);
    });
  });
};

swapEventListener();
