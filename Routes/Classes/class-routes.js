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
    app.post("/class/add/", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Add.classes(req.body);
            res.json({ response });
        });
    });
    //Read Routes
    app.get("/class/read/all", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Read.classes();
            res.json({ response });
        });
    });
    app.get("/class/:id/read", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Read.classById(req.params.id);
            res.json({ response });
        });
    });
    app.get("/class/:year/:month/search", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Read.classBySearch(req.params.year, req.params.month);
            res.json({ response });
        });
    });
    //Update Route
    app.put("/class", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Update.updateClass(req.body);
            res.json({ response });
        });
    });
    //Delete Routes
    app.delete("/class/:id", function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield index_1.prisma.Deleter.class(req.params.id);
            res.json({ response });
        });
    });
};
