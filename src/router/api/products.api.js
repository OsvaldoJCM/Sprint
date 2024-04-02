import { Router } from "express";
import productsManager from "../../data/fs/ProductsManager.fs.js";
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
productsRouter.post("/", createProduct);

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



export default productsRouter;