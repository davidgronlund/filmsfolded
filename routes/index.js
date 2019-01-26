var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  let search = req.app.get("search");

  let result = search.search("The");
  console.log(...result);
  res.render("index", {
    title: "filmsfolded",
    reviews: reviews,
    result: result
  });
});

module.exports = router;
