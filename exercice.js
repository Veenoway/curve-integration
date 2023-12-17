"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const fs_1 = __importDefault(require("fs"));
const abi_1 = require("./abi");
const utils_1 = require("./utils");
require("dotenv").config();
const provider = new ethers_1.ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`);
const swapEventListener = () => __awaiter(void 0, void 0, void 0, function* () {
    const blockNumber = yield provider.getBlockNumber();
    const contract = new ethers_1.ethers.Contract(abi_1.PAIR_ADDRESS, abi_1.UNISWAP_ABI, provider);
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
        const inAmount = (0, utils_1.getAmount)(amount0In, amount1In);
        const outAmount = (0, utils_1.getAmount)(amount0Out, amount1Out);
        fs_1.default.appendFile("swap.json", swapEvent + ",", (err) => {
            if (err)
                throw err;
            if (utils_1.routerName[sender])
                (0, utils_1.getLog)("Swap has been recorded from: ", inAmount, outAmount, sender);
            else if (utils_1.routerName[to])
                (0, utils_1.getLog)("Swap has been recorded to: ", inAmount, outAmount, to);
            else
                (0, utils_1.getLog)("Swap event saved! ", inAmount, outAmount);
        });
    });
});
swapEventListener();
