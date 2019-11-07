const appRoot = require('app-root-path');

const logger = require(`${appRoot}/libs/logger.js`); // eslint-disable-line


module.exports = (app) => {
    logger.debug('controller: z invalid');
    // invalid route handling
    app.get('*', (req, res, next) => {
        const err = new Error();
        err.link = req.originalUrl;
        err.path = req.path;

        logger.debug(`link: ${err.link}`);
        logger.debug(`path: ${err.path}`);
        logger.debug(`url: ${req.url}`);
        err.status = 404;
        err.message = 'The resource you are trying to access does not exist.';
        err.code = 'not_found';
        next(err);
    });


    /*
      Error middleware
      - gets triggered upon `throw new Error()`
      - also gets triggered by next(err)
    */
    if (app.get('env') === 'development') {
        app.use((err, req, res, next) => {
            logger.error('[z_invalid]');
            logger.error(JSON.stringify(err, null, 4));

            err.link = req.originalUrl;
            err.path = req.path;

            logger.debug(`link: ${err.link}`);
            logger.debug(`path: ${err.path}`);
            logger.debug(`url: ${req.url}`);
            logger.debug(`body:`);
            logger.debug(JSON.stringify(req.body, null, 4));


            if (err.stack === null) {
                // no stack message was sent
                err.stack = 'No stack info has been provided';
            }

            // No error message provided
            if (err.message == null || err.message === '') {
                switch (err.status) {
                    case 400:
                        err.message = 'You have made an invalid request.';
                        break;
                    case 401:
                        err.message = 'Please login to continue.';
                        break;

                    case 403:
                        err.message = 'You are not authorized to access this.';
                        break;

                    case 404:
                        err.message = 'The resource you are trying to access does not exist.';
                        break;

                    case 500:
                        err.message = 'The server encountered an unexpected error.';
                        break;

                    default:
                        // no error status provided
                        err.status = 500;
                        err.message = 'An error has occured.';
                        err.code = 'server_error';
                }

            }

            // No error code provided
            if (err.code == null || err.code === '') {
                switch (err.status) {
                    case 400:
                        err.code = 'bad_request';
                        break;
                    case 401:
                        err.code = 'unauthenticated';
                        break;

                    case 403:
                        err.code = 'unauthorized';
                        break;

                    case 404:
                        err.code = 'not_found';
                        break;

                    case 500:
                        err.code = 'server_error';
                        break;

                    default:
                        // no error status provided
                        err.status = 500;
                        err.message = 'An error has occured.';
                        err.code = 'server_error';
                }

            }

            res.status(err.status);
            res.json({
                stack: err.stack,
                message: err.message,
                code: err.code,
                status: err.status,
                link: err.link,
                path: err.path
            });
        });

    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res, next) => {
        err.link = req.originalUrl;
        err.path = req.path;

        logger.debug(`link: ${err.link}`);
        logger.debug(`path: ${err.path}`);
        logger.debug(`url: ${req.url}`);
        logger.debug(JSON.stringify(req.body, null, 4));

        // No error message provided
        if (err.message == null || err.message === '') {
            switch (err.status) {
                case 400:
                    err.message = 'You have made an invalid request.';
                    break;
                case 401:
                    err.message = 'Please login to continue.';
                    break;

                case 403:
                    err.message = 'You are not authorized to access this.';
                    break;

                case 404:
                    err.message = 'The resource you are trying to access does not exist.';
                    break;

                case 500:
                    err.message = 'The server encountered an unexpected error.';
                    break;

                default:
                    // no error status provided
                    err.status = 500;
                    err.message = 'An error has occured.';
                    err.code = 'server_error';
            }

        }

        // No error code provided
        if (err.code == null || err.code === '') {
            switch (err.status) {
                case 400:
                    err.code = 'bad_request';
                    break;
                case 401:
                    err.code = 'unauthenticated';
                    break;

                case 403:
                    err.code = 'unauthorized';
                    break;

                case 404:
                    err.code = 'not_found';
                    break;

                case 500:
                    err.code = 'server_error';
                    break;

                default:
                    // no error status provided
                    err.status = 500;
                    err.message = 'An error has occured.';
                    err.code = 'server_error';
            }

        }
        res.status(err.status);
        res.json({
            message: err.message,
            code: err.code,
            status: err.status,
            link: err.link,
            path: err.path
        });
    });

    logger.debug('end of routes/z_invalid');
};