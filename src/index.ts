import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import { WebSocketServer } from "ws";
import { countries } from "./routes/countries";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { BlocksLatest } from "./shared/types";

const app = express();
const port = 3000;

const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));

app.use(logger("dev"));

app.get("/", function (_req, res, next) {
  console.log(clientDist);
  res.sendFile("index.html", { root: clientDist });
  next();
});

const server = app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

app.use("/countries", countries);

const wss = new WebSocketServer({ server });

wss.on("connection", async (ws) => {
  const API = new BlockFrostAPI({
    projectId: "mainnetmeRhb0Iiwj5BrXR1x3yG2zXQz9vjzzuf",
  });

  // This was taken from "blockfrost/blockfrost-websocket-link" repo
  const PING_INTERVAL = 30 * 1000;

  console.log("### Sending first block ###");
  const latestBlock: BlocksLatest = await API.blocksLatest();
  ws.send(JSON.stringify(latestBlock));

  setInterval(async () => {
    console.log("### Sending additional block ###");
    const latestBlock: BlocksLatest = await API.blocksLatest();
    ws.send(JSON.stringify(latestBlock));
  }, PING_INTERVAL);

  // const networkInfo = await API.network();
  // const latestEpoch = await API.epochsLatest();
  // const health = await API.health();
  // const address = await API.addresses(
  //   "addr1qxqs59lphg8g6qndelq8xwqn60ag3aeyfcp33c2kdp46a09re5df3pzwwmyq946axfcejy5n4x0y99wqpgtp2gd0k09qsgy6pz"
  // );
  // const pools = await API.pools({ page: 1, count: 10, order: "asc" });

  // const getBlockData = async () => {
  //   try {

  //     return {
  //       latestBlock,
  //       networkInfo,
  //       latestEpoch,
  //       health,
  //       address,
  //       pools,
  //     };
  //   } catch (err) {
  //     console.log("error", err);
  //   }
  // };

  // getBlockData().then((data) => {
  //   ws.send(JSON.stringify(data));
  // });
});
