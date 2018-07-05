const app = require('../app'),
    config = require('config'),
    log = require('libs/logger')(module);

app.listen(config.get('server:port'), () => {
    log.info(`Server started at port: ${config.get('server:port')}`);
});


app.on('error', onError);

function onError(error) {
    log.debug('http server error handler');
    if (error.syscall !== 'listen') {
        log.error(error);
        return;
    }
    const port = config.get('port');

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            log.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            log.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}