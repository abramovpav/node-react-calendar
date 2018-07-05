const winston = require('winston'),
    ENV = process.env.NODE_ENV;

function getLogger(module) {
    var path = module.filename.split('/').slice(-2).join('/');

    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: ENV === 'development' ? 'debug' : 'error',
                label: path,
                handleExceptions: true,
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple(),
                )
            })
        ]
    });
}


module.exports = getLogger;