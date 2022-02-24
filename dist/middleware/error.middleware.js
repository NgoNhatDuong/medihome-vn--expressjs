"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Some thing when wrong';
    res.status(status).json({ message });
};
exports.errorMiddleware = errorMiddleware;
