var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
const swapEventListener = () => __awaiter(this, void 0, void 0, function* () {
    const blockNumber = yield provider.getBlockNumber();
    const contract = new ethers.Contract(PAIR_ADDRESS, uniswapABI, provider);
    contract.on("Swap", (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
        const events = {
            sender,
            amount0In,
            amount1In,
            amount0Out,
            amount1Out,
            to,
        };
        const swapEvent = JSON.stringify(events);
        fs.appendFile("swap.json", swapEvent + ",", (err) => {
            if (err)
                throw err;
            console.log("Swap event saved!");
        });
    });
});
swapEventListener();
