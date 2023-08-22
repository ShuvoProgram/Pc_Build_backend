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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = exports.addReview = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendReponse_1 = __importDefault(require("../../../shared/sendReponse"));
const product_service_1 = require("./product.service");
const http_status_1 = __importDefault(require("http-status"));
const createProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productInfo = __rest(req.body, []);
    const result = yield product_service_1.ProductService.createProduct(productInfo);
    (0, sendReponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Successfully Added Product !!',
        success: true,
        data: result,
    });
}));
const deleteProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductService.deleteByIdProduct(id);
    (0, sendReponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully deleted Product!!',
        success: true,
        data: result,
    });
}));
const getSingleProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductService.getByIdProduct(id);
    (0, sendReponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully retrieve Product information !!',
        success: true,
        data: result,
    });
}));
const getAllProduct = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductService.getAllProducts();
    (0, sendReponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully retrieve all Product information !!',
        success: true,
        data: result,
    });
}));
const getProductByCategory = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.query.category;
    const result = yield product_service_1.ProductService.getProductByCategories(category);
    (0, sendReponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully retrieve Product information !!',
        success: true,
        data: result,
    });
}));
// Controller function to add a review to a product
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const review = {
        name: req.body.name,
        rating: req.body.rating,
        review: req.body.review,
    };
    try {
        const updatedProduct = yield product_service_1.ProductService.addReviewToProduct(productId, review);
        if (updatedProduct) {
            return res.status(200).json(updatedProduct);
        }
        else {
            return res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        console.error('Error adding review:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.addReview = addReview;
exports.ProductController = {
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    createProduct,
    getProductByCategory,
    addReview: exports.addReview,
};
