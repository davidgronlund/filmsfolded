var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  let reviews = req.app.locals.reviews;
  let search = req.app.locals.search;
  res.render("index", {
    title: "filmsfolded",
    reviews: reviews
  });
});

module.exports = router;
