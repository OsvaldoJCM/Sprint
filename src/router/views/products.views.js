import { Router } from "express";
// import productsManager from "../../data/fs/ProductsManager.fs.js";

import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";



const productsRouter = Router();

productsRouter.get("/real", async (req, res, next) => {
    try {
        const { category } = req.query
        const products = await productsManager.read(category);
        return res.render("real", { products });
    } catch (error) {
        return next(error);
    }
});
productsRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await productsManager.readOne(id);
        return res.render("productDetails", { products });
    } catch (error) {
        return next(error);
    }
});
export default productsRouter;