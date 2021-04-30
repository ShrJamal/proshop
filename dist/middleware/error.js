"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
function notFound(req, res, next) {
    res.status(404);
    next(new Error('EndPoint Not Found - ' + req.originalUrl));
}
exports.notFound = notFound;
function errorHandler(err, _, res, __) {
    var _a;
    console.error(("errorHandler " + err).red.underline);
    res.status(res.statusCode === 200 ? 500 : res.statusCode).json({
        message: (_a = err.message) !== null && _a !== void 0 ? _a : err,
        code: err.code,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}
exports.errorHandler = errorHandler;
