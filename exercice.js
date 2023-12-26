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
    // { type: "address", name: "buyer", indexed: true },
    // { type: "int128", name: "sold_id", indexed: false },
    // { type: "uint256", name: "tokens_sold", indexed: false },
    // { type: "int128", name: "bought_id", indexed: false },
    // { type: "uint256", name: "tokens_bought", indexed: false },
    contract.on("TokenExchange", (events) => {
        console.log("TokenExchange", events);
        fs_1.default.appendFile("events_curve.json", JSON.stringify({
            events,
        }), "utf8", () => {
            console.log("Event saved");
        });
    });
    // const filter = {
    //   address: null,
    //   topics: [
    //     ethers.utils.id(
    //       "TokenExchange(address,address,address,address,address,uint256,uint256)"
    //     ),
    //   ],
    // };
    // console.log("blockNumber", blockNumber);
    // provider.getLogs(filter).then((logs) => {
    //   console.log("logs", logs);
    //   logs.forEach((log) => {
    //     const event = ethers.utils.defaultAbiCoder.decode(
    //       ["address", "uint256", "address", "uint256", "uint256"],
    //       log.data
    //     );
    //     console.log("TokenExchange", event);
    //     fs.appendFile("events_curve.json", JSON.stringify(event), "utf8", () => {
    //       console.log("Event saved");
    //     });
    //     // Votre logique d'enregistrement ici
    //   });
    // });
});
swapEventListener();
