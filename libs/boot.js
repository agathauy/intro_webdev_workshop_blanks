const appRoot = require('app-root-path');

const logger = require(`${appRoot}/libs/logger.js`); // eslint-disable-line


module.exports = (app) => {
    if (process.env.NODE_ENV !== 'test') {
        app.models.index.sequelize.sync({ force: false }).done(() => {

            app.listen(app.get('port'), () => {
                logger.debug(`Node API - Port ${app.get('port')}`);

                logger.debug('testing debug');
                logger.warn('testing warn');
                logger.verbose('testing verbose');

                logger.error('testing error');
                logger.debug(`Node API - Port ${app.get('port')}`);
            });
        });
    }
};
