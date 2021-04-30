"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.ProductSchema = void 0;
var ts_mongoose_1 = require("ts-mongoose");
var review_1 = require("./review");
exports.ProductSchema = ts_mongoose_1.createSchema({
    user: ts_mongoose_1.Type.objectId({
        required: true,
        ref: 'User',
    }),
    name: ts_mongoose_1.Type.string({ required: true }),
    image: ts_mongoose_1.Type.string({ required: true }),
    description: ts_mongoose_1.Type.string({ required: true }),
    price: ts_mongoose_1.Type.number({ required: true }),
    brand: ts_mongoose_1.Type.string({ required: true }),
    category: ts_mongoose_1.Type.string({ required: true }),
    countInStock: ts_mongoose_1.Type.number({ required: true }),
    rating: ts_mongoose_1.Type.number({}),
    numReviews: ts_mongoose_1.Type.number({ default: 0 }),
    reviews: ts_mongoose_1.Type.array({ default: [] }).of(review_1.ReviewSchema),
});
exports.ProductModel = ts_mongoose_1.typedModel('Product', exports.ProductSchema);
