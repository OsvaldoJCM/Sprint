function errorHandler(error, req, res, next) {
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || "CODER API ERROR",
    });
}

export default errorHandler;