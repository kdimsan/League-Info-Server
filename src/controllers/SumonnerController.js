const SummonersServices = require("../services/SummonersServices");
const summonerServices = new SummonersServices();

class SummonerController {
  async get(request, response) {
    summonerServices.get(request, response);
  }
}
module.exports = SummonerController;
