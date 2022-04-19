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
const typeorm_1 = require("typeorm");
const prescription_entity_1 = require("./prescription.entity");
const receipt_note_entity_1 = require("./receipt-note.entity");
const user_role_entity_1 = __importDefault(require("./user-role.entity"));
let UserEntity = class UserEntity {
    constructor() {
        this.userRoleId = 2;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: 'organize_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "organizeId", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prescription_entity_1.PrescriptionEntity, prescription => prescription.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "prescriptionList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => receipt_note_entity_1.ReceiptNoteEntity, receiptNote => receiptNote.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "receiptNoteList", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Unique)(['username']),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Unique)(['email']),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'display_name' }),
    __metadata("design:type", String)
], UserEntity.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'private_key' }),
    __metadata("design:type", String)
], UserEntity.prototype, "privateKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "birdthday", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_role_id' }),
    __metadata("design:type", Object)
], UserEntity.prototype, "userRoleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_role_entity_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'user_role_id' }),
    __metadata("design:type", user_role_entity_1.default)
], UserEntity.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'updated_by' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "version", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);
exports.default = UserEntity;
