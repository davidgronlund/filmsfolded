var express = require("express");
var router = express.Router();
var low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const lodash = require("lodash");

const adapter = new FileSync("./db.json");
const db = low(adapter);

router.get("/search", function(req, res, next) {
  const reviews = db
    .get("reviews")
    .filter({ movie: "Zodiac" })
    .value();
  res.render("index", {
    title: "Films folded",
    reviews: reviews
  });
});

module.exports = router;
