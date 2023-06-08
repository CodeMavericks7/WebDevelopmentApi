import { prisma } from '../../Services/index';

module.exports = (app: any) => {

    //Add Routes
    app.post("/class-name/add/", async function (req: any, res: any) {
        const response = await prisma.Add.classNames(req.body);
        res.json({ response });
    });


    //Read Routes
    app.get("/class-name/read/all", async function (req: any, res: any) {
        const response = await prisma.Read.classNames();
        res.json({ response });
    });

    app.get("/class-name/:id/read", async function (req: any, res: any) {
        const response = await prisma.Read.classNamesById(req.params.id);
        res.json({ response });
    });


    //Update Route
    app.put("/class-name", async function (req: any, res: any) {
        const response = await prisma.Update.className(req.body);
        res.json({ response });
    });


    //Delete Routes
    app.delete("/class-name/:id", async function (req: any, res: any) {
        const response = await prisma.Deleter.className(req.params.id);
        res.json({ response });
    });
}