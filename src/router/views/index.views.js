import { Router } from "express";
import productsRouter from "./products.views.js";
import usersRouter from "./users.views.js";
import cartsRouter from "./cart.view.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";

import login from "./login.view.js";
// import productsManager from "../../data/fs/ProductsManager.fs.js";
const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/cart", cartsRouter);
viewsRouter.use("/login", login);

viewsRouter.get("/", async (req, res, nets) => {
    try {
        const { category } = req.query
        const products = await productsManager.read(category);
        return res.render("index", { products });
    } catch (error) {
        return next(error)
    }
})
export default viewsRouter;