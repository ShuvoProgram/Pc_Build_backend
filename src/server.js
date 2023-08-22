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
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});
let server = new http_1.Server((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!\n');
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log('Database is Connected Successfully !!');
            server = app_1.default.listen(config_1.default.port, () => {
                console.log(`Application is listening on post ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.log('Failed to connect database !!');
        }
        process.on('unhandledRejection', error => {
            if (server) {
                server.close(() => {
                    console.log(error);
                });
            }
            else {
                process.exit(1);
            }
        });
    });
}
bootstrap();
process.on('SIGTERM', () => {
    console.log('SIGTERM is received');
    if (server) {
        server.close();
    }
});
