import { Add, Update, Read, Deleter } from './prisma/main';
import { updateDbFromClasses, updateDbWithClassStudents } from './corsizio-prisma/main';

export const prisma = { Add, Update, Read, Deleter };
export const prismaUpdate = { updateDbFromClasses, updateDbWithClassStudents };