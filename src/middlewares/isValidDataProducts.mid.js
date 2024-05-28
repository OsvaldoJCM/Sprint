import usersManager from "../data/mongo/managers/UsersManager.mongo.js";

async function isValidData(req, res, next) {
    try {
        const { title, price, stock, category } = req.body;
        if (!title || !price || !stock || !category) {
            const error = new Error("Please enter data products!");
            error.statusCode = 400;
            throw error;
        }
        return next();
    } catch (error) {
        return next(error);
    }
}

export default isValidData;