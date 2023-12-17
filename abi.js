"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNISWAP_ABI = exports.PAIR_ADDRESS = exports.UNISWAP_FACTORY_V2_ADDRESS = void 0;
exports.UNISWAP_FACTORY_V2_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
exports.PAIR_ADDRESS = "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852";
exports.UNISWAP_ABI = [
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
