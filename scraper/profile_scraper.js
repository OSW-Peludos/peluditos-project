const puppeteer = require('puppeteer');

function profileScraper(data) {
    return new Promise((resolve, reject) => {

        let {
            cdReferencia,
            uuid,
            centroAdopcion
        } = data;
        let scrape = async () => {

            console.log("[INFO][Peluditos Project][Scraper][Profile] Just started:", uuid);
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // @see: https://stackoverflow.com/a/49385769
            await page.setRequestInterception(true);

            page.on('request', interceptedRequest => {

                var data = {
                    'method': 'POST',
                    'postData': `centroAdopcion=${centroAdopcion}&cdReferencia=${cdReferencia}`
                };
                interceptedRequest.continue(data);
            });

            await page.setExtraHTTPHeaders({
                "Content-Type": "application/x-www-form-urlencoded"
            }, );

            // Navigate, trigger the intercept, and resolve the response
            await page.goto('http://www.madrid.org/adanweb/html/web/AnimalDetalle.icm');
            const result = await page.evaluate(() => {
                const datos = document.querySelectorAll(".txt08gr1:not(strong)");
                //const animal = [];
                const animalData = {
                    picture: document.querySelector("#main").src
                };

                for (let i = 0; i < datos.length; i++) {
                    const rawText = datos[i].innerText.split(": ");

                    // Custom description
                    if (i === 5) {
                        rawText[1] = rawText[0];
                        rawText[0] = "description"

                    } else {
                        const spanishWords = ["referencia", "nombre", "raza", "sexo", "edad aproximada", "peso", "color del pelo", "tipo de pelo", "tamaño", "carácter"];
                        const propertiesList = ["adopta_ref", "name", "race", "gender", "age", "weight", "hair_color", "hair_type", "size", "kind"]
                        const matchValue = spanishWords.indexOf(rawText[0].toLowerCase());
                        if (matchValue !== -1) {
                            rawText[0] = propertiesList[matchValue];
                        }
                    }

                    //Ignore animal shelter or other extra fields
                    if (i <= 10) {
                        animalData[rawText[0]] = rawText[1];
                    }
                }
                return animalData;
            });

            await browser.close();
            return result;
        };

        scrape().then((profileData) => {
            // Added Extra values
            profileData.id = uuid;
            profileData.adopta_ref = `CM:${centroAdopcion}:${cdReferencia}:${profileData.adopta_ref}`;
            console.log("[INFO][Peluditos Project][Scraper][Profile] Ended with success:", uuid);
            resolve(profileData);

        }).catch(err => {
            console.log("[ERROR][Peluditos Project][Scraper][Profile] error:", uuid);
            reject(err)
        });
    })
}


module.exports = profileScraper;