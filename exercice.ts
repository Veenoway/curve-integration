const newFetch = require("node-fetch");
require("dotenv").config();

const res = newFetch(
  `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}}`
).then((r) => {
  console.log(r);
});
