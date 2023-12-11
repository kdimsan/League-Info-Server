const { Router } = require("express");

const SummonerController = require("../controllers/SumonnerController");

const summonerController = new SummonerController();

const summonerRoute = Router();

summonerRoute.get("/", summonerController.get);

module.exports = summonerRoute;
