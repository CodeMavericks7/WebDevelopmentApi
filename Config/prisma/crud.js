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
exports.db = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.db = {
    create(table, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            switch (table) {
                case 'class':
                    return response = yield prisma.class.createMany({ data, skipDuplicates: true });
                case 'classname':
                    return response = yield prisma.className.createMany({ data, skipDuplicates: true });
                case 'student':
                    return response = yield prisma.student.createMany({ data, skipDuplicates: true });
                case 'studentclass':
                    return response = yield prisma.studentClass.createMany({ data, skipDuplicates: true });
            }
            console.log(response);
        });
    },
    update(table, where, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            switch (table) {
                case 'class':
                    return response = yield prisma.class.update({ where, data });
                case 'classname':
                    return response = yield prisma.className.update({ where: where, data: data });
                case 'student':
                    return response = yield prisma.student.update({ where, data });
                case 'studentclass':
                    return response = yield prisma.studentClass.update({ where, data });
            }
            console.log(response);
        });
    },
    read(table, where) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            switch (table) {
                case 'class':
                    return response = where ? yield prisma.class.findMany(where) : yield prisma.class.findMany();
                case 'classname':
                    return response = where ? yield prisma.className.findMany(where) : yield prisma.className.findMany();
                case 'student':
                    return response = where ? yield prisma.student.findMany(where) : yield prisma.student.findMany();
                case 'studentclass':
                    return response = where ? yield prisma.studentClass.findMany(where) : yield prisma.studentClass.findMany();
            }
            console.log(response);
        });
    },
    deleter(table, where) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            switch (table) {
                case 'class':
                    return response = yield prisma.class.deleteMany(where);
                case 'classname':
                    console.log(where);
                    return response = yield prisma.className.delete({ where: where });
                case 'student':
                    return response = yield prisma.student.deleteMany(where);
                case 'studentclass':
                    return response = yield prisma.studentClass.deleteMany(where);
            }
            console.log(response);
        });
    }
};
