import { Router } from "express";
import productsManager from "../../data/fs/ProductsManager.fs.js";

const productsRouter = Router();

productsRouter.get("/real", async (req, res, next) => {
    try {
        const { category } = req.query
        console.log("+++++++++++", category);
        const products = await productsManager.read(category);
        return res.render("real", { products });
    } catch (error) {
        return next(error);
    }
});
productsRouter.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const one = await productsManager.readOne(id);
        return res.render("productDetails", { products: one });
    } catch (error) {
        return next(error);
    }
});
export default productsRouter;