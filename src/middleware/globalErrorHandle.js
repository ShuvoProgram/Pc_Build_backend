"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const HandleMongooseServerError_1 = __importDefault(require("../errors/HandleMongooseServerError"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.env === 'development'
        ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
        : console.error(`🐱‍🏍 globalErrorHandler ~~`, error);
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessage = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'MongoServerError') {
        const simplifiedError = (0, HandleMongooseServerError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
