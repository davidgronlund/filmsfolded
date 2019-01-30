const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const scrape = require("./scrape");
const jsonfile = require("jsonfile");
const indexRouter = require("./routes/index");
const jssearch = require("js-search");
const file = "reviews.json";


const app = express();
let search;

const getReviews = () => {
  jsonfile.readFile(file, (err, reviews) => {
    if (err) {
      console.log(err);
    }
    app.locals.reviews = reviews;
  });
};

app.use(function(req, res, next) {
  scrape("", false);
  getReviews();
});


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});




const createIndex = reviews => {
  search = new jssearch.Search("movie");
  search.addIndex("heading");
  search.addIndex("date");
  search.addIndex("content");
  search.addIndex("id");
  search.addDocuments(app.locals.reviews);
  return search;
};

//app.locals.search = createIndex();

module.exports = app;
