const pageScraper = require("./page_scraper"),
    puppeteer = require('puppeteer');

const paginationScraper = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.madrid.org/adanweb/html/web/ListadoCompleto.icm');
    const result = await page.evaluate(() => {
        //@Ulises: Refactor next release :troll:
        return document.querySelector("#areAplicacion > div:nth-child(2) > table > tbody > tr > td > div > a:nth-child(21)").getAttribute("onclick").split("'")[1];
    });

    await browser.close();
    return result;
};


paginationScraper().then((totalPages) => {
    console.log("TotalPages:", totalPages)
    const paginationData = [];
    
    (async () => {
        for(let i = 0; i <= totalPages; i++){
            let page = await pageScraper(i);
            paginationData.push(page);
        }
    })();
}).catch(console.log);



    
    

