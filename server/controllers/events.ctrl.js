const moment = require('moment'),
    log = require('libs/logger'),
    HttpError = require('../error').HttpError;


function validateDateRange(startDate, endDate) {
    const start = moment(startDate);
    const end = moment(endDate);
    const startLessEnd = startDate < endDate;
    const isValidTimeRange = end.isBetween(moment(start).startOf('day'), moment(start).endOf('day'));
    return startLessEnd && isValidTimeRange;
}


module.exports = {
    addEvent: function (req, res, next) {
        const reqData = req.body;
        const username = req.user.username;

        const {startTime, endTime} = reqData;
        if (!validateDateRange(startTime, endTime)) {
            return next(new HttpError(400, 'Invalid dates'));
        }

        const event = new req.db.instance.Event({
            id: [username, req.db.uuid().toString()].join('__'),
            ...reqData,
            owner: req.user.username
        });

        event.save(function (err) {
            if (err) {
                return next(err)
            }

            req.db.instance.User2Event.update({username: username}, {'events': {'$append': [event.id]}}, function (err) {
                if (err) {
                    event.delete(function (_err) {
                        if (_err) log.error(_err);
                        return next(err);
                    });
                } else {
                    return res.send(event.serialize());
                }
            });
        });
    },
    deleteEvent: function (req, res, next) {
        const {eventId} = req.params;
        const username = req.user.username;

        req.db.instance.Event.findOne({id: eventId}, function (err, event) {
            if (err) { return next(err) }

            if (!event || event.owner !== username) {
                return next(new HttpError(404));
            } else {
                req.db.instance.User2Event.update({username: username}, {'events': {'$remove': [event.id]}}, function (err) {
                    if (err) { return next(err) }

                    event.delete(function(err) {
                        if (err) { return next(err) }
                        return res.send({
                            id: event.id,
                            deleted: true
                        });
                    });
                });
            }
        });
    },
    getAll: function (req, res, next) {
        req.db.instance.User2Event.findOne({username: req.user.username}, function (err, user2events) {
            if (err) return next(err);
            if (!user2events || !user2events.events.length) {
                res.send([]);
            } else {
                req.db.instance.Event.find({id: {'$in': user2events.events}}, function (err, events) {
                    if (err) {
                        return next(err)
                    }

                    if (!events) {
                        res.send([]);
                    } else {
                        return res.send(events);
                    }
                });
            }
        });
    }
};