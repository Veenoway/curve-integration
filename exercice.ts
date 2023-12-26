import { ethers } from "ethers";
import fs from "fs";
import { CURVE_ABI } from "./abi";
import { SwapEventProps } from "./interface";
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
};

swapEventListener();
