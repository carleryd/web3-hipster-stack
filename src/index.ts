import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import { countries } from "./routes/countries";

const app = express();
const port = 3000;

const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));

app.use(logger("dev"));

const middleware: express.RequestHandler = function (_req, _res, next) {
  console.log("MIDDLEWARE");
  next();
};

app.use(middleware);

app.all("/", function (_req, _res, next) {
  console.log("Just checking...");
  next(); // pass control to the next handler
});

app.get("/", function (_req, res, next) {
  console.log(clientDist);
  res.sendFile("index.html", { root: clientDist });
  next();
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

app.use("/countries", countries);
