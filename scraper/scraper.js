const pageScraper = require("./page_scraper"),
    profileScraper = require("./profile_scraper"),
    puppeteer = require('puppeteer'),
    db = require("../db/database"),
    fs = require("fs");

function totalTime(origin){
    const diffMs = (new Date() - origin); // milliseconds between now & origin
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return `Execution in total: ${diffDays} days, ${diffHrs} hours and ${diffMins} minutes`;
}

console.log("[INFO][Peluditos Project][Scraper] Starting now....");
const startTime = new Date(); 

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
    console.log("[INFO][Peluditos Project][Scraper] Total pages to scrap for pagination:", totalPages);
    let paginationData = [];
    
    (async () => {
        for(let i = 1; i <= totalPages; i++){
            let page = await pageScraper(i);
            paginationData.push(page);
        }
        const cleanData = [].concat(...paginationData);

        fs.writeFileSync("data/pagination.json", JSON.stringify(cleanData));
        console.log("[INFO][Peluditos Project][Scraper] Ended with Pagiantion. File saved in ./data/pagination.json");
        console.log(`[INFO][Peluditos Project][Scraper] We discovered ${cleanData.length} Animals in total. Profile details extraction is about to start...`);
        
        for (var i = 0; i < cleanData.length; i++) {
            const item = cleanData[i];
            let animal = await profileScraper(item);
            fs.writeFileSync(`data/${item.uuid}.json`, JSON.stringify(animal));
            console.log("[INFO][Peluditos Project][Scraper] Added to file:", item.uuid);
            await db.addAnimal(animal);
            console.log("[INFO][Peluditos Project][Scraper] Added to database:", item.uuid);
        }
        console.log("[INFO][Peluditos Project][Scraper] Ended sucesfully. All data is now in the database");
        console.log("[INFO][Peluditos Project][Scraper]", totalTime(startTime));
    })();

}).catch(console.log);



    
    

