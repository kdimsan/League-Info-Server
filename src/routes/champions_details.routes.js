const { Router } = require("express");

const ChampionsDetailsController = require("../controllers/ChampionsDetailsController");

const championsDetailsController = new ChampionsDetailsController();

const championsFullDetailsRoute = Router();

championsFullDetailsRoute.post("/", championsDetailsController.post);

module.exports = championsFullDetailsRoute;
