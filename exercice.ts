import { ethers } from "ethers";
import fs from "fs";
import { PAIR_ADDRESS, UNISWAP_ABI } from "./abi";
import { SwapEventProps } from "./interface";
import { getAmount, getLog, routerName } from "./utils";
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
);
const swapEventListener = async () => {
  const blockNumber = await provider.getBlockNumber();
  const contract = new ethers.Contract(PAIR_ADDRESS, UNISWAP_ABI, provider);

  contract.on(
    "Swap",
    (sender, amount0In, amount1In, amount0Out, amount1Out, to) => {
      const events: SwapEventProps = {
        sender,
        amount0In,
        amount1In,
        amount0Out,
        amount1Out,
        to,
      };
      const swapEvent = JSON.stringify(events);
      const inAmount = getAmount(amount0In, amount1In);
      const outAmount = getAmount(amount0Out, amount1Out);

      fs.appendFile("swap.json", swapEvent + ",", (err) => {
        if (err) throw err;
        if (routerName[sender])
          getLog("Swap has been recorded from: ", inAmount, outAmount, sender);
        else if (routerName[to])
          getLog("Swap has been recorded to: ", inAmount, outAmount, to);
        else getLog("Swap event saved! ", inAmount, outAmount);
      });
    }
  );
};

swapEventListener();
