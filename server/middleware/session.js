const config = require('config');
const session = require('express-session');
const CassandraStore = require("cassandra-session-store");

module.exports = session({
    secret: config.get('server:session:secret'),
    key: config.get('server:session:key'),
    resave: false,
    saveUninitialized: false,
    store: new CassandraStore({
        table: [config.get('server:db:keyspace'), "sessions"].join('.'),
        client: null, // an existing cassandra client
        clientOptions: { // more https://github.com/datastax/nodejs-driver
            contactPoints: config.get('server:db:contactPoints'),
            protocolOptions: config.get('server:db:protocolOptions'),
            keyspace: config.get('server:db:keyspace')
        }
    }),
});