import { Router } from "express";
// import usersManager from "../../data/fs/UsersManager.fs.js";
import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";
import isEmail from "../../middlewares/isEmail.mid.js";

const usersRouter = Router();

// usersManager
usersRouter.get("/", async (req, res, next) => {
    try {
        const { role } = req.query
        const all = await usersManager.read(role)
        if (all.length !== 0) {
            return res.status(200).json({
                statusCode: 200,
                response: all,
                role,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND " + role)
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);
    }
})

usersRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const one = await usersManager.readOne(id)
        if (one) {
            return res.status(200).json({
                statusCode: 200,
                response: one,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);
    }
})

const createUser = async (req, res, next) => {
    try {
        const data = req.body
        const one = await usersManager.create(data)
        console.log(one);
        return res.json({
            statusCode: 201,
            message: "Created id " + one.id
        })
    } catch (error) {
        return next(error);
    }
}
usersRouter.post("/", isEmail, createUser);

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const one = await usersManager.update(id, data)
        return res.json({
            statusCode: 200,
            response: "UPDATED ID " + one.id
        })
    } catch (error) {
        return next(error);
    }
};
usersRouter.put("/:id", updateUser);

const destroyUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const one = await usersManager.destroy(id)
        return res.json({
            statusCode: 200,
            response: "Deleted ID " + id
        })
    } catch (error) {
        return next(error);
    }
};
usersRouter.delete("/:id", destroyUser);

export default usersRouter;