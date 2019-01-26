var express = require("express");
var router = express.Router();
var jsonfile = require("jsonfile");

const file = "reviews.json";

/* GET users listing. */
router.get("/", function(req, res, next) {
  jsonfile.readFile(file)
    .then(reviews => res.send(reviews))
    .catch(error => console.error(error));

    
});

module.exports = router;
