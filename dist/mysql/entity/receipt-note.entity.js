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
exports.ReceiptNoteEntity = void 0;
const typeorm_1 = require("typeorm");
const provider_entity_1 = require("./provider.entity");
const stock_in_entity_1 = require("./stock-in.entity");
const user_entity_1 = __importDefault(require("./user.entity"));
let ReceiptNoteEntity = class ReceiptNoteEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "receiptNoteId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organize_id' }),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "organizeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'provider_id' }),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "providerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => provider_entity_1.ProviderEntity, provider => provider.receiptNoteList),
    (0, typeorm_1.JoinColumn)({ name: 'provider_id' }),
    __metadata("design:type", provider_entity_1.ProviderEntity)
], ReceiptNoteEntity.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, user => user.receiptNoteList),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.default)
], ReceiptNoteEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stock_in_entity_1.StockInEntity, stockIn => stockIn.receiptNote),
    __metadata("design:type", Array)
], ReceiptNoteEntity.prototype, "stockInList", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'buyer_pays_ship' }),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "buyerPaysShip", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'seller_pays_ship' }),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "sellerPaysShip", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "debt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "totalMoney", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by' }),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ReceiptNoteEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ReceiptNoteEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], ReceiptNoteEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)(),
    __metadata("design:type", Number)
], ReceiptNoteEntity.prototype, "version", void 0);
ReceiptNoteEntity = __decorate([
    (0, typeorm_1.Entity)('receipt_note')
], ReceiptNoteEntity);
exports.ReceiptNoteEntity = ReceiptNoteEntity;
