const checkAuth = require('./../middleware/checkAuth'),
    usersController = require('./../controllers/users.ctrl');

module.exports = function(router) {
    router.route('/user')
        .get(checkAuth, usersController.getCurrenUser);

    router.route('/template')
        .get(function(req, res, next) {
            res.render('index', {user: req.user});
        });
};
