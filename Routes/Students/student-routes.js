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
    app.post("/student/add/", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Add.students(req.body);
            res.json({ response });
        });
    });
    //Read Routes
    app.get("/student/read/all", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Read.students();
            res.json({ response });
        });
    });
    app.get("/student/:id/read", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Read.oneStudent(req.params.id);
            res.json({ response });
        });
    });
    //Update Route
    app.put("/student", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Update.student(req.body);
            res.json({ response });
        });
    });
    //Delete Routes
    app.delete("/student/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Deleter.student(req.params.id);
            res.json({ response });
        });
    });
};
