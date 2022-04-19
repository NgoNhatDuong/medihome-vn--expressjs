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
exports.StockAvailEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = __importDefault(require("./product.entity"));
let StockAvailEntity = class StockAvailEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], StockAvailEntity.prototype, "stockAvailId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organize_id' }),
    __metadata("design:type", Number)
], StockAvailEntity.prototype, "organizeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], StockAvailEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.default, product => product.stockAvailList),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.default)
], StockAvailEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StockAvailEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiry-date' }),
    __metadata("design:type", Date)
], StockAvailEntity.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost-price' }),
    __metadata("design:type", Number)
], StockAvailEntity.prototype, "costPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'retail-price' }),
    __metadata("design:type", Number)
], StockAvailEntity.prototype, "retailPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'wholesale-price' }),
    __metadata("design:type", Number)
], StockAvailEntity.prototype, "wholesalePrice", void 0);
StockAvailEntity = __decorate([
    (0, typeorm_1.Entity)('stock_avail')
], StockAvailEntity);
exports.StockAvailEntity = StockAvailEntity;
