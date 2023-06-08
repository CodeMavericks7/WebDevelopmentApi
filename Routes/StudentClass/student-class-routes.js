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
const index_1 = require("../../Services/index");
module.exports = (app) => {
    //Add Routes
    app.post("/studentclass/add/", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Add.studentToClass(req.body);
            res.json({ response });
        });
    });
    //Read Routes
    app.get("/studentclass/:id/classes-for-student", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Read.allClassesForStudent(req.params.id);
            res.json({ response });
        });
    });
    app.get("/studentclass/:id/students-in-class", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Read.allStudentsInClass(req.params.id);
            res.json({ response });
        });
    });
    //Delete Routes
    app.delete("/student/:studentId/delete/:classId", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Deleter.removeFromClass(req.params.studentId, req.params.classId);
            res.json({ response });
        });
    });
};
