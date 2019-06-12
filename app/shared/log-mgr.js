///////////////////////////////////////////////////////////////
// Module Dependencies
///////////////////////////////////////////////////////////////
let winston = require('winston');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

let logger  = null;

/**
 * Available log levels
 * { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 */
///////////////////////////////////////////////////////////////
// Public Methods
///////////////////////////////////////////////////////////////
module.exports = {
    init: function() {
        logger = winston.createLogger({
            level: process.env.LOG_LEVEL,
            // format: combine(
            //     label({ label: process.env.SERVER_ID }),
            //     timestamp(),
            //     myFormat
            // ),

            // format: winston.format.json(),
            transports: [
                new (winston.transports.Console)({
                    'colorize': 'all',
                    'level': process.env.LOG_LEVEL,
                    'timestamp': true
                }),
                new (winston.transports.File)({ filename: 'logs/app.log' })
            ]
        });
    },

    /**
     * Generates and returns the logger instance if not available.
     *
     * { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
     *
     * @returns logger instance
     */
    logger: function() {
        if (logger)
            return logger;
        else {
            logger = winston.createLogger({
                level: process.env.LOG_LEVEL,
                // format: winston.format.json(),
                // format: combine(
                //     label({ label: process.env.SERVER_ID }),
                //     timestamp(),
                //     myFormat
                // ),
                transports: [
                    new (winston.transports.Console)({
                        'colorize': 'all',
                        'level': process.env.LOG_LEVEL,
                        // 'level': 'debug',
                        'timestamp': true
                    }),
                    new (winston.transports.File)({ filename: 'logs/app.log' })
                ]
            });
            logger.exitOnError = false;

            return logger;
        }
    }

};
