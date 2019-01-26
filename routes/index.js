var express = require("express");
var router = express.Router();
var jsonfile = require("jsonfile");
const jssearch = require("js-search");
const scrape = require("./scrape.js");

const file = "reviews.json";

router.get("/", function(req, res, next) {
  jsonfile.readFile(file, (err, reviews) => {
    if (err) {
      console.log(err);
    }
    let result = new jssearch.Search('The');
    console.log(result);
    res.render("index", { title: "filmsfolded", reviews: reviews, result: result });
  });
});

module.exports = router;
