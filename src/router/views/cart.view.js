import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";
import { Types } from "mongoose";

const cartsRouter = Router();

cartsRouter.get("/", read);

async function read(req, res, next) {
    try {
        const { user_id } = req.query;
        const products = await cartsManager.read({ user_id });
        return res.render("cart", { products });
    } catch (error) {
        return next(error);
    }
}

cartsRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params
        const products = await cartsManager.aggregate([
            {
                $match: {
                    user_id: new Types.ObjectId(uid)
                }
            },
            {
                $lookup: {
                    foreignField: "_id",
                    from: "products",
                    localField: "product_id",
                    as: "product_id"
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"]
                    }
                }
            },
            {
                $set:
                {
                    subTotal:
                        { $multiply: ["$quantity", "$price"] }
                }
            },
            // {
            //     $group: {
            //         _id: "$user_id",
            //         total: { $sum: "$subTotal" }
            //     }
            // },
            // {
            //     $project: {
            //         _id: 0, user_id: "$_id", total: "$total", date: new Date()
            //     }
            // },
            // {
            //     $merge: {
            //         into: "tickets"
            //     }
            // }
        ])
        return res.render("cart", { products });
    } catch (error) {
        return next(error)
    }



})
export default cartsRouter