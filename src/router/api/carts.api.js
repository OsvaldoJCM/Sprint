import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/", read);
cartsRouter.get("/:id", readOne);
cartsRouter.post("/", create);
cartsRouter.put("/:id", update);
cartsRouter.delete("/:id", destroy);

cartsRouter.get("/paginate", paginate);

async function create(req, res, next) {
    try {
        const data = req.body;
        const one = await cartsManager.create(data);
        return res.json({
            statusCode: 201,
            message: "CREATED ID: " + one.id,
        });
    } catch (error) {
        return next(error);
    }
}

async function read(req, res, next) {
    try {
        const { user_id } = req.query;
        const all = await cartsManager.read({ user_id });
        if (all.length > 0) {
            return res.json({
                statusCode: 200,
                response: all,
            });
        } else {
            const error = new Error("Not found!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function readOne(req, res, next) {
    try {
        const { id } = req.params;
        const one = await cartsManager.readOne(id);
        if (one) {
            return res.json({
                statusCode: 200,
                response: one
            });
        } else {
            const error = new Error("Not found!");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
}

async function update(req, res, next) {
    try {
        const { nid } = req.params;
        const data = req.body;
        const one = await cartsManager.update(nid, data);
        return res.json({
            statusCode: 200,
            response: one,
        });
    } catch (error) {
        return next(error);
    }
}

async function destroy(req, res, next) {
    try {
        const { nid } = req.params;
        const one = await cartsManager.destroy(nid);
        return res.json({
            statusCode: 200,
            response: one,
        });
    } catch (error) {
        return next(error);
    }
}

async function paginate(req, res, next) {
    try {
        const filter = {};
        const opts = {};
        // const opts = { page: 1, limit: 9, lean: true, sort: { title: 1 } };
        // if (req.query.limit) {
        //     opts.limit = req.query.limit;
        // }
        // if (req.query.page) {
        //     opts.page = req.query.page;
        // }
        // if (req.query.title) {
        //     filter.title = new RegExp(req.query.title, "i")
        // }
        const all = await cartsManager.paginate({ filter, opts });
        return res.json({
            statusCode: 200,
            response: all //.docs,
            // info: {
            //     totalDocs: all.totalDocs,
            //     page: all.page,
            //     totalPages: all.totalPages,
            //     limit: all.limit,
            //     prevPage: all.prevPage,
            //     nextPage: all.nextPage,
            // },
        });
    } catch (error) {
        return next(error);
    }
}
export default cartsRouter;