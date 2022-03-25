const axios = require("axios");
const md5 = require("blueimp-md5");
const publickey = "6869b1b4af9b1ff78189b94f1543f56e";
const privatekey = "8862946a6f968ceeace07f66ef726228423a21fd";

async function getSearchLink(searchTerm) {
  if (!searchTerm) throw "Invalid";
  if (typeof searchTerm != "string") throw "Search term should be string";
  if (searchTerm.trim().length == 0) throw "Search term cannot be empty";
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl =
    "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=" +
    searchTerm;
  const url = baseUrl + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
  try {
    const dataResult = await axios.get(url);
    const characterList = dataResult.data.data.results.slice(0, 20);
    return characterList;
  } catch (e) {
    throw "Could not get Marvel data";
  }
}

async function getCharLink(id) {
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const baseUrl = "https://gateway.marvel.com:443/v1/public/characters/" + id;
  const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;
  try {
    const dataResults = await axios.get(url);
    return dataResults.data.data.results[0];
  } catch (e) {
    throw "Could not get Marvel data";
  }
}

module.exports = {
  getSearchLink,
  getCharLink,
};

//const publickey = '6869b1b4af9b1ff78189b94f1543f56el';
//const privatekey = '8862946a6f968ceeace07f66ef726228423a21fd';
