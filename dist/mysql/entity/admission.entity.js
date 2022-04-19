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
exports.AdmissionEntity = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
const prescription_entity_1 = require("./prescription.entity");
let AdmissionEntity = class AdmissionEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], AdmissionEntity.prototype, "admissionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'organize_id' }),
    __metadata("design:type", Number)
], AdmissionEntity.prototype, "organizeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    __metadata("design:type", Number)
], AdmissionEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.CustomerEntity, customer => customer.admissionList),
    (0, typeorm_1.JoinColumn)({ name: 'customer_id' }),
    __metadata("design:type", customer_entity_1.CustomerEntity)
], AdmissionEntity.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prescription_entity_1.PrescriptionEntity, prescription => prescription.admission),
    __metadata("design:type", Array)
], AdmissionEntity.prototype, "prescriptionList", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_start' }),
    __metadata("design:type", Date)
], AdmissionEntity.prototype, "timeStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'time_end' }),
    __metadata("design:type", Date)
], AdmissionEntity.prototype, "timeEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_money' }),
    __metadata("design:type", Number)
], AdmissionEntity.prototype, "totalMoney", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], AdmissionEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by' }),
    __metadata("design:type", Number)
], AdmissionEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], AdmissionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], AdmissionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], AdmissionEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)(),
    __metadata("design:type", Number)
], AdmissionEntity.prototype, "version", void 0);
AdmissionEntity = __decorate([
    (0, typeorm_1.Entity)('admission')
], AdmissionEntity);
exports.AdmissionEntity = AdmissionEntity;
