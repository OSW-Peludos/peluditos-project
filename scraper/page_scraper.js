const puppeteer = require('puppeteer'),
    uuidv4 = require('uuid/v4');

function pageScraper(pageNumber) {
    return new Promise((resolve, reject) => {
        let scrape = async () => {
            console.log("[INFO][Peluditos Project][Scraper][Page] Just started page:", pageNumber);
            const url = `http://www.madrid.org/adanweb/html/web/ListadoCompleto.icm?accion_paginacion=${pageNumber}`;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            const result = await page.evaluate(() => {
                const datos = document.querySelectorAll(".txt07gr2 img");
                const animales = [];

                for (let i = 0; i < datos.length; i++) {

                    let imgSrc = datos[i].src;
                    imgSrc = imgSrc.split("valorId=");
                    imgSrc = imgSrc[1].split(",");

                    animales.push({
                        centroAdopcion: imgSrc[0],
                        cdReferencia: imgSrc[1]
                    });

                }
                return animales;

            });

            await browser.close();
            return result;
        };

        scrape().then((values) => {
            // Add UUID
            values.map(item => {
                item.uuid = uuidv4();
                return item;
            });
            
            resolve(values)
            console.log("[INFO][Peluditos Project][Scraper][Page] Just finished page:", pageNumber);
        }).catch(err => {
            console.log("[ERROR][Peluditos Project][Scraper][Page] Error:", pageNumber);
            reject(err)
        });
    })
}


module.exports = pageScraper;