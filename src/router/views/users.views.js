import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.fs.js";
const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
    try {

        const { role } = req.query;
        const users = await usersManager.read(role);
        return res.render("users", { users });
    } catch (error) {
        return next(error);
    }
});
usersRouter.get("/register", async (req, res, next) => {
    try {
        const { role } = req.query;
        const users = await usersManager.read(role);
        return res.render("register", { users });
    } catch (error) {
        return next(error);
    }
});

usersRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const one = await usersManager.readOne(id);
        return res.render("userDetails", { users: one });
    } catch (error) {
        return next(error);
    }
});

export default usersRouter;