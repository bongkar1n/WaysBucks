require("dotenv").config();
const express = require("express");
const app = express();
const port = 4000;
const router = require("./src/routers");

app.use(express.json());
app.use("/api/v1/", router);

app.listen(port, () => console.log(`you are listening to ${port}`));
