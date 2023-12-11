const ChampionsDetailsService = require("../services/ChampionsDetailsService");
const championsDetailsService = new ChampionsDetailsService();

class ChampionsDetailsController {
  async post(req, res) {
    championsDetailsService.post(req, res);
  }
}

module.exports = ChampionsDetailsController;
