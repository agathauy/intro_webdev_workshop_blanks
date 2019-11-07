// import fs from "fs";
// import winston from "winston";
const fs = require('fs');
const winston = require('winston');
const { format } = require('winston');
const {combine, timestamp, label, printf} = winston.format;

const config = winston.config;
const moment = require('moment');

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

/*
module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: 'logs/app.log',
            maxsize: 5242880,
            maxFiles: 10,
            colorize: false,
            timestamp: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],

    exitOnError: false
});
*/
/*
const formatParams = (info) => {
    const {
    timestamp, level, message, ...args
    } = info;
    const ts = timestamp.slice(0, 19).replace('T', ' ');

    return `${ts} ${level}: ${message} ${Object.keys(args).length
      ? JSON.stringify(args, '', '')
      : ''}`;
  };
*/
/*



*/


const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
    },
    colors: {
        error: 'red',
        warn: 'magenta',
        info: 'green',
        verbose: 'cyan',
        debug: 'yellow',
        silly: 'magenta'
    }
};

winston.addColors(customLevels.colors);

const formatParams = (info) => {
    const {
        timestamp,
        level,
        message,
        ...args
    } = info;
    // const ts = timestamp.slice(0, 19).replace('T', ' ');
    let new_timestamp = moment(timestamp).format();
    // console.log(new_timestamp);
    // console.log(level)

    // if (args.colorize == true) {
    //     return new_timestamp + config.colorize(level, ` [${level.toUpperCase()}]: ${message}`);
    // }
    return `${new_timestamp} [${level}]: ${message}`;

};

// const formatParams = (info) => {
//     const {
//     timestamp, level, message, ...args
//     } = info;
//     const ts = timestamp.slice(0, 19).replace('T', ' ');

//     return `${ts} ${level}: ${message} ${Object.keys(args).length
//       ? JSON.stringify(args, '', '')
//       : ''}`;
//   };


const developmentFormat = format.combine(
    format.colorize({ all: true }),
    format.timestamp(),
    //format.align(),
    format.printf(formatParams)
);

const productionFormat = format.combine(
    format.timestamp(),
    //format.align(),
    format.printf(formatParams)
);

const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.File({ // For morgan logs
            format: developmentFormat,
            
            //formatter: formatParams,
            name: 'file#info',
            level: 'info',
            filename: 'logs/app.log',
            maxsize: 5242880,
            json: false

        }),
        new winston.transports.File({ // For debug msgs
            format: developmentFormat,
            //formatter: formatParams,
            name: 'file#debug',
            level: 'debug',
            maxsize: 5242880,
            filename: 'logs/debug.log',
            json: false

        }),
        new winston.transports.Console({
            format: developmentFormat,
            // timestamp: () => {
            //     return moment().format();
            // },
            //formatter: formatParams,
            handleExceptions: true,
            level: 'debug',
            colorize: true,
            json: false,
            humanReadableUnhandledException: true,
        }),

    ],
    exceptionHandlers: [
        new winston.transports.File({ // For unhandled exception
            // format: productionFormat,
            timestamp: () => {
                return moment().toISOString();
            },
            formatter: formatParams,
            filename: 'logs/exceptions.log',
            prettyPrint: true,
            maxsize: 5242880,
            json: false
        })
    ],
    exitOnError: true
});

module.exports = logger;
