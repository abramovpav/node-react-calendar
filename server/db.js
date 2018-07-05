var path = require('path');
var db = require('express-cassandra');
var config = require('./config');
var DBError = require('./error').DBError;
var log = require('libs/logger')(module);

db.setDirectory(path.join(__dirname,'models')).bind(
    {
        clientOptions: {
            contactPoints: config.get('server:db:contactPoints'),
            protocolOptions: config.get('server:db:protocolOptions'),
            keyspace: config.get('server:db:keyspace'),
            queryOptions: {consistency: db.consistencies.one}
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'drop'
        }
    },
    function(err) {
        if (err) throw new DBError(err.message);

        log.info('DB ready');
        // You'll now have a `person` table in cassandra created against the model
        // schema you've defined earlier and you can now access the model instance
        // in `models.instance.Person` object containing supported orm operations.
        //
        // var user = new db.instance.User({
        //     username: "admin",
        //     firstName: "John",
        //     lastName: "Doe",
        // });
        //
        // user.save({if_not_exist: true}, function(err){
        //     if(err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log('created');
        //     // log.debug('Yuppiie!', arguments);
        // });
    }
);



module.exports = db;