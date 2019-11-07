'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const appRoot = require('app-root-path');

const logger = require(`${appRoot}/libs/logger.js`); // eslint-disable-line

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env]; // eslint-disable-line
let db = {};

module.exports = (app) => {
  logger.debug('in Index of models');

  let sequelize = null;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  db = {
    sequelize,
    Sequelize,
    models: {},
  };
  sequelize
    .authenticate()
    .then(() => {
        logger.debug('Connection has been established successfully.');
    })
    .catch((err) => {
        logger.error(`Unable to connect to the database: ${err}`);
    });
  
  fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db.models[model.name] = model;
    });

  Object.keys(db.models).forEach((modelName) => {
    if (db.models[modelName].associate) {
        logger.debug('in associate');
        logger.debug(modelName);
        db.models[modelName].associate(db.models);
    }
  });

  return db;
}

