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
exports.StockInEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = __importDefault(require("./product.entity"));
const receipt_note_entity_1 = require("./receipt-note.entity");
let StockInEntity = class StockInEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], StockInEntity.prototype, "stockInId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organize_id' }),
    __metadata("design:type", Number)
], StockInEntity.prototype, "organizeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], StockInEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.default, product => product.stockInList),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.default)
], StockInEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'receipt_note_id' }),
    __metadata("design:type", Number)
], StockInEntity.prototype, "receiptNoteId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => receipt_note_entity_1.ReceiptNoteEntity, receiptNote => receiptNote.stockInList),
    (0, typeorm_1.JoinColumn)({ name: 'receipt_note_id' }),
    __metadata("design:type", receipt_note_entity_1.ReceiptNoteEntity)
], StockInEntity.prototype, "receiptNote", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StockInEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiry-date' }),
    __metadata("design:type", Date)
], StockInEntity.prototype, "expiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cost-price' }),
    __metadata("design:type", Number)
], StockInEntity.prototype, "costPrice", void 0);
StockInEntity = __decorate([
    (0, typeorm_1.Entity)('stock_in')
], StockInEntity);
exports.StockInEntity = StockInEntity;
