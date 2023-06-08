"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaUpdate = exports.prisma = void 0;
const main_1 = require("./prisma/main");
const main_2 = require("./corsizio-prisma/main");
exports.prisma = { Add: main_1.Add, Update: main_1.Update, Read: main_1.Read, Deleter: main_1.Deleter };
exports.prismaUpdate = { updateDbFromClasses: main_2.updateDbFromClasses, updateDbWithClassStudents: main_2.updateDbWithClassStudents };
