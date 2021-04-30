"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = exports.ReviewSchema = void 0;
var ts_mongoose_1 = require("ts-mongoose");
exports.ReviewSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string({
        required: true,
    }),
    rating: ts_mongoose_1.Type.string({
        required: true,
    }),
    comment: ts_mongoose_1.Type.string({}),
}, {
    timestamps: true,
});
exports.ReviewModel = ts_mongoose_1.typedModel('Review', exports.ReviewSchema);
