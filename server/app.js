const path = require('path'),
    express = require("express"),
    createError = require('http-errors'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    helmet = require('helmet'),
    logger = require('morgan'),
    favicon = require('express-favicon');

const routes = require('./routes'),
    log = require('libs/logger')(module),
    AuthError = require('error').AuthError,
    HttpError = require('error').HttpError,
    insertDB = require('middleware/insertDB'),
    loadUser = require('middleware/loadUser'),
    session = require('middleware/session');

const app = express();
const router = express.Router();

// apply Middlewares

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
app.use(cookieParser());
app.use(session);
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(insertDB);
app.use(loadUser);
routes(router);

app.use('/api', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(new HttpError(404));
});

// error handler
app.use(function (err, req, res, next) {
    log.debug('app error handler');
    log.error(err);

    const responseBody = {
        message: err.message,
        status: err.status || 500
    };
    if (err instanceof AuthError) {
        responseBody.status = 401;
    }

    res.status(responseBody.status).send(responseBody);
});

module.exports = app;
