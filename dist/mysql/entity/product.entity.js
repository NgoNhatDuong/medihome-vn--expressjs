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
const typeorm_1 = require("typeorm");
const stock_avail_entity_1 = require("./stock-avail.entity");
const stock_in_entity_1 = require("./stock-in.entity");
const stock_out_entity_1 = require("./stock-out.entity");
let ProductEntity = class ProductEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organize_id' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "organizeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'brand_name' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "brandName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'generic_drug' }),
    __metadata("design:type", String)
], ProductEntity.prototype, "genericDrug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stock_avail_entity_1.StockAvailEntity, stockAvail => stockAvail.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "stockAvailList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stock_in_entity_1.StockInEntity, stockIn => stockIn.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "stockInList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stock_out_entity_1.StockOutEntity, stockOut => stockOut.product),
    __metadata("design:type", Array)
], ProductEntity.prototype, "stockOutList", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], ProductEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)(),
    __metadata("design:type", Number)
], ProductEntity.prototype, "version", void 0);
ProductEntity = __decorate([
    (0, typeorm_1.Entity)('product')
], ProductEntity);
exports.default = ProductEntity;
