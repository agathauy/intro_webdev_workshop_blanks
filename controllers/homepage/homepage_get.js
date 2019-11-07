
const appRoot = require('app-root-path');
const logger = require(`${appRoot}/libs/logger.js`); // eslint-disable-line


module.exports = (app) => {

    const controller = {};

    controller.homepage_get = (req, res, next) => {
        //let entries = [];

        const models = app.models.index.models;
        const Note = models.Note;

        logger.debug('In Note');

        Note.findAll({}, {})
        .then((results) => {
            //console.log();

            let entries = JSON.parse(JSON.stringify(results, null, 4));
            logger.debug(entries);
            return res.status(200).render('homepage', { entries: entries });
        })
        .catch((error) => {

            // Not an error manually created as API response
            if (!('status' in error)) {
                const err = new Error();
                if (typeof error === 'object') {
                    err.stack = error.stack;
                    err.message = error.message;
                } else {
                    err.stack = error;
                }
                err.status = 500;
                return next(err);
            }
            return next(error);
        });




    };

    return controller;

};