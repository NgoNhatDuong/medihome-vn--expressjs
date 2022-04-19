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
exports.PrescriptionEntity = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
const admission_entity_1 = require("./admission.entity");
const stock_out_entity_1 = require("./stock-out.entity");
const user_entity_1 = __importDefault(require("./user.entity"));
let PrescriptionEntity = class PrescriptionEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organize_id' }),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "organizeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.CustomerEntity, customer => customer.prescriptionList),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", customer_entity_1.CustomerEntity)
], PrescriptionEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, user => user.prescriptionList),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.default)
], PrescriptionEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'admission_id' }),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "admissionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => admission_entity_1.AdmissionEntity, admission => admission.prescriptionList),
    (0, typeorm_1.JoinColumn)({ name: 'admission_id' }),
    __metadata("design:type", admission_entity_1.AdmissionEntity)
], PrescriptionEntity.prototype, "admission", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stock_out_entity_1.StockOutEntity, stockOut => stockOut.prescription),
    __metadata("design:type", Array)
], PrescriptionEntity.prototype, "stockOutList", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'buyer_pays_ship' }),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "buyerPaysShip", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'seller_pays_ship' }),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "sellerPaysShip", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "debt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "totalMoney", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by' }),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PrescriptionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], PrescriptionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], PrescriptionEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)(),
    __metadata("design:type", Number)
], PrescriptionEntity.prototype, "version", void 0);
PrescriptionEntity = __decorate([
    (0, typeorm_1.Entity)('prescription')
], PrescriptionEntity);
exports.PrescriptionEntity = PrescriptionEntity;
