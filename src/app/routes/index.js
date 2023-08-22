"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_route_1 = require("../module/product/product.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/products',
        route: product_route_1.ProductRouter,
    },
];
moduleRoutes.forEach(field => router.use(field.path, field.route));
exports.UserRouter = router;
