const validator = require('validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const appRoot = require('app-root-path');
const logger = require(`${appRoot}/libs/logger.js`); // eslint-disable-line

const moment = require('moment');

module.exports = (app) => {
    const controller = {};

    controller.note_post = (req, res, next) => {
       

    }



    return controller;

}