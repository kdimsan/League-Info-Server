const { Router } = require("express");
const router = Router();

const summonerRoute = require("./summoner.routes");
const championsFullDetailsRoute = require("./champions_details.routes");
const freeWeekRoute = require("./freeWeek.routes");

router.use("/summoner", summonerRoute);
router.use("/champions_details", championsFullDetailsRoute);
router.use("/free_week", freeWeekRoute);

module.exports = router;
