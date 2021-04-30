"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileValidation = exports.loginValidation = exports.signupValidation = void 0;
var joi_1 = __importDefault(require("joi"));
function signupValidation(value) {
    var schema = joi_1.default.object({
        username: joi_1.default.string().alphanum().min(3).max(30).required(),
        email: joi_1.default.string()
            .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
            .required(),
        password: joi_1.default.string().min(6).max(30).required(),
    });
    return schema.validate(value, { allowUnknown: true });
}
exports.signupValidation = signupValidation;
function loginValidation(value) {
    var schema = joi_1.default.object({
        email: joi_1.default.string()
            .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
            .required(),
        password: joi_1.default.string().min(6).max(30).required(),
    });
    return schema.validate(value, { allowUnknown: true });
}
exports.loginValidation = loginValidation;
function profileValidation(value) {
    var schema = joi_1.default.object({
        username: joi_1.default.string().alphanum().min(3).max(30),
        password: joi_1.default.string().min(6).max(30),
    });
    return schema.validate(value, { allowUnknown: true });
}
exports.profileValidation = profileValidation;
