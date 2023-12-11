const { Router } = require("express");

const FreeWeekController = require("../controllers/FreeWeekController");

const freeWeekController = new FreeWeekController();

const freeWeekRoute = Router();

freeWeekRoute.get("/", freeWeekController.get);

module.exports = freeWeekRoute;
