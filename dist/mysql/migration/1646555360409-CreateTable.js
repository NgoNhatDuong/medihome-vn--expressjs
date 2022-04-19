"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTable1646555360409 = void 0;
class CreateTable1646555360409 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = `
        DROP TABLE IF EXISTS 'User';
        CREATE TABLE 'User' (
            'id' int NOT NULL AUTO_INCREMENT,
            'username' varchar(255) NOT NULL,
            'password' varchar(255) NOT NULL,
            'email' varchar(255) NOT NULL,
            'phone' varchar(255) NOT NULL,
            'createdAt' datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
            'updatedAt' datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
            'deletedAt' datetime(6) NULL,
            UNIQUE (username),
            PRIMARY KEY (id)
        ) ENGINE = InnoDB
    `;
            yield queryRunner.query(queryString);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.CreateTable1646555360409 = CreateTable1646555360409;
