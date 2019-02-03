const scrapeIt = require("scrape-it");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ reviews: [] }).write();

const scrape = (paginationKey, loadAll) => {
  const url =
    "https://www.imdb.com/user/ur0643062/reviews/_ajax?sort=alphabeticalTitle&dir=desc";
  scrapeIt(`${url}&paginationKey=${paginationKey}`, {
    reviews: {
      listItem: ".lister-item",
      data: {
        movie: ".lister-item-header a",
        heading: ".lister-item-content .title",
        date: ".display-name-date",
        content: ".text",
        id: {
          attr: "data-review-id"
        }
      }
    },
    loadMoreData: {
      selector: ".load-more-data",
      attr: "data-key"
    }
  }).then(({ data, response }) => {
    data.reviews.map(r => {
      db.get("reviews")
        .push(r)
        .write();
    });
    if (data.loadMoreData && loadAll && reviews.length < 100) {
      scrape(data.loadMoreData, true);
    }
  });
};
// scrape("", false);
module.exports = scrape;
