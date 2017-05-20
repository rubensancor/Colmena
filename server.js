/* Get the dependencies */
const express = require('express');
const expressLayouts = require('express-ejs-layouts'); // add this requirement
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');

/* Get the api route */
const api = require('./public/routes/api');

const app = express();

/*CORS -> Politica de aceptacion o denegacion de servicio a diferentes redes. */
app.use(cors());
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

/* Point static path to public */
app.use(express.static(path.join(__dirname, 'public')));

/* Set our api routes */
app.use('/', api);

/**
 * Do not touch
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Colmena running on localhost:${port}`));
