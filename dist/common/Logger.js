"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Format_1 = require("./Format");
class Logger {
    static request(req) {
        const datetime = (0, Format_1.datetimeToString)(new Date(), 'YYYY/MM/DD hh:mm:ss');
        const info = {
            url: req.originalUrl,
            method: req.method,
            body: req.body,
            params: req.params,
        };
        const messager = `[${datetime}] - ${JSON.stringify(info)}`;
        console.log(messager);
    }
    static response(res) {
        const datetime = (0, Format_1.datetimeToString)(new Date(), 'YYYY/MM/DD hh:mm:ss');
        const info = {};
        const messager = `[${datetime}] - ${JSON.stringify(info)}`;
        console.log(messager);
    }
}
exports.default = Logger;
