const HttpError = require('../error').HttpError,
    AuthError = require('../error').AuthError;

module.exports = {
    login: function(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return next(new HttpError(400, 'Provide both username and password'));
        }

        req.db.instance.User.findOne({username: username}, function(err, user) {
            if (err) { return next(err) }
            if (!user) {
                return next(new AuthError('Invalid username'));
            }
            user.checkPassword(password, function(err, valid) {
                if (err) {return next(err);}
                if (valid) {
                    req.session.username  = user.username;
                    return res.send(user.serialize());
                } else {
                    return next(new AuthError('Invalid Password'));
                }
            });
        });
    },
    signup: function(req, res, next) {
        const { username, firstName, lastName, password } = req.body;

        req.db.instance.User.findOne({username: username}, function(err, user) {
            if (err) { return next(err) }

            if (user) {
                return next(new HttpError(400, 'Username already exists'));
            }
            const newUser = new req.db.instance.User({
                username,
                firstName,
                lastName
            });
            newUser.setPassword(password, function(err) {
                if (err) { return next(err) }

                newUser.save(function(err) {
                    if (err) { return next(err) }

                    req.session.username = newUser.username;
                    return res.send(newUser.serialize())
                })
            });
        });
    },
    logout: function(req, res, next) {
        req.session.destroy();
        res.send('');
    }
};
