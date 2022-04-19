"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const symbol_info_controller_1 = __importDefault(require("./symbol-info.controller"));
class SymbolInfoRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.symbolInfoController = new symbol_info_controller_1.default();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.get('/symbol-info/list', this.symbolInfoController.list);
    }
}
exports.default = SymbolInfoRoute;
