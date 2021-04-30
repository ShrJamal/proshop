"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var ts_mongoose_1 = require("ts-mongoose");
var UserSchema = ts_mongoose_1.createSchema({
    username: ts_mongoose_1.Type.string({
        required: true,
    }),
    email: ts_mongoose_1.Type.string({
        required: true,
        unique: true,
    }),
    password: ts_mongoose_1.Type.string({
        required: true,
    }),
    isAdmin: ts_mongoose_1.Type.boolean({
        required: false,
        default: false,
    }),
}, {
    timestamps: true,
});
exports.UserModel = ts_mongoose_1.typedModel('User', UserSchema);
