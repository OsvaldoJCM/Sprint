import { Router } from "express";
import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPasword.mid.js";
import createHashPassword from "../../middlewares/createHashPassword.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passportCB from "../../middlewares/passportCB.mid.js";
const sessionsRouter = Router();


sessionsRouter.post(
    "/register",
    // passport.authenticate("register", { session: false }),
    passportCB("register"),
    async (req, res, next) => {
        try {
            return res.json({ statusCode: 201, message: "Registered!" });
        } catch (error) {
            return next(error);
        }
    }
);

sessionsRouter.post(
    "/login",
    // passport.authenticate("login", { session: false }),
    passportCB("login"),
    async (req, res, next) => {
        try {
            return res.cookie("token", req.user.token, { signedCookie: true }).json(
                {
                    statusCode: 200,
                    message: "Logged in",
                    // token: req.user.token
                });
        } catch (error) {
            return next(error)
        }
    })

sessionsRouter.get(
    "/online",
    // passport.authenticate("jwt", { session: false }),
    passportCB("jwt"),
    async (req, res, next) => {
        try {
            // if (req.session.online) {
            if (req.user.online) {
                return res.json({
                    statusCode: 200,
                    message: "Is online!",
                    user_id: req.user._id,
                });
            }
            return res.json({
                statusCode: 401,
                message: "Bad auth!",
            });
        } catch (error) {
            return next(error);
        }
    });

sessionsRouter.post("/signout", (req, res, next) => {
    try {
        if (req.user.online) {
            req.cookies.destroy();
            return res.json({ statusCode: 200, message: "Signed out!" });
        }
        const error = new Error("Invalid Credentials from signout")
        error.statusCode = 401
        throw error
    } catch (error) {
        return next(error);
    }
});
export default sessionsRouter 