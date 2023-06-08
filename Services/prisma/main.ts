import { db } from "../../Config/prisma/crud";
import { Student, StudentClass, Class, ClassName } from '../../Data-types/prisma'


export const Add = {
  //Not really used other than for manually adding students
  students(students: Student[]) {
    return db.create('student', students)
  },

  classNames(classNames: ClassName[]) {
    return db.create('classname', classNames)
  },

  classes(classes: Class[]) {
    return db.create('class', classes)
  },

  studentToClass(studentToClass: StudentClass[]) {
    return db.create('studentclass', studentToClass)
  }
}

export const Read = {
  students() {
    return db.read('student')
  },

  oneStudent(id: string) {
    return db.read('student', { where: { id } })
  },

  getStudentByCorsizioId(corsizioId: string) {
    return db.read('student', { where: { corsizioId }, select: { id: true } })
  },

  studentIdsFromClass(classId: string) {
    return db.read('studentclass', { where: { classId }, select: { corsizioId: true } });
  },

  classBySearch(startYear: string, startMonth: string) {
    return db.read('class', {
      where: { startYear, startMonth },
      select: { id: true, className: true, startMonth: true, startYear: true }
    })
  },

  allStudentsInClass(classId: string) {
    return db.read('studentclass', {
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
    })
  },

  classNames(): any {
    return db.read('classname')
  },

  classNamesById(id: string) {
    return db.read('classname', { where: { id } })
  },

  classes() {
    return db.read('class');
  },

  classById(id: string) {
    return db.read('class', { where: { id } });
  },

  classesId() {
    return db.read('class', { select: { id: true } });
  },

  allClassesForStudent(studentId: string) {
    return db.read('studentclass', {
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
    })
  }
}

export const Update = {
  student(student: Student) {
    db.update('student', {
      where: {
        id: student.id
      }
    }, {
      data: {
        id: student.id,
        corsizioId: student.corsizioId,
        name: student.name
      }
    })
  },

  updateClass(studentClass: Class) {
    db.update('class', {
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

  className(className: ClassName) {
    console.log(className)
    db.update('classname', {
      id: className.id
    }, {
      id: className.id,
      name: className.name
    })
  },
}

export const Deleter = {
  student(id: string) {
    db.deleter('student', { where: { id } });
  },

  class(id: string) {
    db.deleter('class', { where: { id } });
  },

  className(id: string) {
    console.log(id)
    db.deleter('className', { id: id });
  },

  removeFromClass(studentId: string, classId: string) {
    db.deleter('studentclass', { where: { studentId, classId } });
  },

  studentsFromClass(classId: string) {
    db.deleter('studentclass', { where: { classId } });
  }
}


// Read.classesId().then(x => {
// console.log(x)
// })