const axios = require("axios");
require("dotenv/config");

class FreeWeekService {
  async get(req, res) {
    const KEY = process.env.API_KEY;

    const FREE_WEEK_API = `https://br1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${KEY}`;
    const ALL_CHAMPIONS_API =
      "https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/champion.json";

    const ALL_CHAMPIONS_RES = await axios
      .get(ALL_CHAMPIONS_API)
      .then((response) => {
        return response.data;
      })
      .catch((err) => err);

    const FREE_WEEK_RES = await axios
      .get(FREE_WEEK_API)
      .then((response) => {
        const normalFreeWeekIds = response.data.freeChampionIds;
        const newPlayersFreeWeekIds =
          response.data.freeChampionIdsForNewPlayers;

        const NORMAL_FREE_WEEK = findChampionByKey(normalFreeWeekIds);
        const NEW_PLAYERS_FREE_WEEK = findChampionByKey(newPlayersFreeWeekIds);

        return {
          freeChampions: NORMAL_FREE_WEEK,
          freeChampionForNewPlayers: NEW_PLAYERS_FREE_WEEK,
          maxNewPlayerLevel: response.data.maxNewPlayerLevel,
        };
      })
      .catch((err) => err);

    function findChampionByKey(keys) {
      const allChampions = Object.values(ALL_CHAMPIONS_RES.data);
      const foundChampions = [];

      keys.forEach((key) => {
        allChampions.forEach((champion) => {
          if (Number(champion.key) === key) {
            foundChampions.push(champion);
          }
        });
      });

      return foundChampions;
    }

    res.json(FREE_WEEK_RES);
  }
}

module.exports = FreeWeekService;
