const util = require('util'),
    http = require('http');

function HttpError (status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
}

util.inherits(HttpError, Error);

HttpError.prototype.name = 'HttpError';


function DBError (message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, DBError);
    this.message = message || "DBError";
}

util.inherits(DBError, Error);

DBError.prototype.name = 'DBError';


function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message || "AuthError";
}

util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.HttpError = HttpError;
exports.DBError = DBError;
exports.AuthError = AuthError;