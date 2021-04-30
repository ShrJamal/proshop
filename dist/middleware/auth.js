"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    try {
        var token = '';
        var authorization = req.header('Authorization');
        if (authorization === null || authorization === void 0 ? void 0 : authorization.startsWith('Bearer')) {
            token = authorization.split(' ')[1];
        }
        if (!token)
            throw new Error('No Authorization no Token');
        var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body._id = decoded._id;
        next();
    }
    catch (err) {
        res.status(401);
        next(err);
    }
}
exports.authMiddleware = authMiddleware;
