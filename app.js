// const createError = require("http-errors");
// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const scrape = require("./scrape");
// const port = 3001;
// const app = express();

// app.use(function(req, res, next) {
//   // scrape("", false);
// });

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// module.exports = app;

const indexRouter = require("./routes/index");
const searchRouter = require("./routes/search");

const express = require("express");
const app = express();
const port = 3000;

const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use("/", indexRouter);
app.use("/search", searchRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
