"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const product_model_1 = require("./product.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if a product with the same name already exists
    const existingProduct = yield product_model_1.ProductModel.findOne({ title: payload.title });
    if (existingProduct) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Product with the same title already exists.');
    }
    try {
        const result = yield product_model_1.ProductModel.create(payload);
        return result;
    }
    catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Error creating product.');
    }
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find({});
    return result;
});
const deleteByIdProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOneAndDelete({ _id: id });
    return result;
});
const getByIdProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ _id: payload });
    return result;
});
const getProductByCategories = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find({ category: payload });
    return result;
});
const addReviewToProduct = (productId, review) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.ProductModel.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        product.reviews.push(review);
        yield product.save();
        return product;
    }
    catch (error) {
        console.error('Error adding review:', error);
        return null;
    }
});
exports.ProductService = {
    getByIdProduct,
    deleteByIdProduct,
    getAllProducts,
    createProduct,
    getProductByCategories,
    addReviewToProduct,
};
