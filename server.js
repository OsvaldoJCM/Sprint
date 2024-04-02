import express from "express";
import morgan from "morgan";

import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
const server = express()
const port = 8080
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready)

server.use(express.urlencoded({ extended: true }))

server.use(express.json());
server.use(morgan("dev"))

// Endpoints
server.use("/", indexRouter);
server.use(errorHandler)
server.use(pathHandler)

server.get("/", async (requerimientos, respuesta) => {
    try {
        return respuesta.status(200).json({
            response: "CODER API",
            success: true
        })
    } catch (error) {
        console.log(error);
        return respuesta.status(500).json({
            response: "CODER API ERROR",
            success: false
        })
    }
})

