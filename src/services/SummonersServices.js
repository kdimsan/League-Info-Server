const axios = require("axios");

class SummonersServices {
  async get(request, response) {
    const playerName = "AliasArgonaut";
    const KEY = process.env.API_KEY;
    const API_SUMMONER_CALL = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${playerName}?api_key=${KEY}`;

    const SUMMONER_DATA_RES = await axios
      .get(API_SUMMONER_CALL)
      .then((response) => {
        return response.data;
      })
      .catch((err) => err);

    const SUMMONER_ID = await SUMMONER_DATA_RES.id;

    const API_RANKED_CALL = `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${SUMMONER_ID}?api_key=${KEY}`;
    const API_CHAMPION_MAESTRY = `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${SUMMONER_ID}?api_key=${KEY}`;
    const ALL_CHAMPIONS_API =
      "https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/champion.json";

    const SUMMONER_RANKED_RES = await axios
      .get(API_RANKED_CALL)
      .then((response) => {
        return response.data;
      })
      .catch((err) => err);

    //GET all champions info
    const ALL_CHAMPIONS = await axios
      .get(ALL_CHAMPIONS_API)
      .then((response) => {
        return response.data;
      })
      .catch((err) => err);

    var TOP_MAESTRY_CHAMPION = [];
    for (var i = 0; i <= 9; i++) {
      const SUMMONER_CHAMPION_MAESTRY = await axios
        .get(API_CHAMPION_MAESTRY)
        .then((response) => {
          const fullResponse = response.data[i];

          const keyToCompare = fullResponse.championId.toString();

          const FOUND_CHAMPIONS = findChampionByKey(keyToCompare);

          return {
            championId: fullResponse.championId,
            championName: FOUND_CHAMPIONS,
            championLevel: fullResponse.championLevel,
            championPoints: fullResponse.championPoints,
            lastPlayTime: fullResponse.lastPlayTime,
            chestGranted: fullResponse.chestGranted,
          };
        })
        .catch((err) => err);

      TOP_MAESTRY_CHAMPION.push(SUMMONER_CHAMPION_MAESTRY);
    }

    function findChampionByKey(keys) {
      const champion = Object.values(ALL_CHAMPIONS.data).find(
        (champ) => champ.key === keys
      );

      return champion ? champion.name : "Champion não encontrado";
    }

    response.json({
      SUMMONER_DATA_RES,
      SUMMONER_RANKED_RES,
      TOP_MAESTRY_CHAMPION,
    });
  }
}

module.exports = SummonersServices;
