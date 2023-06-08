"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deleter = exports.Update = exports.Read = exports.Add = void 0;
const crud_1 = require("../../Config/prisma/crud");
exports.Add = {
    //Not really used other than for manually adding students
    students(students) {
        return crud_1.db.create('student', students);
    },
    classNames(classNames) {
        return crud_1.db.create('classname', classNames);
    },
    classes(classes) {
        return crud_1.db.create('class', classes);
    },
    studentToClass(studentToClass) {
        return crud_1.db.create('studentclass', studentToClass);
    }
};
exports.Read = {
    students() {
        return crud_1.db.read('student');
    },
    oneStudent(id) {
        return crud_1.db.read('student', { where: { id } });
    },
    getStudentByCorsizioId(corsizioId) {
        return crud_1.db.read('student', { where: { corsizioId }, select: { id: true } });
    },
    studentIdsFromClass(classId) {
        return crud_1.db.read('studentclass', { where: { classId }, select: { corsizioId: true } });
    },
    classBySearch(startYear, startMonth) {
        return crud_1.db.read('class', {
            where: { startYear, startMonth },
            select: { id: true, className: true, startMonth: true, startYear: true }
        });
    },
    allStudentsInClass(classId) {
        return crud_1.db.read('studentclass', {
            where: {
                classId
            },
            select: {
                id: true,
                classId: true,
                include: {
                    student: true
                }
            }
        });
    },
    classNames() {
        return crud_1.db.read('classname');
    },
    classNamesById(id) {
        return crud_1.db.read('classname', { where: { id } });
    },
    classes() {
        return crud_1.db.read('class');
    },
    classById(id) {
        return crud_1.db.read('class', { where: { id } });
    },
    classesId() {
        return crud_1.db.read('class', { select: { id: true } });
    },
    allClassesForStudent(studentId) {
        return crud_1.db.read('studentclass', {
            where: {
                studentId
            },
            select: {
                id: true,
                studentId: true,
                include: {
                    class: true
                }
            }
        });
    }
};
exports.Update = {
    student(student) {
        crud_1.db.update('student', {
            where: {
                id: student.id
            }
        }, {
            data: {
                id: student.id,
                corsizioId: student.corsizioId,
                name: student.name
            }
        });
    },
    updateClass(studentClass) {
        crud_1.db.update('class', {
            where: {
                id: studentClass.id
            }
        }, {
            data: {
                id: studentClass.id,
                corsizioId: studentClass.corsizioId,
                classNameId: studentClass.classNameId,
                startDate: studentClass.startDate,
                startMonth: studentClass.startMonth,
                startYear: studentClass.startYear,
                endDate: studentClass.endDate
            }
        });
    },
    className(className) {
        crud_1.db.update('student', {
            id: className.id
        }, {
            id: className.id,
            name: className.name
        });
    },
};
exports.Deleter = {
    student(id) {
        crud_1.db.deleter('student', { where: { id } });
    },
    class(id) {
        crud_1.db.deleter('class', { where: { id } });
    },
    className(id) {
        console.log(id);
        crud_1.db.deleter('className', { id });
    },
    removeFromClass(studentId, classId) {
        crud_1.db.deleter('studentclass', { where: { studentId, classId } });
    },
    studentsFromClass(classId) {
        crud_1.db.deleter('studentclass', { where: { classId } });
    }
};
// Read.classesId().then(x => {
// console.log(x)
// })
