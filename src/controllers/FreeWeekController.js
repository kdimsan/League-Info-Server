const FreeWeekService = require("../services/FreeWeekService");
const freeWeekService = new FreeWeekService();

class FreeWeekController {
  async get(req, res) {
    freeWeekService.get(req, res);
  }
}

module.exports = FreeWeekController;
