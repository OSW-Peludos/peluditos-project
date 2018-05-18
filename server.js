const Scheduled = require("scheduled"),
    express = require('express'),
    scraper = require("./scraper/scraper");

const app = express();
const port = process.env.PORT || 3000;

// Middelware
app.use(express.static('public'));

app.set('view engine', 'pug');

/*
    --- Sever Routes ---
*/ 
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/peluditos', (req, res) => {
    console.log("@TODO: Lista de Peluditos");
    res.render('index');
});

app.get('/peludito/:id', (req, res) => {
    console.log("@TODO: Detalles de Peludito:", req.params.id);
    res.render('index');
});


/*
    --- API Routes ---
*/ 

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
 