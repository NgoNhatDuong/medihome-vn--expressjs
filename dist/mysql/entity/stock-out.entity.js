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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockOutEntity = void 0;
const typeorm_1 = require("typeorm");
const prescription_entity_1 = require("./prescription.entity");
const product_entity_1 = __importDefault(require("./product.entity"));
let StockOutEntity = class StockOutEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], StockOutEntity.prototype, "stockOutId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organize_id' }),
    __metadata("design:type", Number)
], StockOutEntity.prototype, "organizeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], StockOutEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.default, product => product.stockOutList),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.default)
], StockOutEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'prescription_id' }),
    __metadata("design:type", Number)
], StockOutEntity.prototype, "prescriptionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prescription_entity_1.PrescriptionEntity, prescription => prescription.stockOutList),
    (0, typeorm_1.JoinColumn)({ name: 'prescription_id' }),
    __metadata("design:type", prescription_entity_1.PrescriptionEntity)
], StockOutEntity.prototype, "prescription", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StockOutEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiry-date' }),
    __metadata("design:type", Date)
], StockOutEntity.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost-price' }),
    __metadata("design:type", Number)
], StockOutEntity.prototype, "costPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expected-price' }),
    __metadata("design:type", Number)
], StockOutEntity.prototype, "expectedPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actual-price' }),
    __metadata("design:type", Number)
], StockOutEntity.prototype, "actualPrice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StockOutEntity.prototype, "discount", void 0);
StockOutEntity = __decorate([
    (0, typeorm_1.Entity)('stock_out')
], StockOutEntity);
exports.StockOutEntity = StockOutEntity;
