"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLog = exports.getAmount = exports.formatHex = exports.routerName = void 0;
const ethers_1 = require("ethers");
exports.routerName = {
    "0x0b85B3000BEf3E26e01428D1b525A532eA7513b8": {
        name: "Uniswap V2 RIO 3",
    },
    "0x9832263a82B729F947aca4842cB53A3109A46e5b": {
        name: "Uniswap V2 MIND 6",
    },
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D": {
        name: "Uniswap V2 Router 2",
    },
    "0x1111111254EEB25477B68fb85Ed929f73A960582": {
        name: "1inch V5 Aggregation Router",
    },
    "0x0Ae8D75E6168420A7D52a791C2465b43307408b4": {
        name: "Uniswap V2 OXL 18",
    },
};
const formatHex = (hex) => {
    const bigInt = ethers_1.ethers.BigNumber.from(hex);
    const int = ethers_1.ethers.utils.formatEther(bigInt);
    return int.toString();
};
exports.formatHex = formatHex;
const getAmount = (amount0, amount1) => {
    const formattedAmount0 = Number((0, exports.formatHex)(amount0));
    const formattedAmount1 = Number((0, exports.formatHex)(amount1));
    return formattedAmount0 > 0
        ? formattedAmount0
        : formattedAmount1 > 0
            ? formattedAmount1
            : 0;
};
exports.getAmount = getAmount;
const getLog = (log, inAmount, outAmount, sender) => {
    console.group();
    console.log(log, sender ? exports.routerName[sender].name : "");
    console.log(`Amount In: ${inAmount} ETH`);
    console.log(`Amount Out: ${outAmount} ETH`);
    console.groupEnd();
};
exports.getLog = getLog;
