const express = require('express');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

const mountRoutes = require('./routes');

const app = express();
const port = 8080;

app.use(bodyParser.json());

mountRoutes(app, db);

app.listen(port, function() {
  console.log(`\n=== API up on port: ${port} ===\n`);
});
