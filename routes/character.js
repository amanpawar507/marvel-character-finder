const express = require("express");
const router = express.Router();
const characterData = require("../data/character");
const path = require("path");

router.get("/", async (req, res) => {
  res.render("characters/index", { title: "Character Finder" });
});

router.post("/search", async (req, res) => {
  const searchTerm = req.body.searchTerm;
  if (!searchTerm) {
    res.status(400).render("characters/error", {
      title: "Error",
      error: "Invalid search",
    });
    return;
  }
  //let errors = [];

  if (typeof searchTerm != "string") {
    res.status(400).render("characters/error", {
      title: "Error",
      error: "Search term should be a string",
    });
    return;
  }
  if (searchTerm.trim().length == 0) {
    res.status(400).render("characters/error", {
      title: "Error",
      error: "Search term cannot be empty",
    });
    return;
  }
  let marvelList;
  try {
    marvelList = await characterData.getSearchLink(searchTerm);
  } catch (e) {
    res.status(400).render("characters/error", {
      title: "Error",
      error: e,
    });
    return;
  }
  if (marvelList.length == 0) {
    res.render("characters/error", {
      title: "Error",
      error: "We're sorry, but no results were found for " + searchTerm,
    });
  } else {
    res.render("characters/search", {
      marvelList: marvelList,
      title: "Characters found:",
      searchTerm: searchTerm,
    });
  }
});

router.get("/characters/:id", async (req, res) => {
  try {
    const character = await characterData.getCharLink(req.params.id);
    res.render("characters/chars", {
      character: character,
      title: character.name,
    });
  } catch (e) {
    res.status(404).render("characters/error", {
      title: "Error",
      error: e,
    });
  }
});
module.exports = router;
