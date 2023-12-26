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
require("dotenv").config();
const provider = new ethers_1.ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURA_ID}`);
const swapEventListener = () => __awaiter(void 0, void 0, void 0, function* () {
    const blockNumber = yield provider.getBlockNumber();
    const CURVE_PAIR_ADDRESS = "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7";
    const contract = new ethers_1.ethers.Contract(CURVE_PAIR_ADDRESS, abi_1.CURVE_ABI, provider);
    contract.on("TokenExchange", (buyer, sold_id, tokens_sold, bought_id, tokens_bought) => {
        const events = {
            buyer,
            sold_id,
            tokens_sold,
            bought_id,
            tokens_bought,
        };
        const eventsToString = JSON.stringify(events);
        fs_1.default.appendFile("events_curve.json", eventsToString, "utf8", () => {
            console.log("Swap event detected");
        });
    });
    contract.on("RemoveLiquidityOne", (provider, token_amount, coin_amount) => {
        const events = {
            provider,
            token_amount,
            coin_amount,
        };
        const eventsToString = JSON.stringify(events);
        fs_1.default.appendFile("remove_liquidity_one.json", eventsToString, "utf8", () => {
            console.log("Remove liquidity one detected");
        });
    });
    contract.on("RemoveLiquidity", (provider, token_amounts, fees, token_supply) => {
        const events = {
            provider,
            token_amounts,
            fees,
            token_supply,
        };
        const eventsToString = JSON.stringify(events);
        fs_1.default.appendFile("remove_liquidity.json", eventsToString, "utf8", () => {
            console.log("Remove Liquidity detected");
        });
    });
    contract.on("AddLiquidity", (provider, token_amounts, fees, invariant, token_supply) => {
        const events = {
            provider,
            token_amounts,
            fees,
            invariant,
            token_supply,
        };
        const eventsToString = JSON.stringify(events);
        fs_1.default.appendFile("add_liquidity.json", eventsToString, "utf8", () => {
            console.log("Liquidity added");
        });
    });
    const factoryContract = new ethers_1.ethers.Contract(abi_1.CURVE_FACTORY_ADDRESS, abi_1.CURVE_FACTORY_ABI, provider);
    factoryContract.on("MetaPoolDeployed", (coin, base_pool, a, fee, deployer) => {
        console.log(coin, base_pool, a, fee, deployer);
        const pools = {
            coin,
            base_pool,
            A: a,
            fee,
            deployer,
        };
        const poolsToString = JSON.stringify(pools);
        fs_1.default.appendFile("pools.json", poolsToString, "utf8", () => {
            console.log("New meta pool created!");
        });
    });
    factoryContract.on("PlainPoolDeployed", (coin, base_pool, a, fee, deployer) => {
        console.log(coin, base_pool, a, fee, deployer);
        const pools = {
            coin,
            A: a,
            fee,
            deployer,
        };
        const poolsToString = JSON.stringify(pools);
        fs_1.default.appendFile("plain_pools.json", poolsToString, "utf8", () => {
            console.log("New plain pool created!");
        });
    });
});
swapEventListener();
