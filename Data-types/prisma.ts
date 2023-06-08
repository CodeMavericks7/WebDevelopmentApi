export type ClassName = {
    id?: string,
    name: string,
    Classes?: Class[]
}

export type Class = {
    id?: string,
    corsizioId?: string
    className?: ClassName
    classNameId: string,
    startDate: Date,
    startMonth: string,
    startYear: string,
    endDate: Date,
    StudentClass?: StudentClass[]
}

export type Student = {
    id: string,
    corsizioId?: string,
    name: string,
    StudentClass?: StudentClass[]
}

export type StudentClass = {
    id?: string,
    student?: Student,
    studentId: string,
    class?: Class,
    classId: string
}