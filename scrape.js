const scrapeIt = require("scrape-it");
const jsonfile = require("jsonfile");
const jssearch = require("js-search");

const file = "reviews.json";

let reviews = [];

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
    reviews = reviews.concat(data.reviews);
    if (data.loadMoreData && loadAll && reviews.length < 100) {
      scrape(data.loadMoreData, true);
    } else {
      save(reviews);
    }
    console.log(reviews.length);
  });
  createIndex(reviews);
}

const createIndex = reviews => {
  var search = new jssearch.Search('movie');
  search.addIndex('heading');
  search.addIndex('date');
  search.addIndex('content');
  search.addIndex('id');
  search.addDocuments(reviews);
};

const save = reviews => {
  if (reviews) {
    jsonfile.writeFile(file, reviews, err => {
      console.log(err);
    });
  }
};

module.exports = scrape;