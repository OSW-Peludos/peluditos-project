const Scheduled = require("scheduled"),
    express = require('express'),
    scraper = require("./scraper/scraper");

const app = express();
const port = process.env.PORT || 3000;

// Middelware
app.use(express.static('public'));

app.set('view engine', 'pug');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});


app.listen(port, () => {
  console.log('[info][server] listening on port:', port);
});

const scraperJob = new Scheduled({
    id: "scraperJob",
    pattern: "30 01", // 01:30 everyday
    task: () => {
        console.log("[INFO][Peluditos Project][CRON] Scraper started");
        scraper();
    }
}).start();
 