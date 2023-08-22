"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const product_controller_1 = require("./product.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/cat', product_controller_1.ProductController.getProductByCategory);
router.get('/', product_controller_1.ProductController.getAllProduct);
router.post('/create', product_controller_1.ProductController.createProduct);
router.delete('/:id', product_controller_1.ProductController.deleteProduct);
router.get('/:id', product_controller_1.ProductController.getSingleProduct);
router.post('/:productId/add-review', product_controller_1.ProductController.addReview);
exports.ProductRouter = router;
