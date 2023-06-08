import { prisma } from '../../Services/index';

module.exports = (app: any) => {

    //Add Routes
    app.post("/student/add/", async function (req: any, res: any) {
        const response = await prisma.Add.students(req.body);
        res.json({ response });
    });


    //Read Routes
    app.get("/student/read/all", async function (req: any, res: any) {
        const response = await prisma.Read.students();
        res.json({ response });
    });

    app.get("/student/:id/read", async function (req: any, res: any) {
        const response = await prisma.Read.oneStudent(req.params.id);
        res.json({ response });
    });


    //Update Route
    app.put("/student", async function (req: any, res: any) {
        const response = await prisma.Update.student(req.body);
        res.json({ response });
    });


    //Delete Routes
    app.delete("/student/:id", async function (req: any, res: any) {
        const response = await prisma.Deleter.student(req.params.id);
        res.json({ response });
    });
}