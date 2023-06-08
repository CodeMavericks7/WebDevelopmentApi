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
exports.updateDbWithClassStudents = exports.updateDbFromClasses = void 0;
const setup_1 = require("../../Config/corsizio/setup");
const __1 = require("..");
const moment = require('moment');
const crypto_1 = require("crypto");
moment().format();
function getWebDevClassesFromCorsizio() {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = '642b21bf896be37c0ad52ceb';
        const response = yield (0, setup_1.corsizio)(`/events?category=${categoryId}&limit=20&order=-created`);
        return response;
    });
}
;
function getSpecificClassFromCorsizio(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const test = '6451d0a7623616c2e73a9ad8';
        const response = yield (0, setup_1.corsizio)(`/events/${test}?include=attendees`);
        return response;
    });
}
;
function getClassesIdFromDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __1.prisma.Read.classesId();
    });
}
;
function getClassNames() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __1.prisma.Read.classNames();
    });
}
;
function addClass(classes) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __1.prisma.Add.classes(classes);
    });
}
;
function addClassName(className) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __1.prisma.Add.classNames([className]);
    });
}
;
function deleteAllStudentsInClass(classId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __1.prisma.Deleter.studentsFromClass(classId);
    });
}
;
function getStudentId(corsizioId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __1.prisma.Read.getStudentByCorsizioId(corsizioId);
    });
}
;
function addStudents(students) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __1.prisma.Add.students(students);
    });
}
;
function addStudentsToClass(studentsToClass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield __1.prisma.Add.studentToClass(studentsToClass);
    });
}
function updateDbFromClasses() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbClasses = yield getClassesIdFromDb();
        const corsizioClasses = yield getWebDevClassesFromCorsizio();
        const classNames = yield getClassNames();
        let classesToBeAdded = [];
        corsizioClasses.list.forEach((corClass) => __awaiter(this, void 0, void 0, function* () {
            const shouldAddClass = (dbClasses === null || dbClasses === void 0 ? void 0 : dbClasses.findIndex(x => x.id === corClass.id)) === -1;
            const classNameIdIndex = classNames === null || classNames === void 0 ? void 0 : classNames.findIndex((x) => corClass.name === x.name);
            let randomID = (0, crypto_1.randomUUID)();
            if (classNameIdIndex <= 0) {
                const data = {
                    id: randomID,
                    name: corClass.name
                };
                yield addClassName(data);
            }
            if (shouldAddClass) {
                const data = {
                    classNameId: classNameIdIndex <= 0 ? randomID : classNames[classNameIdIndex],
                    startDate: corClass.created,
                    startMonth: moment(corClass.created).month.format("MMMM").toString(),
                    startYear: moment(corClass.created).year.format("YYYY").toString(),
                    endDate: corClass.endDate
                };
                classesToBeAdded = classesToBeAdded.concat([data]);
            }
            addClass(classesToBeAdded);
            return 'Done';
        }));
    });
}
exports.updateDbFromClasses = updateDbFromClasses;
;
function updateDbWithClassStudents(corsizioId, classId) {
    return __awaiter(this, void 0, void 0, function* () {
        //Search the DB for that class, and get the class from corsizio with the attendees
        //If there are students in the DB that arent in corsizio list, remove them
        //If there are students that are in the corsizio list but not in the DB, add them
        const corsizioClass = yield getSpecificClassFromCorsizio(corsizioId);
        let addedStudents = [];
        const randomID = (0, crypto_1.randomUUID)();
        yield deleteAllStudentsInClass(classId);
        corsizioClass.attendees.forEach((attendee) => __awaiter(this, void 0, void 0, function* () {
            //If student is found, use the Id, if not, add the student
            const studentId = yield getStudentId(attendee.id);
            if (!(studentId === null || studentId === void 0 ? void 0 : studentId.length)) {
                yield addStudents([{
                        id: randomID,
                        name: attendee.name
                    }]);
            }
            const data = {
                classId,
                studentId: !(studentId === null || studentId === void 0 ? void 0 : studentId.length) ? randomID : studentId[0].id
            };
            addedStudents = addedStudents.concat([data]);
        }));
        yield addStudentsToClass(addedStudents);
    });
}
exports.updateDbWithClassStudents = updateDbWithClassStudents;
;
