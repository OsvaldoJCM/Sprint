import "dotenv/config.js"
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
// import fileStore from "session-file-store"
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars"
import indexRouter from "./src/router/index.router.js";
import socketCb from "./src/router/index.socket.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from './utils.js';
import dbConnect from "./src/utils/dbConnect.util.js";

console.log(process.env.MONGO_URI);

const server = express()
const port = process.env.port || 8080
const ready = async () => {
    console.log("server ready on port " + port);
    await dbConnect();
};
const nodeServer = createServer(server);

//tcp server
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
nodeServer.listen(port, ready);

// handlebars
//Configuramos el motor de plantillas de handlebars
server.engine("handlebars", engine({
    runtimeOptions: {
        allowedProtoMethods: true,
        allowProtoMethodsByDefault: true,
        allowedProtoProperties: true,
        allowProtoPropertiesByDefault: true
    }
}));


server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')

// middleware
server.use(cookieParser(process.env.SECRET))
// const fileSession = fileStore(session)
server.use(session({
    // store: new fileSession({
    //     path: "./src/data/fs/files/sessions",
    //     ttl: 60 * 60
    // }),
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: { maxAge: 60 * 60 * 1000 }
}))
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

