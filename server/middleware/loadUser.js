const log = require('libs/logger')(module);

module.exports = function (req, res, next) {
    const username = req.session.username;
    log.debug(`session.username '${username}'`);

    if (!username) {
        req.user = null;
        return next();
    }
    req.db.instance.User.findOne({username}, function(err, user) {
        if (err) return next(err);

        if (user) {
            req.user = user;
        } else {
            req.user = null;
        }
        next();
    });
};