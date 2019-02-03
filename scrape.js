const scrapeIt = require("scrape-it");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ reviews: [] }).write();

let count = 0;
const scrape = (paginationKey, loadAll) => {
  const url = "https://www.imdb.com/user/ur0643062/reviews/_ajax";
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
    count += data.reviews.length;
    console.log(count);
    if (data.loadMoreData && loadAll && count.length < 100) {
      scrape(data.loadMoreData, true);
    }
  });
};
scrape("", true);
module.exports = scrape;
