function isEmail(req, res, next) {
    try {
        const { email } = req.body;
        if (!email) {
            const err = new Error("Insert email!!!!");
            err.statusCode = 400;
            throw err;
        }
        // if (!photo) {
        //     const err = new Error("Insert text!!!!");
        //     err.statusCode = 400;
        //     throw err;
        // }
        /*  if (!category) {
              req.body.category = "to do";
            } */
        return next();
        //el next SOLITO me deja pasar hacia la función siguiente
    } catch (error) {
        return next(error);
        //el next con ERROR me deja pasar hacia el errorHandler
    }
}

export default isEmail;