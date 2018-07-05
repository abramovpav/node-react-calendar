const authController = require('./../controllers/auth.ctrl');

module.exports = function(router) {
    router.route('/login')
        .post(authController.login);

    router.route('/signup')
        .post(authController.signup);

    router.route('/logout')
        .post(authController.logout)
        .delete(authController.logout);
};