"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.OrderSchema = void 0;
var ts_mongoose_1 = require("ts-mongoose");
exports.OrderSchema = ts_mongoose_1.createSchema({
    user: ts_mongoose_1.Type.objectId({
        required: true,
        ref: 'User',
    }),
    orderItems: ts_mongoose_1.Type.array({
        required: true,
    }).of({
        name: ts_mongoose_1.Type.string({ required: true }),
        quatity: ts_mongoose_1.Type.number({ default: 0 }),
        image: ts_mongoose_1.Type.string({ required: true }),
        price: ts_mongoose_1.Type.number({ required: true }),
        product: ts_mongoose_1.Type.objectId({ required: true, ref: 'Product' }),
    }),
    shippingAddress: ts_mongoose_1.Type.object({ required: true }).of({
        name: ts_mongoose_1.Type.string({ required: true }),
        address: ts_mongoose_1.Type.string({ required: true }),
        city: ts_mongoose_1.Type.string({ required: true }),
        postCode: ts_mongoose_1.Type.string({ required: true }),
        country: ts_mongoose_1.Type.string({ required: true }),
    }),
    paymentMethod: ts_mongoose_1.Type.string({ required: true }),
    paymentResult: ts_mongoose_1.Type.object({ required: true }).of({
        id: ts_mongoose_1.Type.string({ required: true }),
        status: ts_mongoose_1.Type.string({ required: true }),
        update_time: ts_mongoose_1.Type.string({ required: true }),
        email_address: ts_mongoose_1.Type.string({ required: true }),
    }),
    taxPrice: ts_mongoose_1.Type.number({ default: 0.0 }),
    shippingPrice: ts_mongoose_1.Type.number({ default: 0.0 }),
    totalPrice: ts_mongoose_1.Type.number({ default: 0.0 }),
    isPaid: ts_mongoose_1.Type.boolean({ default: false }),
    paidAt: ts_mongoose_1.Type.date({}),
    deliveredAt: ts_mongoose_1.Type.date({}),
}, {
    timestamps: true,
});
exports.OrderModel = ts_mongoose_1.typedModel('Order', exports.OrderSchema);
