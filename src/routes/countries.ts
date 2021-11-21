import * as express from "express";

const countries = express.Router();

countries.get("/sweden", function(req, res) {
    res.send("Sweden number one!!!!");
})

countries.get("/new-zealand", function(req, res) {
    res.send("New Zealand, also pretty cool");
})

export { countries }
