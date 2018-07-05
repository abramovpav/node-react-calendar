const crypto = require('crypto');

function encyptPassword(password, callback) {
    crypto.pbkdf2(password, 'salt', 100000, 512, 'sha512', function (err, hashed) {
        if (err) {
            return callback(err);
        }
        return callback(null, hashed);
    });
}

module.exports = {
    fields: {
        id: {
            type: "uuid",
            default: {"$db_function": "uuid()"}
        },
        username: "text",
        password_hash: "blob",
        firstName: "text",
        lastName: "text",
        created: {
            type: "timestamp",
            default: {"$db_function": "toTimestamp(now())"}
        }
    },
    key: [["username"], "created"],
    clustering_order: {"created": "desc"},
    methods: {
        setPassword: function (password, callback) {
            const that = this;
            encyptPassword(password, function (err, hashed) {
                if (err) {
                    return callback(err);
                }
                that.password_hash = hashed;
                return callback();
            });
        },
        checkPassword: function (password, callback) {
            const that = this;
            encyptPassword(password, function (err, hashed) {
                if (err) {
                    return callback(err);
                }
                return callback(null, hashed.equals(that.password_hash));
            });
        },
        fullName: function() {
            return [this.firstName, this.lastName].join(' ');
        },
        unsafeFields: ['password_hash'],
        serialize: function() {
            let json_repr = this.toJSON();
            this.unsafeFields.forEach(function(fieldName) {
                delete json_repr[fieldName];
            });

            return json_repr;
        }
    }
};
