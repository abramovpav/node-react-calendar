const eventsRouter = require('./events'),
    usersRouter = require('./users'),
    authRouter = require('./auth');

module.exports = function(router) {
    eventsRouter(router);
    usersRouter(router);
    authRouter(router);
};