"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.default = [
    {
        username: 'Admin User',
        email: 'admin@example.com',
        password: bcryptjs_1.default.hashSync('12345678', 10),
        isAdmin: true,
    },
    {
        username: 'User 1',
        email: 'user1@example.com',
        password: bcryptjs_1.default.hashSync('qwertyuiop', 10),
    },
    {
        username: 'User 2',
        email: 'user2@example.com',
        password: bcryptjs_1.default.hashSync('asdfghjkl', 10),
    },
];
