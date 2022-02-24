"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdateRequest = exports.ProductDetailRequest = exports.ProductAddRequest = exports.ProductListRequest = void 0;
const class_transformer_1 = require("class-transformer");
let ProductListRequest = class ProductListRequest {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ProductListRequest.prototype, "_page", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ProductListRequest.prototype, "_limit", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProductListRequest.prototype, "_order", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProductListRequest.prototype, "_sort", void 0);
ProductListRequest = __decorate([
    (0, class_transformer_1.Exclude)()
], ProductListRequest);
exports.ProductListRequest = ProductListRequest;
let ProductAddRequest = class ProductAddRequest {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProductAddRequest.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ProductAddRequest.prototype, "quantity", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ProductAddRequest.prototype, "price", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Number)
], ProductAddRequest.prototype, "createdAt", void 0);
ProductAddRequest = __decorate([
    (0, class_transformer_1.Exclude)()
], ProductAddRequest);
exports.ProductAddRequest = ProductAddRequest;
let ProductDetailRequest = class ProductDetailRequest {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductDetailRequest.prototype, "id", void 0);
ProductDetailRequest = __decorate([
    (0, class_transformer_1.Exclude)()
], ProductDetailRequest);
exports.ProductDetailRequest = ProductDetailRequest;
let ProductUpdateRequest = class ProductUpdateRequest {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], ProductUpdateRequest.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ProductUpdateRequest.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], ProductUpdateRequest.prototype, "price", void 0);
ProductUpdateRequest = __decorate([
    (0, class_transformer_1.Exclude)()
], ProductUpdateRequest);
exports.ProductUpdateRequest = ProductUpdateRequest;
