const checkAuth = require('./../middleware/checkAuth'),
    eventsController = require('./../controllers/events.ctrl');


module.exports = function(router) {
    router.route('/events')
        .get(checkAuth, eventsController.getAll)
        .post(checkAuth, eventsController.addEvent);

    router.route('/events/:eventId')
        .delete(checkAuth, eventsController.deleteEvent)
};