const appRoot = require('app-root-path');

const logger = require(`${appRoot}/libs/logger.js`); // eslint-disable-line


module.exports = (app) => {
    if (process.env.NODE_ENV !== 'test') {
        app.models.index.sequelize.sync({ force: true }).done(() => {


            /*
                Insert prepopulation script/etc
            */
           //const file_name = 'prepop_script_19-11-07.js';

           //const init_data = require(`${appRoot}/prepopulate/${file_name}`)(app);

            app.listen(app.get('port'), () => {
                logger.debug(`INIT DATA - Port ${app.get('port')}`);

                logger.debug('testing debug');
                logger.warn('testing warn');
                logger.verbose('testing verbose');

                logger.error('testing error');
                logger.debug(`Node API - Port ${app.get('port')}`);
            });
        });
    }
};
