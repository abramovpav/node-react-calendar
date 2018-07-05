module.exports = {
    getCurrenUser: function(req, res, next) {
        return res.send(req.user.serialize());
    },

    getAll: function(req, res, next) {
        req.db.instance.User.find({}, function(err, users) {
            if (err) { return next(err) }

            if (!users) {
                res.send([]);
            } else {
                return res.send(users.map(function(user) {
                    return user.serialize();
                }));
            }
        });
    }
};