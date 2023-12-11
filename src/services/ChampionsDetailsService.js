const axios = require("axios");

class ChampionsDetailsService {
  async post(req, res) {
    const { championName } = req.body;

    const CHAMPION_API = `https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/champion/${championName}.json`;

    const CHAMPION_DETAILS = await axios.get(CHAMPION_API).then((response) => {
      return response.data;
    });

    res.json(CHAMPION_DETAILS);
  }
}

module.exports = ChampionsDetailsService;
