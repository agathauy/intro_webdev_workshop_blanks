const express = require('express');
const consign = require('consign');
const path = require('path');

const app = express();

consign()
    .then('./models/index.js')
    .then("./libs/middlewares.js")
    .then('./controllers')
    .then('./routes')
    .then("./libs/boot_init.js")
    .into(app);

module.exports = app;