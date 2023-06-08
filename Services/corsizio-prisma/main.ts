import { corsizio } from '../../Config/corsizio/setup';
import { prisma } from '..';
import { Class, ClassName, Student, StudentClass } from '../../Data-types/prisma';
const moment = require('moment');
import { randomUUID } from 'crypto';
moment().format();

async function getWebDevClassesFromCorsizio(): Promise<any> {
    const categoryId = '642b21bf896be37c0ad52ceb';
    const response = await corsizio(`/events?category=${categoryId}&limit=20&order=-created`);
    return response;
};

async function getSpecificClassFromCorsizio(id: string): Promise<any> {
    const test = '6451d0a7623616c2e73a9ad8'
    const response = await corsizio(`/events/${test}?include=attendees`);
    return response;
};

async function getClassesIdFromDb() {
    return await prisma.Read.classesId();
};

async function getClassNames() {
    return await prisma.Read.classNames();
};

async function addClass(classes: Class[]) {
    return await prisma.Add.classes(classes)
};

async function addClassName(className: ClassName) {
    return await prisma.Add.classNames([className])
};

async function deleteAllStudentsInClass(classId: string) {
    return await prisma.Deleter.studentsFromClass(classId);
};

async function getStudentId(corsizioId: string) {
    return await prisma.Read.getStudentByCorsizioId(corsizioId);
};

async function addStudents(students: Student[]) {
    return await prisma.Add.students(students);
};

async function addStudentsToClass(studentsToClass: StudentClass[]) {
    return await prisma.Add.studentToClass(studentsToClass);
}

export async function updateDbFromClasses() {
    const dbClasses = await getClassesIdFromDb();
    const corsizioClasses = await getWebDevClassesFromCorsizio();
    const classNames = await getClassNames();
    let classesToBeAdded: Class[] = [];

    corsizioClasses.list.forEach(async (corClass: any) => {
        const shouldAddClass = dbClasses?.findIndex(x => x.id === corClass.id) === -1;
        const classNameIdIndex = classNames?.findIndex((x: { name: any; }) => corClass.name === x.name);
        let randomID: string = randomUUID();


        if (classNameIdIndex <= 0) {
            const data: ClassName = {
                id: randomID,
                name: corClass.name
            }

            await addClassName(data);
        }


        if (shouldAddClass) {
            const data: Class = {
                classNameId: classNameIdIndex <= 0 ? randomID : classNames[classNameIdIndex],
                startDate: corClass.created,
                startMonth: moment(corClass.created).month.format("MMMM") .toString(),
                startYear: moment(corClass.created).year.format("YYYY").toString(),
                endDate: corClass.endDate
            };

            classesToBeAdded = classesToBeAdded.concat([data])
        }

        addClass(classesToBeAdded);
        return 'Done';
    });
};

export async function updateDbWithClassStudents(corsizioId: string, classId: string) {
    //Search the DB for that class, and get the class from corsizio with the attendees
    //If there are students in the DB that arent in corsizio list, remove them
    //If there are students that are in the corsizio list but not in the DB, add them
    const corsizioClass = await getSpecificClassFromCorsizio(corsizioId);
    let addedStudents: StudentClass[] = [];
    const randomID = randomUUID();

    await deleteAllStudentsInClass(classId)

    corsizioClass.attendees.forEach(async (attendee: any) => {
        //If student is found, use the Id, if not, add the student
        const studentId = await getStudentId(attendee.id);
        if (!studentId?.length) {
            await addStudents([{
                id: randomID,
                name: attendee.name
            }])
        }
        const data: StudentClass = {
            classId,
            studentId: !studentId?.length ? randomID : studentId[0].id
        }
        addedStudents = addedStudents.concat([data]);
    });

    await addStudentsToClass(addedStudents);
};