import { prisma } from '../../Services/index';

module.exports = (app: any) => {

    //Add Routes
    app.post("/class/add/", async function (req: any, res: any) {
        const response = await prisma.Add.classes(req.body);
        res.json({ response });
    });


    //Read Routes
    app.get("/class/read/all", async function (req: any, res: any) {
        const response = await prisma.Read.classes();
        res.json({ response });
    });

    app.get("/class/:id/read", async function (req: any, res: any) {
        const response = await prisma.Read.classById(req.params.id);
        res.json({ response });
    });

    app.get("/class/:year/:month/search", async function (req: any, res: any) {
        const response = await prisma.Read.classBySearch(req.params.year, req.params.month);
        res.json({ response });
    });


    //Update Route
    app.put("/class", async function (req: any, res: any) {
        const response = await prisma.Update.updateClass(req.body);
        res.json({ response });
    });


    //Delete Routes
    app.delete("/class/:id", async function (req: any, res: any) {
        const response = await prisma.Deleter.class(req.params.id);
        res.json({ response });
    });
}