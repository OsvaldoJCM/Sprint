import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars"

import indexRouter from "./src/router/index.router.js";
import socketCb from "./src/router/index.socket.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from './utils.js';

const server = express()
const port = 8080
const ready = () => console.log("server ready on port " + port);
const nodeServer = createServer(server);


//tcp server
const socketServer = new Server(nodeServer);

socketServer.on("connection", socketCb);

nodeServer.listen(port, ready);
// handlebars
server.engine("handlebars", engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')

// middleware
server.use(express.urlencoded({ extended: true }))
server.use(express.json());
server.use(morgan("dev"))

// Endpoints
server.use("/", indexRouter);
server.use(errorHandler)
server.use(pathHandler)

// server.get("/", async (requerimientos, respuesta) => {
//     try {
//         return respuesta.status(200).json({
//             response: "CODER API",
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//         return respuesta.status(500).json({
//             response: "CODER API ERROR",
//             success: false
//         })
//     }
// })

