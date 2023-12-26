import { ethers } from "ethers";
import fs from "fs";
import { CURVE_ABI } from "./abi";
import {
  RemoveLiquidityEventProps,
  RemoveLiquidityOneEventProps,
  SwapEventProps,
} from "./interface";
require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`
);
const swapEventListener = async () => {
  const blockNumber = await provider.getBlockNumber();
  const CURVE_PAIR_ADDRESS = "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7";
  const contract = new ethers.Contract(
    CURVE_PAIR_ADDRESS,
    CURVE_ABI as any,
    provider
  );

  contract.on(
    "TokenExchange",
    (buyer, sold_id, tokens_sold, bought_id, tokens_bought) => {
      const events: SwapEventProps = {
        buyer,
        sold_id,
        tokens_sold,
        bought_id,
        tokens_bought,
      };
      const eventsToString = JSON.stringify(events);

      fs.appendFile("events_curve.json", eventsToString, "utf8", () => {
        console.log("Event saved");
      });
    }
  );

  contract.on("RemoveLiquidityOne", (provider, token_amount, coin_amount) => {
    const events: RemoveLiquidityOneEventProps = {
      provider,
      token_amount,
      coin_amount,
    };
    const eventsToString = JSON.stringify(events);

    fs.appendFile("remove_liquidity_one.json", eventsToString, "utf8", () => {
      console.log("Event saved");
    });
  });

  contract.on(
    "RemoveLiquidity",
    (provider, token_amounts, fees, token_supply) => {
      const events: RemoveLiquidityEventProps = {
        provider,
        token_amounts,
        fees,
        token_supply,
      };
      const eventsToString = JSON.stringify(events);

      fs.appendFile("remove_liquidity.json", eventsToString, "utf8", () => {
        console.log("Event saved");
      });
    }
  );
};

swapEventListener();
