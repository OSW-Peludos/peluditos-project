const Scheduled = require("scheduled"),
    express = require('express'),
    helmet = require('helmet'),
    scraper = require("./scraper/scraper");

const app = express();

const port = process.env.PORT || 3000;

// Middelware
app.use(helmet());
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

app.get('/api/peludito', (req, res) => {
    let msg = "@TODO: Lista de Peluditos via API";
    console.log(msg);
    res.send(msg);
});

app.post('/api/peludito', (req, res) => {
    let msg = "@TODO: Añadir un nuevo peludito via API";
    console.log(msg);
    res.send(msg);
});

app.get('/api/peludito/:id', (req, res) => {
    let msg = "@TODO: Detalles de un peludito via API";
    console.log(msg);
    res.send(msg);
});

app.put('/api/peludito/:id', (req, res) => {
    let msg = "@TODO: Actualizar los detalles de un peludito via API";
    console.log(msg);
    res.send(msg);
});

app.delete('/api/peludito/:id', (req, res) => {
    let msg = "@TODO: Eliminar un peludito via API";
    console.log(msg);
    res.send(msg);
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
 