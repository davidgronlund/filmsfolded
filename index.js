const scrapeIt = require("scrape-it")

let reviews = [];

function scrapeAllOnce(paginationKey) {
    const url = "https://www.imdb.com/user/ur0643062/reviews/_ajax?sort=alphabeticalTitle&dir=desc";
    scrapeIt(`${url}&paginationKey=${paginationKey}`, {
        reviews: {
            listItem: ".lister-item",
            data: {
                title: ".lister-item-header a",
                heading: ".lister-item-content .title",
                date: ".display-name-date",
                content: ".text",
            }
        },
        loadMoreData: {
            selector: ".load-more-data",
            attr: "data-key" 
        }
    }).then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`);
        reviews = reviews.concat(data.reviews);
        if(data.loadMoreData) {
            scrapeData(data.loadMoreData);
        }
        console.log(reviews.length);
    })    
}

scrapeAllOnce("");