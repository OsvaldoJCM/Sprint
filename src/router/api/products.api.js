import { Router } from "express";
// import productsManager from "../../data/fs/ProductsManager.fs.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";

import isText from "../../middlewares/isText.mid.js";
import isPhoto from "../../middlewares/isPhoto.mid.js";
import uploader from "../../middlewares/multer.mid.js";
const productsRouter = Router();

// productsManager
productsRouter.get("/", async (req, res, next) => {
    try {
        const { category } = req.query
        const all = await productsManager.read(category)
        if (all.length !== 0) {
            return res.status(200).json({
                statusCode: 200,
                response: all,
                category,
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

productsRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const one = await productsManager.readOne(id)
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

const createProduct = async (req, res, next) => {
    try {
        const data = req.body
        console.log(req.file);
        const one = await productsManager.create(data)
        console.log(one);
        return res.json({
            statusCode: 201,
            message: "Created id " + one.id
        })
    } catch (error) {
        return next(error);
    }
}
productsRouter.post("/", uploader.single("photo"), isPhoto, createProduct);

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        const one = await productsManager.update(id, data)
        return res.json({
            statusCode: 200,
            response: "UPDATED ID " + one.id
        })
    } catch (error) {
        return next(error);
    }
};
productsRouter.put("/:id", updateProduct);

const destroyProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const one = await productsManager.destroy(id)
        return res.json({
            statusCode: 200,
            response: "Deleted ID " + id
        })
    } catch (error) {
        return next(error);
    }
};
productsRouter.delete("/:id", destroyProduct);

const paginate = async (req, res, next) => {
    try {
        const filter = {};
        const opts = { page: 1, limit: 9, lean: true, sort: { title: 1 } };
        if (req.query.limit) {
            opts.limit = req.query.limit;
        }
        if (req.query.page) {
            opts.page = req.query.page;
        }
        if (req.query.title) {
            filter.title = new RegExp(req.query.title, "i")
        }
        const all = await productsManager.paginate({ filter, opts });
        return res.json({
            statusCode: 200,
            response: all.docs,
            info: {
                totalDocs: all.totalDocs,
                page: all.page,
                totalPages: all.totalPages,
                limit: all.limit,
                prevPage: all.prevPage,
                nextPage: all.nextPage,
            },
        });
    } catch (error) {
        return next(error);
    }
}
productsRouter.get("/paginate", paginate);


export default productsRouter;