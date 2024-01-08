import { ethers } from "ethers";
import fs from "fs";
import { CURVE_ABI, CURVE_FACTORY_ABI, CURVE_FACTORY_ADDRESS } from "./abi";
import {
  PlainPoolEventProps,
  PoolsEventProps,
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
      console.log("eventsToString", eventsToString);
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
      console.log("Remove liquidity one detected");
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
        console.log("Remove Liquidity detected");
      });
    }
  );

  const factoryContract = new ethers.Contract(
    CURVE_FACTORY_ADDRESS,
    CURVE_FACTORY_ABI as any,
    provider
  );

  factoryContract.on(
    "MetaPoolDeployed",
    (coin, base_pool, a, fee, deployer) => {
      console.log(coin, base_pool, a, fee, deployer);
      const pools: PoolsEventProps = {
        coin,
        base_pool,
        A: a,
        fee,
        deployer,
      };
      const poolsToString = JSON.stringify(pools);
      fs.appendFile("pools.json", poolsToString, "utf8", () => {
        console.log("New meta pool created!");
      });
    }
  );

  factoryContract.on(
    "PlainPoolDeployed",
    (coin, base_pool, a, fee, deployer) => {
      console.log(coin, base_pool, a, fee, deployer);
      const pools: PlainPoolEventProps = {
        coin,
        A: a,
        fee,
        deployer,
      };
      const poolsToString = JSON.stringify(pools);
      fs.appendFile("plain_pools.json", poolsToString, "utf8", () => {
        console.log("New plain pool created!");
      });
    }
  );
};

swapEventListener();
