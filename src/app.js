"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./app/routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandle_1 = __importDefault(require("./middleware/globalErrorHandle"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', routes_1.UserRouter);
//global error handler
app.use(globalErrorHandle_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to PC BUILDER !!');
});
app.use((req, res, next) => {
    const resStatus = {
        success: false,
        message: 'Something Went Wrong !!',
        errorMessage: [
            {
                path: req.originalUrl,
                message: 'Api is not found !',
            },
        ],
    };
    res.status(200).json(resStatus);
    next();
});
exports.default = app;
