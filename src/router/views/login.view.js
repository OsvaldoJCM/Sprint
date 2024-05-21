import { Router } from "express";
import { Types } from "mongoose";

const loginRouter = Router();

loginRouter.get("/", read);

async function read(req, res, next) {
    try {

        return res.render("login", { title: "Log in" });
    } catch (error) {
        return next(error);
    }
}

export default loginRouter