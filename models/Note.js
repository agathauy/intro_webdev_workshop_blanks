
const appRoot = require('app-root-path');
const logger = require(`${appRoot}/libs/logger.js`); // eslint-disable-line


module.exports = (sequelize, DataType) => {
    logger.debug('in Note model');
    const Note = sequelize.define('Note', {

    }, {
        underscored: true
    });

    return Note;

};
