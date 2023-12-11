require("dotenv/config");
var express = require("express");
var cors = require("cors");
const axios = require("axios");

const router = require("./routes");

var app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(4000, function () {
  console.log("Server is running on PORT 4000");
});
