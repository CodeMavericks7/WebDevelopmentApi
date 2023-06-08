import { prisma } from '../../Services/index';

module.exports = (app: any) => {

    //Add Routes
    app.post("/studentclass/add/", async function (req: any, res: any) {
        const response = await prisma.Add.studentToClass(req.body);
        res.json({ response });
    });

    
    //Read Routes
    app.get("/studentclass/:id/classes-for-student", async function (req: any, res: any) {
        const response = await prisma.Read.allClassesForStudent(req.params.id);
        res.json({ response });
    });

    app.get("/studentclass/:id/students-in-class", async function (req: any, res: any) {
        const response = await prisma.Read.allStudentsInClass(req.params.id);
        res.json({ response });
    });


    //Delete Routes
    app.delete("/student/:studentId/delete/:classId", async function (req: any, res: any) {
        const response = await prisma.Deleter.removeFromClass(req.params.studentId, req.params.classId);
        res.json({ response });
    });
}