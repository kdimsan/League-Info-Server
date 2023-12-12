const axios = require("axios");

class SummonersServices {
  async get(request, response) {
    const playerName = "Alias";
    const tagLine = "br23";
    const accountRegion = "br1";

    const KEY = process.env.API_KEY;
    const baseUrl = process.env.BASE_URL;
    const rankedUrl = process.env.RANKED_URL;
    const championMaestryUrl = process.env.CHAMPION_MAESTRY_URL;
    const baseSummonerUrl = process.env.BASE_SUMMONER_URL;
    const summonerDetailsUrl = process.env.SUMMONER_DETAILS_URL;

    //recive region by input parameters

    const API_SUMMONER_CALL = `https://europe.${baseUrl}/${baseSummonerUrl}/${playerName}/${tagLine}?api_key=${KEY}`;

    const SUMMONER_BY_TAG_RES = await axios
      .get(API_SUMMONER_CALL)
      .then((response) => {
        return response.data;
      })
      .catch((err) => err);

    const SUMMONER_PUUID = await SUMMONER_BY_TAG_RES.puuid;

    const SUMMONER_DETAILS_API = `https://${accountRegion}.${baseUrl}/${summonerDetailsUrl}/${SUMMONER_PUUID}?api_key=${KEY}`;

    const API_RANKED_CALL = `https://${accountRegion}.${baseUrl}/${rankedUrl}/${SUMMONER_PUUID}?api_key=${KEY}`;
    const API_CHAMPION_MAESTRY = `https://${accountRegion}.${baseUrl}/${championMaestryUrl}/${SUMMONER_PUUID}?api_key=${KEY}`;
    const ALL_CHAMPIONS_API =
      "https://ddragon.leagueoflegends.com/cdn/13.23.1/data/en_US/champion.json";

    const SUMMONER_DATA_RES = await axios
      .get(SUMMONER_DETAILS_API)
      .then((response) => {
        return response.data;
      })
      .catch((err) => err);

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
