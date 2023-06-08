import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const db = {
    async create(table: string, data: any[]) {
        let response;

        switch (table) {
            case 'class':
                return response = await prisma.class.createMany({ data, skipDuplicates: true });
            case 'classname':
                return response = await prisma.className.createMany({ data, skipDuplicates: true });
            case 'student':
                return response = await prisma.student.createMany({ data, skipDuplicates: true });
            case 'studentclass':
                return response = await prisma.studentClass.createMany({ data, skipDuplicates: true });
        }
        console.log(response)
    },

    async update(table: string, where: any, data: any) {
        let response;

        switch (table) {
            case 'class':
                return response = await prisma.class.update({ where, data });
            case 'classname':
                return response = await prisma.className.update({ where, data });
            case 'student':
                return response = await prisma.student.update({ where, data });
            case 'studentclass':
                return response = await prisma.studentClass.update({ where, data });
        }
        console.log(response)
    },

    async read(table: string, where?: any) {
        let response;

        switch (table) {
            case 'class':
                return response = where ? await prisma.class.findMany(where) : await prisma.class.findMany();
            case 'classname':
                return response = where ? await prisma.className.findMany(where) : await prisma.className.findMany();
            case 'student':
                return response = where ? await prisma.student.findMany(where) : await prisma.student.findMany();
            case 'studentclass':
                return response = where ? await prisma.studentClass.findMany(where) : await prisma.studentClass.findMany();
        }
        console.log(response)
    },

    async deleter(table: string, where: any) {
        let response;

        switch (table) {
            case 'class':
                return response = await prisma.class.deleteMany(where);
            case 'classname':
                return response = await prisma.className.deleteMany(where);
            case 'student':
                return response = await prisma.student.deleteMany(where);
            case 'studentclass':
                return response = await prisma.studentClass.deleteMany(where);
        }
        console.log(response)
    }
}
