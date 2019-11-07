const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const logger = require('./logger.js');

const appRoot = require('app-root-path');

const env = process.env.NODE_ENV || 'development';

const config = require(`${appRoot}/config/config.json`)[env]; // eslint-disable-line



module.exports = (app) => {



    const port = process.env.PORT || 50000;
    app.set('port', port);

    app.set('json spaces', 4);
    app.use(morgan('common', {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));
    app.use(helmet());
    /*
    app.use(cors({
        origin: ["http://localhost:3002"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    */
    app.use(cors());
    app.use(compression());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    /*
         For making sure that an "id" is not modiifed
    */
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
    logger.debug('end of middlewares');

    // Set View engine
    app.set('views', `${appRoot}` + '/views');
    app.set('view engine', 'jsx');
    app.engine('jsx', require('express-react-views').createEngine());


    app.use(express.static('public'));
};
