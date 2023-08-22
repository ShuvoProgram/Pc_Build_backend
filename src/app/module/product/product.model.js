"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    keyFeatures: [
        {
            value: String,
            key: String,
        },
    ],
    category: {
        type: String,
    },
    price: {
        type: String,
    },
    status: {
        type: String,
        enum: ['In Stock', 'Out of stock'],
    },
    image: {
        type: String,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: String,
                // required: true,
                default: 0,
            },
            review: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ProductModel = (0, mongoose_1.model)('products', ProductSchema);
