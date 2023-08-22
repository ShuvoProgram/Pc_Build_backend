"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HandleMongoServerError = (error) => {
    const errors = [
        {
            path: '',
            message: error.message,
        },
    ];
    const statusCode = 500;
    return {
        statusCode,
        message: 'Data Already Exists',
        errorMessages: errors,
    };
};
exports.default = HandleMongoServerError;
